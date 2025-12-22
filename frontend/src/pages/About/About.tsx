import { stackLogo } from '../../assets';

function About() {
  return (
    <div>
      <img src={stackLogo} alt="Stack logo" width={80} height={80} />
      <h2>About</h2>
      <p>A barebones full-stack starter with PostgreSQL, Express, React, and Docker.</p>
    </div>
  );
}

export default About;
