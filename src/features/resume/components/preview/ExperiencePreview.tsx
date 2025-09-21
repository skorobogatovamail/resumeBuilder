// src/features/resume/components/preview/ExperiencePreview.tsx
import React, { memo } from 'react';
import type { Resume } from '@/types/Resume';

/**
 * Интерфейс свойств компонента ExperiencePreview
 */
interface ExperiencePreviewProps {
  resumeInfo?: Resume;
}

/**
 * Компонент предпросмотра опыта работы
 *
 * @param resumeInfo - Данные резюме
 */
const ExperiencePreview: React.FC<ExperiencePreviewProps> = ({ resumeInfo }) => {
  return (
    <div className="my-6">
      <h2
        className="text-center font-bold text-sm mb-2"
        style={{
          color: resumeInfo?.themeColor,
        }}
      >
        Опыт работы
      </h2>
      <hr
        style={{
          borderColor: resumeInfo?.themeColor,
        }}
      />

      {resumeInfo?.experience?.map((experience, index) => (
        <div key={index} className="my-5">
          <h2
            className="text-sm font-bold"
            style={{
              color: resumeInfo?.themeColor,
            }}
          >
            {experience?.position}
          </h2>
          <h2 className="text-xs flex justify-between">
            {experience?.companyName}, {experience?.city}, {experience?.country}
            <span>
              {experience?.startDate} -{' '}
              {experience?.currentlyWorking ? 'По настоящее время' : experience.endDate}
            </span>
          </h2>
          <div
            className="text-xs my-2"
            dangerouslySetInnerHTML={{ __html: experience?.description }}
          />
        </div>
      ))}
    </div>
  );
};

// Используем memo для оптимизации производительности
export default memo(ExperiencePreview);
