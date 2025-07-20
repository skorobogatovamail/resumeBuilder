import { UserButton } from '@clerk/clerk-react';
import React from 'react';

type HomeProps = {};

const Home: React.FC<HomeProps> = () => {
  return (
    <div>
      <UserButton />
    </div>
  );
};
export default Home;
