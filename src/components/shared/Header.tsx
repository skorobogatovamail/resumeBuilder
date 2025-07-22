import React from 'react';
import { SignedIn, UserButton, SignInButton, SignedOut } from '@clerk/clerk-react';
import { Button } from '../ui/button';

type HeaderProps = {};

const Header: React.FC<HeaderProps> = () => {
  return (
    <div className="flex justify-between items-center py-3 px-5 shadow-md">
      <img src="./logo.svg" alt="Logo" height={40} width={40} />
      <SignedIn>
        <UserButton />
      </SignedIn>
      <SignedOut>
        <Button>
          <SignInButton />
        </Button>
      </SignedOut>
    </div>
  );
};
export default Header;
