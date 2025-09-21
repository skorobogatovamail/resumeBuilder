import { Outlet } from 'react-router-dom';
import './App.css';
import MainLayout from './layouts/MainLayout';

function App() {
  return (
    <MainLayout>
      <Outlet />
    </MainLayout>
  );
}

export default App;
