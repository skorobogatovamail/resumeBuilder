import type { Resume } from '@/types/Resume';
import { Notebook } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';

type ResumeCardItemProps = {
  item: Resume;
};

const ResumeCardItem: React.FC<ResumeCardItemProps> = ({ item }) => {
  return (
    <Link to={`/dashboard/resume/${item.id}/edit`}>
      <div
        className="p-14 flex items-center justify-center bg-secondary h-[280px] rounded-ld
      hover:scale-105 transition-all hover:shadow-md"
      >
        <Notebook />
      </div>
      <h2 className="text-center my-1"> {item.title}</h2>
    </Link>
  );
};
export default ResumeCardItem;
