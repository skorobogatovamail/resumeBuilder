import type { Resume } from '@/types/Resume';
import { createContext } from 'react';

export const ResumeInfoContext = createContext<{
  resumeInfo: Resume | undefined;
  setResumeInfo: React.Dispatch<React.SetStateAction<Resume | undefined>> | undefined;
} | null>(null);
