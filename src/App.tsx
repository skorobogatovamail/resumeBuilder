import { Outlet } from 'react-router-dom';
import Header from './components/shared/Header';
import './App.css';

function App() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

export default App;
