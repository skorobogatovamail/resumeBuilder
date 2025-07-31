import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import React, { useContext } from 'react';
import PersonalDetailPreview from './components/PersonalDetailPreview';
import SummaryPreview from './components/SummaryPreview';
import ExperiencePreview from './components/ExperiencePreview';
import EducationalPreview from './components/EducationalPreview';
import SkillsPreview from './components/SkillsPreview';

const ResumePreview: React.FC = () => {
  const context = useContext(ResumeInfoContext);
  if (!context) return null;
  const { resumeInfo } = context;

  return (
    <div
      className="p-14 shadow-md h-full border-t-[20px]"
      style={{ borderColor: resumeInfo?.themeColor }}
    >
      <PersonalDetailPreview resumeInfo={resumeInfo} />
      <SummaryPreview resumeInfo={resumeInfo} />
      {resumeInfo?.experience?.length && <ExperiencePreview resumeInfo={resumeInfo} />}
      {resumeInfo?.education?.length && <EducationalPreview resumeInfo={resumeInfo} />}
      {resumeInfo?.skills?.length && <SkillsPreview resumeInfo={resumeInfo} />}
    </div>
  );
};
export default ResumePreview;
