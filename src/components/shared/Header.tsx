import React from 'react';
import { useAuthState, useSignOut } from 'react-firebase-hooks/auth';
import GoogleAuth from './GoogleAuth';
import { auth } from '@/firebase';
import { Button } from '../ui/button';
import { LogOut } from 'lucide-react';
import { toast } from 'react-toastify';
import UserAvatar from './UserAvatar';

type HeaderProps = {};

const Header: React.FC<HeaderProps> = () => {
  const [user] = useAuthState(auth);
  const [signOut] = useSignOut(auth);

  const handleLogout = async () => {
    try {
      const success = await signOut();
      if (!success) throw new Error('Logout failed');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : String(error), {
        position: 'bottom-right',
        autoClose: 3000,
      });
    }
  };
  return (
    <div className="flex justify-between items-center py-3 px-5 shadow-md">
      <img src="./logo.svg" alt="Logo" height={40} width={40} />

      {user ? (
        <div className="flex items-center gap-2">
          <UserAvatar user={user} />
          <Button onClick={handleLogout} className="hover:scale-105 hover:shadow-md">
            <LogOut />
          </Button>
        </div>
      ) : (
        <GoogleAuth />
      )}
    </div>
  );
};
export default Header;
