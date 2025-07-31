import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import React, { useContext } from 'react';

const ResumeForm: React.FC = () => {
  const context = useContext(ResumeInfoContext);
  if (!context) return null;
  const { resumeInfo } = context;

  return <div>Have a good coding</div>;
};
export default ResumeForm;
