// src/hooks/usePersonalDetailsRedux.ts
import { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useResumeRedux } from './useResumeRedux';

interface PersonalFormData {
  firstName: string;
  lastName: string;
  jobTitle?: string;
  address?: string;
  email?: string;
  phone?: string;
}

export function usePersonalDetailsRedux() {
  const { resumeData, updatePersonalData, saveResumeData, isLoading, error } = useResumeRedux();

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
