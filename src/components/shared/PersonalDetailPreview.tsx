import type { Resume } from '@/types/Resume';
import React from 'react';

type PersonalDetailPreviewProps = {
  resumeInfo?: Resume;
};

const PersonalDetailPreview: React.FC<PersonalDetailPreviewProps> = ({ resumeInfo }) => {
  return (
    <div>
      <h2 className="font-bold text-xl text-center" style={{ color: resumeInfo?.themeColor }}>
        {resumeInfo?.firstName} {resumeInfo?.lastName}
      </h2>
      <p className="font-medium text-sm text-center">{resumeInfo?.jobTitle}</p>
    </div>
  );
};
export default PersonalDetailPreview;
