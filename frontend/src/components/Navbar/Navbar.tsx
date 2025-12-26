import { Link } from 'react-router-dom';
import { stackLogo } from '@/assets';
import styles from './Navbar.module.css';

export default function Navbar() {
  return (
    <div className={styles.container}>
      <div className={styles.brand}>
        <img src={stackLogo} alt="Stack logo" width={80} height={80} />
        <h1 className={styles.title}>Starter App</h1>
      </div>
      <nav className={styles.nav}>
        <Link to="/" className={styles.link}>
          Home
        </Link>
        <Link to="/counter" className={styles.link}>
          Counter
        </Link>
        <Link to="/health" className={styles.link}>
          Health
        </Link>
      </nav>
    </div>
  );
}
