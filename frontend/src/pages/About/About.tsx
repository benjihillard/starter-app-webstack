import styles from './About.module.css';

function About() {
  return (
    <div className={styles.container}>
      <ul className={styles.list}>
        <li>
          <strong>Supercharged Starter Stack</strong>: Built on <strong>PostgreSQL</strong>,{' '}
          <strong>Express</strong>, <strong>React</strong>, <strong>Redux</strong>,{' '}
          <strong>React Query</strong> <em>and</em> <strong>Storybook</strong> — all fully
          integrated for you.
        </li>
        <li>
          <strong>Dockerized</strong> for a smooth local dev &amp; deployment experience.
          Everything&apos;s ready to spin up and go.
        </li>
        <li>
          <strong>Modern examples and patterns</strong>: Includes ready-to-use code for state
          management (Redux) and data fetching (React Query), plus a <strong>Storybook</strong>{' '}
          setup for UI development.
        </li>
        <li>
          <strong>Get a head start!</strong> No more wrestling with boilerplate, configs, or basic
          integration. This kit sets you up with best practices from the start, so you can focus on
          building features, not infrastructure.
        </li>
      </ul>
    </div>
  );
}

export default About;
