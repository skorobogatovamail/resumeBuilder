import { PlusSquare } from 'lucide-react';
import React from 'react';

type AddResumeProps = {};

const AddResume: React.FC<AddResumeProps> = () => {
  return (
    <div>
      <div
        className="p-14 py-24 border items-center flex justify-center 
      bg-secondary rounded-lg h-[280px] hover:scale-105 transition-all 
      hover:shadow-md cursor-pointer"
      >
        <PlusSquare />
      </div>
    </div>
  );
};
export default AddResume;
