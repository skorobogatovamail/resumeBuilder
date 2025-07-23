import AddResume from '@/components/shared/AddResume';
import React from 'react';

type DashboardProps = {};

const Dashboard: React.FC<DashboardProps> = () => {
  return (
    <div className="p-10 md:px-20 lg:px-32">
      <h2 className="font-bold text-3xl">My resume</h2>
      <p>Start creating your resume</p>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 mb-4">
        <AddResume />
      </div>
    </div>
  );
};
export default Dashboard;
