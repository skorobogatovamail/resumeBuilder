import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ResumeForm from './ResumeForm';
import ResumePreview from './ResumePreview';
import { useResumeRedux } from '@/hooks/useResumeRedux';

const EditResume: React.FC = () => {
  const { resumeId } = useParams();
  const { loadResume, isLoading, error } = useResumeRedux();

  useEffect(() => {
    if (resumeId) {
      loadResume(resumeId);
    }
  }, [resumeId, loadResume]);

  if (isLoading) {
    return <div>Загрузка...</div>;
  }

  if (error) {
    return <div>Ошибка: {error}</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 p-10 ">
      <ResumeForm />
      <ResumePreview />
    </div>
  );
};
export default EditResume;
