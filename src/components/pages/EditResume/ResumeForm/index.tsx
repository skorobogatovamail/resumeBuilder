import React, { useContext, useState } from 'react';
import { ArrowLeft, ArrowRight, LayoutGrid } from 'lucide-react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, firestore } from '@/firebase';
import { toast } from 'sonner';
import { addDoc, collection, doc, getDoc, updateDoc } from 'firebase/firestore';
import PersonalDetailForm from './components/PersonalDetailForm';
import SummaryForm from './components/SummaryForm';
import ExperienceForm from './components/Experience/ExperienceForm';
import EducationForm from './components/EducationForm';
import SkillsForm from './components/SkillsForm';
import { Button } from '@/components/ui/button';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';

function removeUndefined<T extends object>(obj: T): Partial<T> {
  return Object.fromEntries(Object.entries(obj).filter(([_, v]) => v !== undefined)) as Partial<T>;
}

const ResumeForm: React.FC = () => {
  const [user] = useAuthState(auth);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);

  const context = useContext(ResumeInfoContext);
  if (!context) return null;
  const { resumeInfo, setResumeInfo } = context;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!resumeInfo || !user?.uid) {
      return;
    }
    setIsLoading(true);
    try {
      const resumeCollection = collection(firestore, 'resumes');
      const resumeRef = doc(resumeCollection, String(resumeInfo.id));
      const resumeDoc = await getDoc(resumeRef);
      if (!resumeDoc.exists()) {
        await addDoc(resumeCollection, { ...resumeInfo, userId: user.uid });
      } else {
        await updateDoc(resumeRef, removeUndefined(resumeInfo) as Record<string, any>);
      }
      toast('Resume added successfully');
    } catch (error) {
      toast(error instanceof Error ? error.message : 'Error adding resume');
      console.error('Error adding document: ', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (resumeInfo && setResumeInfo) {
      setResumeInfo({ ...resumeInfo, [name]: value });
    }
  };

  const sections = [
    <PersonalDetailForm
      handleInputChange={handleInputChange}
      handleSubmit={handleSubmit}
      isLoading={isLoading}
    />,
    <SummaryForm
      handleInputChange={handleInputChange}
      handleSubmit={handleSubmit}
      isLoading={isLoading}
    />,
    <ExperienceForm handleSubmit={handleSubmit} isLoading={isLoading} />,
    <SkillsForm
      handleInputChange={handleInputChange}
      handleSubmit={handleSubmit}
      isLoading={isLoading}
    />,
    <EducationForm
      handleInputChange={handleInputChange}
      handleSubmit={handleSubmit}
      isLoading={isLoading}
    />,
  ];

  return (
    <div>
      <div className="flex justify-between gap-2 mb-8">
        <Button variant="outline">
          <LayoutGrid className="mr-0.5" />
          Theme
        </Button>
        <div className="flex gap-2">
          <Button disabled={activeIndex === 0} onClick={() => setActiveIndex((prev) => prev - 1)}>
            <ArrowLeft className="mr-0.5" />
          </Button>

          <Button
            disabled={activeIndex === sections.length - 1}
            onClick={() => setActiveIndex((prev) => prev + 1)}
          >
            <ArrowRight className="mr-0.5" />
          </Button>
        </div>
      </div>
      <div className="flex flex-col gap-4">{sections[activeIndex]}</div>
    </div>
  );
};
export default ResumeForm;
