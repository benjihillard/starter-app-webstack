import { Outlet } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import styles from './App.module.css';

function App() {
  return (
    <div className={styles.container}>
      <Navbar />
      <div className={styles.main}>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default App;
