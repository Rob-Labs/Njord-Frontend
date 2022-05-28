import { Box, Container, Grid, Paper, Typography, useMediaQuery, Zoom } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import { Skeleton } from '@material-ui/lab';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import DashboardHero from 'src/components/DashboardHero';
import RebaseTimer from 'src/components/RebaseTimer/RebaseTimer';
import { IReduxState } from 'src/store/slices/state.interface';
import { formatCurrency, formatNumber, getTokenImage, trim } from '../../helpers';
import './treasury-dashboard.scss';
// import { bulletpoints, itemType, treasuryDataQuery } from './treasuryData.js';

const numberFormatter = Intl.NumberFormat('en', { maximumFractionDigits: 0 });

function TreasuryDashboard() {
  const { t } = useTranslation();

  const theme = useTheme();
  const smallerScreen = useMediaQuery('(max-width: 650px)');
  const verySmallScreen = useMediaQuery('(max-width: 379px)');

  const circSupply = useSelector<IReduxState, number>(state => state.app.circSupply);
  const FJORDTVL = useSelector<IReduxState, number>(state => state.app.FJORDTVL);
  const totalSupply = useSelector<IReduxState, number>(state => state.app.totalSupply);
  const stakingRatio = useSelector<IReduxState, number>(state => state.app.stakingRatio);
  const marketCap = useSelector<IReduxState, number>(state => state.app.marketCap);
  const marketPrice = useSelector<IReduxState, number>(state => state.app.marketPrice);
  const FJORDPrice = useSelector<IReduxState, number>(state => state.app.FJORDPrice);
  const currentIndex = useSelector<IReduxState, string>(state => state.app.currentIndex);
  const liquidityValue = useSelector<IReduxState, number>(state => state.app.liquidityValue);
  const riskFreeFundValue = useSelector<IReduxState, number>(state => state.app.riskFreeFundValue);
  const SupplyControlValue = useSelector<IReduxState, number>(state => state.app.SupplyControlValue);
  const SupplyControl = useSelector<IReduxState, number>(state => state.app.SupplyControl);
  const treasuryValue = useSelector<IReduxState, number>(state => state.app.treasuryValue);
  const stakingAPY = useSelector<IReduxState, number>(state => state.app.stakingAPY);

  const displayData = [
    {
      title: t('common.clamPrice'),
      value: marketPrice ? formatCurrency(marketPrice, 5) : null,
      image: getTokenImage('clam'),
    },
    {
      title: t('dashboard.marketCap'),
      value: marketCap ? formatCurrency(marketCap, 0) : null,
    },
    {
      title: t('common.FJORDPrice'),
      value: FJORDPrice ? formatCurrency(FJORDPrice, 2) : null,
      image: getTokenImage('fjord'),
    },
  ];
  const displayData2 = [
    {
      title: t('dashboard.circulatingSupply'),
      value: circSupply ? `${formatNumber(circSupply, 3)}` : null,
    },
    {
      title: 'Liquidity Pool',
      value: liquidityValue ? formatCurrency(liquidityValue, 2) : null,
    },
    {
      title: 'Trust Fund Holdings',
      value: treasuryValue ? formatCurrency(treasuryValue, 2) : null,
    },
    {
      title: 'Burned Supply',
      value: SupplyControl ? formatNumber(SupplyControl, 2) : null,
    },
    {
      title: 'Burned Amount (USD)',
      value: SupplyControlValue ? formatCurrency(SupplyControlValue, 2) : null,
    },
    {
      title: 'Trust Fund RFV',
      value: riskFreeFundValue ? formatCurrency(riskFreeFundValue, 2) : null,
    },
    {
      title: t('common.currentIndex'),
      value: currentIndex ? trim(currentIndex, 4) : null,
    },
    {
      title: 'Backed Liquidity',
      value: '100 %',
    },
    {
      title: 'FJORD TVL',
      value: FJORDTVL ? formatCurrency(FJORDTVL, 2) : null,
    },
  ];

  return (
    <div id="treasury-dashboard-view" className={`${smallerScreen && 'smaller'} ${verySmallScreen && 'very-small'}`}>
      <div className="hero">{/* <DashboardHero /> */}</div>
      <div className="wave" />
      <Container
        style={{
          paddingLeft: smallerScreen || verySmallScreen ? '0' : '3.3rem',
          paddingRight: smallerScreen || verySmallScreen ? '0' : '3.3rem',
        }}
      >
        <Box className="hero-metrics">
          <Paper className="hero-metrics__paper">
            <Box display="flex" flexWrap="wrap" justifyContent="space-between" alignItems="center">
              {displayData.map(({ title, value }, i) => (
                <Box key={i} bgcolor="mode.white" className="metric-container">
                  <Box className="metic">
                    <Typography variant="h6" color="secondary">
                      {title}
                    </Typography>
                    <Typography variant="h4" color="textPrimary">
                      {value ? value : <Skeleton width="100px" />}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>
            <Box display="flex" flexWrap="wrap" justifyContent="space-between" alignItems="center">
              <Box bgcolor="mode.white" className="metric-container2">
                <Box className="metic">
                  <Typography variant="h6" color="secondary">
                    APY
                  </Typography>
                  <Typography variant="h4" color="textPrimary">
                    {stakingAPY ? formatNumber(stakingAPY * 100) + '%' : null}
                  </Typography>
                </Box>
              </Box>
              <Box bgcolor="mode.white" className="metric-container2">
                <Box className="metic">
                  <Typography variant="h6" color="secondary">
                    Next Rebase
                  </Typography>
                  <Typography variant="h4" color="textPrimary">
                    <RebaseTimer />
                  </Typography>
                </Box>
              </Box>
            </Box>
            <Box display="flex" flexWrap="wrap" justifyContent="space-between" alignItems="center">
              {displayData2.map(({ title, value }, i) => (
                <Box key={i} bgcolor="mode.white" className="metric-container">
                  <Box className="metic">
                    <Typography variant="h6" color="secondary">
                      {title}
                    </Typography>
                    <Typography variant="h4" color="textPrimary">
                      {value ? value : <Skeleton width="100px" />}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          </Paper>
        </Box>
      </Container>
    </div>
  );
}

export default TreasuryDashboard;
