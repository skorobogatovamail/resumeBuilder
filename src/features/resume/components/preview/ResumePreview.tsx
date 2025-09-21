// src/features/resume/components/preview/ResumePreview.tsx
import React, { memo } from 'react';
import { useResume } from '@/features/resume/hooks/useResume';
import PersonalDetailPreview from './PersonalDetailPreview';
import ExperiencePreview from './ExperiencePreview';

/**
 * Компонент предпросмотра резюме
 * Отображает все секции резюме в формате для печати
 */
const ResumePreview: React.FC = () => {
  const { resumeData } = useResume();

  if (!resumeData) {
    return (
      <div className="p-14 shadow-md h-full border-t-[20px] flex items-center justify-center">
        <p className="text-gray-500">Загрузка данных резюме...</p>
      </div>
    );
  }

  return (
    <div
      className="p-14 shadow-md h-full border-t-[20px]"
      style={{ borderColor: resumeData?.themeColor }}
    >
      <PersonalDetailPreview resumeInfo={resumeData} />

      {/* Отображаем секцию опыта работы, только если есть данные */}
      {resumeData?.experience && resumeData.experience.length > 0 && (
        <ExperiencePreview resumeInfo={resumeData} />
      )}

      {/* В будущем можно добавить другие секции:
      <SummaryPreview resumeInfo={resumeData} />
      {resumeData?.education?.length > 0 && (
        <EducationPreview resumeInfo={resumeData} />
      )}
      {resumeData?.skills?.length > 0 && (
        <SkillsPreview resumeInfo={resumeData} />
      )} */}
    </div>
  );
};

// Используем memo для оптимизации производительности
export default memo(ResumePreview);
