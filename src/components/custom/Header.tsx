import { UserButton } from '@clerk/clerk-react';
import React from 'react';
import { Button } from '../ui/button';

type HeaderProps = {};

const Header: React.FC<HeaderProps> = () => {
  return (
    <div>
      <img src="/logo.svg" alt="Logo" height={100} width={100} />
      <Button>Get Started</Button>
      <UserButton />
    </div>
  );
};
export default Header;
