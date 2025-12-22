import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';

function App() {
  return (
    <div>
      <h1>Starter App</h1>
      <Navbar />
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
