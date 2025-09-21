// src/features/resume/hooks/useResume.ts
import { useCallback } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/services/firebase';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  updatePersonalDetails,
  addExperience,
  updateExperience,
  removeExperience,
  saveResume,
  fetchResume,
  addEducation,
  updateEducation,
  removeEducation,
  addSkill,
  updateSkill,
  removeSkill,
} from '@/features/resume/slice/resumeSlice';
import type { Resume, Experience, Education, Skill } from '@/types/Resume';

/**
 * Хук для работы с резюме через Redux
 * Предоставляет методы для загрузки, обновления и сохранения резюме
 */
export function useResume() {
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

  // Добавление образования
  const addEducationItem = useCallback(
    (education: Education) => {
      dispatch(addEducation(education));
    },
    [dispatch],
  );

  // Обновление образования
  const updateEducationItem = useCallback(
    (index: number, data: Partial<Education>) => {
      dispatch(updateEducation({ index, data }));
    },
    [dispatch],
  );

  // Удаление образования
  const removeEducationItem = useCallback(
    (index: number) => {
      dispatch(removeEducation(index));
    },
    [dispatch],
  );

  // Добавление навыка
  const addSkillItem = useCallback(
    (skill: Skill) => {
      dispatch(addSkill(skill));
    },
    [dispatch],
  );

  // Обновление навыка
  const updateSkillItem = useCallback(
    (index: number, data: Partial<Skill>) => {
      dispatch(updateSkill({ index, data }));
    },
    [dispatch],
  );

  // Удаление навыка
  const removeSkillItem = useCallback(
    (index: number) => {
      dispatch(removeSkill(index));
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
    addEducationItem,
    updateEducationItem,
    removeEducationItem,
    addSkillItem,
    updateSkillItem,
    removeSkillItem,
    saveResumeData,
  };
}
