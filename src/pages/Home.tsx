import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';

type HomeProps = {};

const Home: React.FC<HomeProps> = () => {
  return (
    <div className="flex flex-col justify-center h-screen  md:px-20 lg:px-32">
      <div className="flex gap-8 items-center">
        <div className="flex flex-col  gap-2 max-w-[520px]">
          <h1 className="font-bold text-3xl">Make your new resume with AI</h1>
          <p>Simplify the process of resume creation uisng the best AI based features</p>
        </div>
        <Link to="/dashboard">
          <Button className="hover:scale-105 hover:shadow-md">
            Get started
            <ArrowRight />
          </Button>
        </Link>
      </div>
    </div>
  );
};
export default Home;
