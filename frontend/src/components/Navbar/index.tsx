import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav>
      <Link to="/">Home</Link> | <Link to="/redux">Redux</Link> | <Link to="/status">Status</Link>
    </nav>
  );
}

export default Navbar;
