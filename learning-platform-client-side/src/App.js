import logo from './logo.svg';
import './App.css';
import Header from './Header/Header';
import { RouterProvider } from 'react-router-dom';
import { routes } from './Routes/Route';

function App() {
  return (
    <div>
      <RouterProvider router={routes}></RouterProvider>
    </div>
  );
}

export default App;
