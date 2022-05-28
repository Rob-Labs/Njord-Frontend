import { Link } from '@material-ui/core';
import SlowMist from './logo_slowmist_light.png';
import styles from './styles.module.scss';

export default function AuditedMark() {
  return (
    <div className={styles.root}>
      <p>Audited by</p>
      <Link href="https://www.slowmist.com/" target="_blank">
        <img src={SlowMist} width={80} height={18} />
      </Link>
    </div>
  );
}
