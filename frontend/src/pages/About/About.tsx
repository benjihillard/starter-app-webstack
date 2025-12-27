import styles from './About.module.css';

function About() {
  return (
    <div className={styles.container}>
      <section className={styles.section}>
        <h2 className={styles.heading}>About This Starter</h2>
        <p className={styles.text}>
          A full-stack starter built with <strong>PostgreSQL</strong>, <strong>Express.js</strong>,{' '}
          <strong>React</strong> (with Redux, React Router, and React Query),{' '}
          <strong>Storybook</strong>, and <strong>Docker</strong>. Built with TypeScript, ESLint,
          and Vitest for robust development. Everything is configured and ready to go.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.heading}>Features to Explore</h2>
        <ul className={styles.list}>
          <li>
            <strong>Counter</strong> (<code>/counter</code>): Example Redux state management with a
            counter component
          </li>
          <li>
            <strong>Health Check</strong> (<code>/health</code>): Backend health endpoint that
            checks database connectivity
          </li>
          <li>
            <strong>Authentication</strong> (<code>/auth</code>): Complete auth flow with login,
            signup, and JWT token management
          </li>
        </ul>
      </section>

      <section className={styles.section}>
        <h2 className={styles.heading}>Getting Started</h2>
        <p className={styles.text}>
          These features are examples to help you understand the stack. When you&apos;re ready to
          build your own features:
        </p>
        <ol className={styles.orderedList}>
          <li>
            <strong>Remove example features:</strong> Delete the <code>auth</code>,{' '}
            <code>counter</code>, and <code>health</code> directories from both{' '}
            <code>backend/src/features</code> and <code>frontend/src/features</code>
          </li>
          <li>
            <strong>Clean up routes:</strong> Update <code>backend/src/routes/index.ts</code> and{' '}
            <code>frontend/src/app/router.tsx</code> to remove example routes
          </li>
          <li>
            <strong>Clear migrations:</strong> Reset{' '}
            <code>backend/src/shared/config/migrations.ts</code> to start fresh
          </li>
          <li>
            <strong>See README:</strong> Check the &quot;Starting Fresh&quot; section for detailed
            instructions
          </li>
        </ol>
      </section>
    </div>
  );
}

export default About;
