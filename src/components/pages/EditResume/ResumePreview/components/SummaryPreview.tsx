import type { Resume } from '@/types/Resume';
import React from 'react';

type SummaryPreviewProps = {
  resumeInfo?: Resume;
};

const SummaryPreview: React.FC<SummaryPreviewProps> = ({ resumeInfo }) => {
  return <p className="text-xs">{resumeInfo?.summery}</p>;
};
export default SummaryPreview;
