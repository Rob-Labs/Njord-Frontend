import { useSelector } from 'react-redux';
import { CountdownCircleTimer } from '../../Packages/react-countdown-circle-timer';
import { Box } from '@material-ui/core';
import './rebasetimer.scss';
import { Skeleton } from '@material-ui/lab';
import { useMemo } from 'react';
import { IReduxState } from '../../store/slices/state.interface';
import { useTranslation } from 'react-i18next';

const zeroPad = (num: number, places: number) => String(num).padStart(places, '0');
const children = (remainingTime: any) => {
  const minutes = Math.floor(remainingTime / 60);
  const seconds = remainingTime % 60;

  return `${zeroPad(minutes, 2)}:${zeroPad(seconds, 2)}`;
};

function RebaseTimer() {
  const { t } = useTranslation();
  const currentBlockTime = useSelector<IReduxState, number>(state => {
    return state.app.currentBlockTime;
  });

  const nextRebase = useSelector<IReduxState, number>(state => {
    return state.app.nextRebase;
  });

  let timeUntilRebase = nextRebase - Date.now() / 1000;
  if (timeUntilRebase < 0) {
    timeUntilRebase += 900;
  }

  // console.log(timeUntilRebase);

  return (
    <CountdownCircleTimer
      isPlaying={true}
      duration={900}
      initialRemainingTime={timeUntilRebase}
      isSmoothColorTransition={false}
      colors="#aabbcc"
      onComplete={() => ({ shouldRepeat: true })}
    >
      {({ remainingTime }) => children(remainingTime)}
    </CountdownCircleTimer>
  );
}

export default RebaseTimer;
