// src/features/resume/components/EditResume.tsx
import React, { useEffect, Suspense, lazy } from 'react';
import { useParams } from 'react-router-dom';
import { useResume } from '@/features/resume/hooks/useResume';

// Используем ленивую загрузку для компонентов формы и предпросмотра
const ResumeForm = lazy(() => import('@/features/resume/components/form/ResumeForm'));
const ResumePreview = lazy(() => import('@/features/resume/components/preview/ResumePreview'));

/**
 * Компонент страницы редактирования резюме
 * Использует MainLayout и хук useResume
 */
const EditResume: React.FC = () => {
  const { resumeId } = useParams();
  const { loadResume, isLoading, error } = useResume();

  useEffect(() => {
    if (resumeId) {
      loadResume(resumeId);
    }
  }, [resumeId, loadResume]);

  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <div className="text-xl">Загрузка...</div>
        </div>
      ) : error ? (
        <div className="flex justify-center items-center h-screen">
          <div className="text-xl text-red-500">Ошибка: {error}</div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 p-10">
          <Suspense fallback={<div className="text-xl">Загрузка формы...</div>}>
            <ResumeForm />
          </Suspense>
          <Suspense fallback={<div className="text-xl">Загрузка предпросмотра...</div>}>
            <ResumePreview />
          </Suspense>
        </div>
      )}
    </>
  );
};

export default EditResume;
