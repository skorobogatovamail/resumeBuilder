import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import React, { useContext } from 'react';
import PersonalDetailPreview from './PersonalDetailPreview';
import EducationalPreview from './EducationalPreview';
import SkillsPreview from './SkillsPreview';
import ExperiencePreview from './ExperiencePreview';
import SummaryPreview from './SummaryPreview';

const ResumePreview: React.FC = () => {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  return (
    <div
      className="p-14 shadow-md h-full border-t-[20px]"
      style={{ borderColor: resumeInfo.themeColor }}
    >
      <PersonalDetailPreview resumeInfo={resumeInfo} />
      <SummaryPreview resumeInfo={resumeInfo} />
      {resumeInfo?.Experience?.length > 0 && <ExperiencePreview resumeInfo={resumeInfo} />}
      {resumeInfo?.education?.length > 0 && <EducationalPreview resumeInfo={resumeInfo} />}
      {resumeInfo?.skills?.length > 0 && <SkillsPreview resumeInfo={resumeInfo} />}
    </div>
  );
};
export default ResumePreview;
