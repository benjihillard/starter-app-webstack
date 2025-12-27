import { useState, FormEvent } from 'react';
import { useAuth } from '../../hooks';
import styles from './Signup.module.css';

function Signup() {
  const { signup, isSigningUp, signupError } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return;
    }

    signup({ email, password });
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h2>Sign Up</h2>
      {signupError && <p className={styles.error}>Error: {(signupError as Error).message}</p>}
      <div className={styles.formGroup}>
        <label htmlFor="signup-email">
          Email:
          <input
            id="signup-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className={styles.input}
          />
        </label>
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="signup-password">
          Password:
          <input
            id="signup-password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={8}
            className={styles.input}
          />
        </label>
        <small>Password must be at least 8 characters</small>
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="signup-confirm-password">
          Confirm Password:
          <input
            id="signup-confirm-password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            minLength={8}
            className={styles.input}
          />
        </label>
        {password && confirmPassword && password !== confirmPassword && (
          <small className={styles.error}>Passwords do not match</small>
        )}
      </div>
      <button
        type="submit"
        disabled={isSigningUp || !!(password && confirmPassword && password !== confirmPassword)}
        className={styles.button}
      >
        {isSigningUp ? 'Signing up...' : 'Sign Up'}
      </button>
    </form>
  );
}

export default Signup;
