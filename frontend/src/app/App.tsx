import { Outlet } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import styles from './App.module.css';

function App() {
  return (
    <div className={styles.container}>
      <Navbar />
      <hr />
      <div className={styles.main}>
        <Outlet />
      </div>
      <hr />
      <footer className={styles.footer}>
        <h1 className={styles.footerText}>@2025 Starter App Baby!!</h1>
      </footer>
    </div>
  );
}

export default App;
