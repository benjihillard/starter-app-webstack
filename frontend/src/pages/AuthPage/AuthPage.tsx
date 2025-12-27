import { useState } from 'react';
import { Login, Signup, useAuth } from '@/features/auth';
import styles from './AuthPage.module.css';

function AuthPage() {
  const { user, isAuthenticated, logout } = useAuth();
  const [mode, setMode] = useState<'login' | 'signup'>('login');

  if (isAuthenticated && user) {
    return (
      <div className={styles.container}>
        <div className={styles.greeting}>
          <h1>Hi {user.email}!</h1>
          <button type="button" onClick={logout} className={styles.button}>
            Logout
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.tabs}>
        <button
          type="button"
          onClick={() => setMode('login')}
          className={`${styles.tab} ${mode === 'login' ? styles.active : ''}`}
        >
          Login
        </button>
        <button
          type="button"
          onClick={() => setMode('signup')}
          className={`${styles.tab} ${mode === 'signup' ? styles.active : ''}`}
        >
          Sign Up
        </button>
      </div>
      <div className={styles.content}>{mode === 'login' ? <Login /> : <Signup />}</div>
    </div>
  );
}

export default AuthPage;
