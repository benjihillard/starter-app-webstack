import { Link, Outlet } from 'react-router-dom';

function App() {
  return (
    <div>
      <h1>Starter App</h1>
      <nav>
        <Link to="/">Home</Link> | <Link to="/redux">Redux</Link> | <Link to="/status">Status</Link>
      </nav>
      <hr />
      <Outlet />
      <hr />
      <footer>
        <p>footer</p>
      </footer>
    </div>
  );
}

export default App;
