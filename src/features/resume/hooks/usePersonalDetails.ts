// src/features/resume/hooks/usePersonalDetails.ts
import { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useResume } from './useResume';
import type { Resume } from '@/types/Resume';

/**
 * Интерфейс данных формы личных данных
 */
interface PersonalFormData {
  firstName: string;
  lastName: string;
  jobTitle?: string;
  address?: string;
  email?: string;
  phone?: string;
}

/**
 * Хук для работы с формой личных данных
 * Предоставляет методы для валидации, отправки и сохранения данных
 *
 * @returns Объект с методами и свойствами для работы с формой
 */
export function usePersonalDetails() {
  const { resumeData, updatePersonalData, saveResumeData, isLoading, error } = useResume();

  // Инициализируем форму с React Hook Form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PersonalFormData>({
    defaultValues: {
      firstName: resumeData?.firstName || '',
      lastName: resumeData?.lastName || '',
      jobTitle: resumeData?.jobTitle || '',
      address: resumeData?.address || '',
      email: resumeData?.email || '',
      phone: resumeData?.phone || '',
    },
  });

  // Обновляем значения формы при изменении resumeData
  useEffect(() => {
    if (resumeData) {
      reset({
        firstName: resumeData.firstName || '',
        lastName: resumeData.lastName || '',
        jobTitle: resumeData.jobTitle || '',
        address: resumeData.address || '',
        email: resumeData.email || '',
        phone: resumeData.phone || '',
      });
    }
  }, [resumeData, reset]);

  // Обработчик отправки формы
  const onSubmit = useCallback(
    async (data: PersonalFormData) => {
      // Обновляем данные в Redux
      updatePersonalData(data);
      // Сохраняем данные в Firestore
      return saveResumeData();
    },
    [updatePersonalData, saveResumeData],
  );

  return {
    register,
    handleSubmit,
    onSubmit,
    errors,
    isLoading,
    error,
  };
}
