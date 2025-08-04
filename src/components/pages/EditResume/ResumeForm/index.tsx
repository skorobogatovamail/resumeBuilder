import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import React, { useContext, useState } from 'react';
import PersonalDetailForm from './components/PersonalDetailForm';
import SummaryForm from './components/SummaryForm';
import ExperienceForm from './components/ExperienceForm';
import EducationForm from './components/EducationForm';
import SkillsForm from './components/SkillsForm';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, LayoutGrid } from 'lucide-react';

const ResumeForm: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const context = useContext(ResumeInfoContext);
  if (!context) return null;
  const { resumeInfo } = context;

  const sections = [
    <PersonalDetailForm />,
    <SummaryForm />,
    <EducationForm />,
    <ExperienceForm />,
    <SkillsForm />,
  ];

  return (
    <div>
      <div className="flex justify-between gap-2 mb-8">
        <Button variant="outline">
          <LayoutGrid className="mr-0.5" />
          Theme
        </Button>
        <div className="flex gap-2">
          {activeIndex > 0 && (
            <Button onClick={() => setActiveIndex((prev) => prev - 1)}>
              <ArrowLeft className="mr-0.5" />
            </Button>
          )}
          {activeIndex < sections.length - 1 && (
            <Button onClick={() => setActiveIndex((prev) => prev + 1)}>
              <ArrowRight className="mr-0.5" />
            </Button>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-4">{sections[activeIndex]}</div>
    </div>
  );
};
export default ResumeForm;
