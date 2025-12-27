import { useState, FormEvent } from 'react';
import { useAuth } from '../../hooks';
import styles from './Login.module.css';

function Login() {
  const { login, isLoggingIn, loginError } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    login({ email, password });
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h2>Login</h2>
      {loginError && <p className={styles.error}>Error: {(loginError as Error).message}</p>}
      <div className={styles.formGroup}>
        <label htmlFor="login-email">Email:</label>
        <input
          id="login-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className={styles.input}
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="login-password">Password:</label>
        <input
          id="login-password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className={styles.input}
        />
      </div>
      <button type="submit" disabled={isLoggingIn} className={styles.button}>
        {isLoggingIn ? 'Logging in...' : 'Login'}
      </button>
    </form>
  );
}

export default Login;
