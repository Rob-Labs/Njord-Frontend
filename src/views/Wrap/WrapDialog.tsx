import { Modal, Paper, SvgIcon, IconButton, makeStyles, Grid } from '@material-ui/core';
import { ReactComponent as XIcon } from '../../assets/icons/icon_close.svg';
import { getTokenImage } from '../../helpers';

import './wrapDialog.scss';

const useStyles = makeStyles(theme => ({
  modalContent: {
    backgroundColor: theme.palette.mode.lightGray100,
  },
  detailContent: {
    backgroundColor: theme.palette.mode.white,
  },
  inputGroup: {
    '& .MuiOutlinedInput-root': {
      borderColor: theme.palette.mode.lightGray300,
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

interface WrapDialogProps {
  open: boolean;
  handleClose: () => void;
  received: string;
  stakeBalance: string;
  fjordBalance: string;
  action: string;
}

function WrapDialog({ open, handleClose, received, stakeBalance, fjordBalance, action }: WrapDialogProps) {
  const styles = useStyles();
  return (
    <Modal id="wdialog" open={open} onClose={handleClose} hideBackdrop>
      <Paper className={`${styles.modalContent} clam-popover`}>
        <div className="dialog-wrap">
          <div className="header">
            <div className="close-wrapper">
              <IconButton onClick={handleClose}>
                <SvgIcon color="primary" component={XIcon} />
              </IconButton>
            </div>
            <div className="title">
              <p>Otter'standing!</p>
            </div>
          </div>

          <div className="body">
            <div className="confirm">
              <span>Your {action === `wrap` ? 'wrap' : 'unwrap'} was successful.</span>
            </div>
            <div className="amt-msg">
              {action === `wrap` ? (
                <div className="rcv">
                  You got <span className="quantity">{received}</span> FJORD!
                </div>
              ) : (
                <div className="rcv">
                  You got <span className="quantity">{received}</span> NJORD!
                </div>
              )}
            </div>
            <div className="dtl-container">
              <div className={`${styles.detailContent} dtl-wrap`}>
                <Grid container className="dtl">
                  <Grid item xs={6} md={6}>
                    <div>Your Wrapped Balance</div>
                  </Grid>
                  <Grid item xs={6} md={6} className="dtl-value">
                    <div>{fjordBalance} FJORD</div>
                  </Grid>
                  <Grid item xs={6} md={6}>
                    <div>Your Staked Balance</div>
                  </Grid>
                  <Grid item xs={6} md={6} className="dtl-value">
                    <div>{stakeBalance} NJORD</div>
                  </Grid>
                </Grid>
              </div>
            </div>
          </div>
        </div>
      </Paper>
    </Modal>
  );
}

export default WrapDialog;
