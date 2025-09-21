// src/features/resume/components/preview/PersonalDetailPreview.tsx
import React, { memo } from 'react';
import type { Resume } from '@/types/Resume';

/**
 * Интерфейс свойств компонента PersonalDetailPreview
 */
interface PersonalDetailPreviewProps {
  resumeInfo?: Resume;
}

/**
 * Компонент предпросмотра личных данных
 *
 * @param resumeInfo - Данные резюме
 */
const PersonalDetailPreview: React.FC<PersonalDetailPreviewProps> = ({ resumeInfo }) => {
  return (
    <div>
      <h2
        className="font-bold text-xl text-center"
        style={{
          color: resumeInfo?.themeColor,
        }}
      >
        {resumeInfo?.firstName} {resumeInfo?.lastName}
      </h2>
      <h2 className="text-center text-sm font-medium">{resumeInfo?.jobTitle}</h2>
      <h2
        className="text-center font-normal text-xs"
        style={{
          color: resumeInfo?.themeColor,
        }}
      >
        {resumeInfo?.address}
      </h2>

      <div className="flex justify-between">
        <h2
          className="font-normal text-xs"
          style={{
            color: resumeInfo?.themeColor,
          }}
        >
          {resumeInfo?.phone}
        </h2>
        <h2
          className="font-normal text-xs"
          style={{
            color: resumeInfo?.themeColor,
          }}
        >
          {resumeInfo?.email}
        </h2>
      </div>
      <hr
        className="border-[1.5px] my-2"
        style={{
          borderColor: resumeInfo?.themeColor,
        }}
      />
    </div>
  );
};

// Используем memo для оптимизации производительности
export default memo(PersonalDetailPreview);
