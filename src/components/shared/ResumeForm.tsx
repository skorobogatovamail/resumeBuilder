import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import React, { useContext } from 'react';

const ResumeForm: React.FC = () => {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  return <div>Have a good coding</div>;
};
export default ResumeForm;
