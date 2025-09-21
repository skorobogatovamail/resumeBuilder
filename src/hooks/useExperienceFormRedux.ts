// src/hooks/useExperienceFormRedux.ts
import { useCallback, useEffect } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { useResumeRedux } from './useResumeRedux';
import type { Experience } from '@/types/Resume';

export function useExperienceFormRedux() {
  const {
    resumeData,
    addExperienceItem,
    updateExperienceItem,
    removeExperienceItem,
    saveResumeData,
    isLoading,
    error,
  } = useResumeRedux();

  // Инициализируем форму с React Hook Form
  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      experience: resumeData?.experience || [],
    },
  });

  // Используем useFieldArray для работы с массивом опыта
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'experience',
  });

  // Обновляем значения формы при изменении resumeData
  useEffect(() => {
    if (resumeData) {
      reset({
        experience: resumeData.experience || [],
      });
    }
  }, [resumeData, reset]);

  // Обработчик отправки формы
  const onSubmit = useCallback(
    async (data: { experience: Experience[] }) => {
      // Для каждого элемента опыта вызываем updateExperienceItem
      data.experience.forEach((item, index) => {
        if (resumeData?.experience && index < resumeData.experience.length) {
          updateExperienceItem(index, item);
        } else {
          addExperienceItem(item);
        }
      });

      // Если в исходном массиве было больше элементов, удаляем лишние
      if (resumeData?.experience && resumeData.experience.length > data.experience.length) {
        for (let i = data.experience.length; i < resumeData.experience.length; i++) {
          removeExperienceItem(i);
        }
      }

      // Сохраняем данные в Firestore
      return saveResumeData();
    },
    [resumeData, addExperienceItem, updateExperienceItem, removeExperienceItem, saveResumeData],
  );

  // Функция для добавления нового опыта
  const addExperience = useCallback(() => {
    append({
      id: Date.now(),
      position: '',
      companyName: '',
      city: '',
      country: '',
      startDate: '',
      description: '',
    });
  }, [append]);

  return {
    control,
    handleSubmit,
    onSubmit,
    fields,
    remove,
    addExperience,
    isLoading,
    error,
  };
}
