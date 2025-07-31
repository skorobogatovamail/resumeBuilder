import type { Resume } from '@/types/Resume';
import { createContext } from 'react';

export const ResumeInfoContext = createContext<{
  resumeInfo: Resume;
  setResumeInfo: React.Dispatch<React.SetStateAction<Resume>>;
} | null>(null);
