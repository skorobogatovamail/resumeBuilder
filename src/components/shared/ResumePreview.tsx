import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import React, { useContext } from 'react';
import PersonalDetailPreview from './PersonalDetailPreview';

const ResumePreview: React.FC = () => {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  return (
    <div
      className="p-14 shadow-md h-full border-t-[20px]"
      style={{ borderColor: resumeInfo.themeColor }}
    >
      <PersonalDetailPreview />
    </div>
  );
};
export default ResumePreview;
