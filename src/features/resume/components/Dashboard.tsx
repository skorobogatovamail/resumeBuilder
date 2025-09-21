// src/features/resume/components/Dashboard.tsx
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/services/firebase';
import { ResumeService } from '@/services/firebase/resume.service';
import type { Resume } from '@/types/Resume';

// Импортируем компоненты из старой структуры
// В будущем их тоже нужно будет перенести в новую структуру
import AddResume from '@/components/pages/Dashboard/components/AddResume';
import ResumeCardItem from '@/components/pages/Dashboard/components/ResumeCardItem';

/**
 * Компонент панели управления резюме
 * Отображает список резюме пользователя и кнопку добавления нового резюме
 */
const Dashboard: React.FC = () => {
  const [user, loading] = useAuthState(auth);
  const [resumeList, setResumeList] = useState<Resume[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user || loading) return;

    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const resumes = await ResumeService.getUserResumes(user.uid);
        setResumeList(resumes);
      } catch (err) {
        console.error('Error fetching resumes:', err);
        setError('Не удалось загрузить список резюме');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [user, loading]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl">Загрузка списка резюме...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl text-red-500">Ошибка: {error}</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center h-screen px-10 md:px-20 lg:px-32">
      <div className="flex flex-col gap-4">
        <h1 className="font-bold text-3xl">Мои резюме</h1>
        <p>Начните создавать свое резюме</p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 mb-4">
          <AddResume />
          {resumeList.map((item) => (
            <ResumeCardItem item={item} key={item.id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
