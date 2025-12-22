import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav>
      <Link to="/">Home</Link> | <Link to="/redux">Redux</Link> |{' '}
      <Link to="/react-query">React Query</Link>
    </nav>
  );
}

export default Navbar;
