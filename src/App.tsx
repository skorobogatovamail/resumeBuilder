import { Navigate, Outlet } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import './App.css';
import Header from './components/custom/Header';

function App() {
  const { user, isLoaded, isSignedIn } = useUser();

  if (!isSignedIn && isLoaded) {
    return <Navigate to="/signin" />;
  }
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

export default App;
