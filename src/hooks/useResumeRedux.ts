// src/hooks/useResumeRedux.ts
import { useCallback } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/firebase';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  updatePersonalDetails,
  addExperience,
  updateExperience,
  removeExperience,
  saveResume,
  fetchResume,
} from '@/store/resumeSlice';
import type { Resume, Experience } from '@/types/Resume';

export function useResumeRedux() {
  const [user] = useAuthState(auth);
  const dispatch = useAppDispatch();
  const { data: resumeData, status, error } = useAppSelector((state) => state.resume);

  // Загрузка резюме
  const loadResume = useCallback(
    (resumeId: string) => {
      dispatch(fetchResume(resumeId));
    },
    [dispatch],
  );

  // Обновление личных данных
  const updatePersonalData = useCallback(
    (data: Partial<Resume>) => {
      dispatch(updatePersonalDetails(data));
    },
    [dispatch],
  );

  // Добавление опыта работы
  const addExperienceItem = useCallback(
    (experience: Experience) => {
      dispatch(addExperience(experience));
    },
    [dispatch],
  );

  // Обновление опыта работы
  const updateExperienceItem = useCallback(
    (index: number, data: Partial<Experience>) => {
      dispatch(updateExperience({ index, data }));
    },
    [dispatch],
  );

  // Удаление опыта работы
  const removeExperienceItem = useCallback(
    (index: number) => {
      dispatch(removeExperience(index));
    },
    [dispatch],
  );

  // Сохранение резюме
  const saveResumeData = useCallback(async () => {
    if (!resumeData || !user?.uid) {
      return false;
    }

    try {
      await dispatch(saveResume({ resumeData, userId: user.uid })).unwrap();
      return true;
    } catch (error) {
      console.error('Ошибка при сохранении резюме:', error);
      return false;
    }
  }, [dispatch, resumeData, user]);

  return {
    resumeData,
    isLoading: status === 'loading',
    error,
    loadResume,
    updatePersonalData,
    addExperienceItem,
    updateExperienceItem,
    removeExperienceItem,
    saveResumeData,
  };
}
