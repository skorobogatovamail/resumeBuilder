// src/features/resume/components/form/ResumeForm.tsx
import React, { useState, memo } from 'react';
import { ArrowLeft, ArrowRight, LayoutGrid } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PersonalDetailForm from './PersonalDetailForm';
import ExperienceForm from './experience/ExperienceForm';

/**
 * Компонент формы резюме
 * Содержит все секции формы и навигацию между ними
 */
const ResumeForm: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  // Массив секций формы
  const sections = [
    <PersonalDetailForm key="personal" />,
    <ExperienceForm key="experience" />,
    // В будущем можно добавить другие секции:
    // <SummaryForm key="summary" />,
    // <SkillsForm key="skills" />,
    // <EducationForm key="education" />,
  ];

  return (
    <>
      <div className="flex justify-between gap-2 mb-8">
        <Button variant="outline">
          <LayoutGrid className="mr-0.5" />
          Тема
        </Button>
        <div className="flex gap-2">
          <Button
            disabled={activeIndex === 0}
            onClick={() => setActiveIndex((prev) => prev - 1)}
            aria-label="Предыдущая секция"
          >
            <ArrowLeft className="mr-0.5" />
          </Button>

          <Button
            disabled={activeIndex === sections.length - 1}
            onClick={() => setActiveIndex((prev) => prev + 1)}
            aria-label="Следующая секция"
          >
            <ArrowRight className="mr-0.5" />
          </Button>
        </div>
      </div>
      <div className="flex flex-col gap-4">{sections[activeIndex]}</div>
    </>
  );
};

// Используем memo для оптимизации производительности
export default memo(ResumeForm);
