import {
  Box,
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  makeStyles,
  OutlinedInput,
  Paper,
  Tab,
  Tabs,
  TabsActions,
  Zoom,
} from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import ActionButton from '../../components/Button/ActionButton';
import RebaseTimer from '../../components/RebaseTimer/RebaseTimer';
import TabPanel from '../../components/TabPanel';
import { formatCurrency, formatNumber, getTokenImage, trim } from '../../helpers';
import { useWeb3Context } from '../../hooks';
import { IPendingTxn } from '../../store/slices/pending-txns-slice';
import { changeApproval, changeStake, claimWarmup } from '../../store/slices/stake-thunk';
import { IReduxState } from '../../store/slices/state.interface';
import './stake.scss';
import StakeDialog from './StakeDialog';

const useStyles = makeStyles(theme => ({
  root: {
    '& .MuiOutlinedInput-root': {
      borderColor: 'transparent',
      backgroundColor: theme.palette.background.default,
    },
    '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: theme.palette.mode.lightGray300,
    },
    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: theme.palette.mode.lightGray300,
    },
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: theme.palette.mode.lightGray300,
    },
  },
}));

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function Stake() {
  const { t } = useTranslation();
  const styles = useStyles();
  const dispatch = useDispatch();
  const { provider, address, connect, chainID } = useWeb3Context();
  const tabsActions = useRef<TabsActions>(null);

  const [view, setView] = useState(0);
  const [quantity, setQuantity] = useState<string>('');

  const [open, setOpen] = useState(false);
  const [action, setAction] = useState<string>('');

  const isAppLoading = useSelector<IReduxState, boolean>(state => state.app.loading);
  const currentIndex = useSelector<IReduxState, string>(state => {
    return state.app.currentIndex;
  });
  const fiveDayRate = useSelector<IReduxState, number>(state => state.app.fiveDayRate);
  const njordBalance = useSelector<IReduxState, string>(state => state.account.balances?.njord);
  const sClamBalance = useSelector<IReduxState, string>(state => state.account.balances?.sClam);
  const stakeAllowance = useSelector<IReduxState, number>(state => state.account.staking?.njordStake);
  const unstakeAllowance = useSelector<IReduxState, number>(state => state.account.staking?.sClamUnstake);
  const warmupBalance = useSelector<IReduxState, string>(state => state.account.staking?.warmup);
  const canClaimWarmup = useSelector<IReduxState, boolean>(state => state.account.staking?.canClaimWarmup);
  const stakingRebase = useSelector<IReduxState, number>(state => state.app.stakingRebase);
  const stakingAPY = useSelector<IReduxState, number>(state => state.app.stakingAPY);
  const stakingTVL = useSelector<IReduxState, number>(state => state.app.stakingTVL);
  const pendingTransactions = useSelector<IReduxState, IPendingTxn[]>(state => state.pendingTransactions);
  const FJORDPrice = useSelector<IReduxState, number>(state => state.app.FJORDPrice);
  const marketPrice = useSelector<IReduxState, number>(state => state.app.marketPrice);

  const setMax = () => {
    if (view === 0) {
      setQuantity(njordBalance);
    } else {
      setQuantity(sClamBalance);
    }
  };

  const handleOpenDialog = () => {
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };

  const onSeekApproval = async (token: string) => {
    await dispatch(changeApproval({ address, token, provider, networkID: chainID }));
  };

  const onChangeStake = async (action: string) => {
    // eslint-disable-next-line no-restricted-globals
    //@ts-ignore
    if (isNaN(quantity) || quantity === 0 || quantity === '') {
      // eslint-disable-next-line no-alert
      alert('Please enter a value!');
    } else {
      setAction(action);
      let stakeTx: any = await dispatch(
        changeStake({
          address,
          action,
          value: String(quantity),
          provider,
          networkID: chainID,
        }),
      );
      if (stakeTx.payload == true) {
        handleOpenDialog();
      }
    }
  };

  const onClaimWarmup = async () => {
    await dispatch(claimWarmup({ address, provider, networkID: chainID }));
  };

  const hasAllowance = useCallback(
    token => {
      if (token === 'NJORD') return stakeAllowance > 0;
      if (token === 'sNJORD') return unstakeAllowance > 0;
      return 0;
    },
    [stakeAllowance, unstakeAllowance],
  );

  const changeView = (event: any, newView: number) => {
    setView(newView);
  };

  const trimmedSClamBalance = trim(Number(sClamBalance), 4);
  const stakingRebasePercentage = trim(stakingRebase * 100, 4);
  const nextRewardValue = trim(
    (Number(stakingRebasePercentage) / 100) * (Number(trimmedSClamBalance) + Number(warmupBalance)),
    4,
  );

  useEffect(() => {
    if (tabsActions.current) {
      setTimeout(() => tabsActions?.current?.updateIndicator(), 300);
    }
  }, [tabsActions]);

  return (
    <div id="stake-view" className={styles.root}>
      <Paper className="ohm-card">
        <Grid container direction="column" spacing={2}>
          <Grid item>
            <div className="stake-top-metrics">
              <Grid container spacing={2}>
                <Grid item xs={12} sm={4} md={4} lg={4}>
                  <div className="stake-apy">
                    <p className="single-stake-subtitle">Your Balance</p>
                    <Box component="p" color="text.secondary" className="single-stake-subtitle-value">
                      {trim(Number(njordBalance), 2)} NJORD
                    </Box>
                  </div>
                </Grid>

                <Grid item xs={12} sm={4} md={4} lg={4}>
                  <div className="stake-tvl">
                    <p className="single-stake-subtitle">Balance in USD</p>
                    <Box component="p" color="text.secondary" className="single-stake-subtitle-value">
                      {formatCurrency(Number(njordBalance) * marketPrice, 2)}
                    </Box>
                  </div>
                </Grid>

                <Grid item xs={12} sm={4} md={4} lg={4}>
                  <div className="stake-index">
                    <p className="single-stake-subtitle">APY</p>
                    <Box component="p" color="text.secondary" className="single-stake-subtitle-value">
                      {stakingAPY ? formatNumber(stakingAPY * 100) + '%' : null}
                    </Box>
                  </div>
                </Grid>
              </Grid>
            </div>
          </Grid>

          <div className="staking-area">
            <div className={`stake-user-data`}>
              <div className="data-row">
                <p className="data-row-name">Current NJORD Price</p>
                <p className="data-row-value">{formatCurrency(marketPrice, 2)}</p>
              </div>

              <div className="data-row">
                <p className="data-row-name">Next Reward Amount</p>
                <p className="data-row-value">
                  {isAppLoading ? <Skeleton width="80px" /> : <>{nextRewardValue} NJORD</>}
                </p>
              </div>

              <div className="data-row">
                <p className="data-row-name">Next Reward Amount USD</p>
                <p className="data-row-value">
                  {isAppLoading ? (
                    <Skeleton width="80px" />
                  ) : (
                    <>{formatCurrency(Number(nextRewardValue) * marketPrice, 2)}</>
                  )}
                </p>
              </div>

              <div className="data-row">
                <p className="data-row-name">{t('stake.nextRewardYield')}</p>
                <p className="data-row-value">
                  {isAppLoading ? <Skeleton width="80px" /> : <>{stakingRebasePercentage}%</>}
                </p>
              </div>

              <div className="data-row">
                <p className="data-row-name">{t('stake.roiFiveDay')}</p>
                <p className="data-row-value">
                  {isAppLoading ? <Skeleton width="80px" /> : <>{trim(Number(fiveDayRate) * 100, 4)}%</>}
                </p>
              </div>
            </div>
          </div>
        </Grid>
      </Paper>
    </div>
  );
}

export default Stake;
