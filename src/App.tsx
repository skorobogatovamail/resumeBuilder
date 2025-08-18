import { Outlet } from 'react-router-dom';
import Header from './components/shared/Header';
import './App.css';
import { Toaster } from './components/ui/sonner';

function App() {
  return (
    <>
      <Header />
      <Outlet />
      <Toaster />
    </>
  );
}

export default App;
