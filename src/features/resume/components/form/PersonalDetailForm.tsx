// src/features/resume/components/form/PersonalDetailForm.tsx
import React, { memo } from 'react';
import { Input } from '@/components/ui/input';
import { FormSection } from './FormSection';
import { usePersonalDetails } from '@/features/resume/hooks/usePersonalDetails';

/**
 * Компонент формы личных данных
 * Позволяет пользователю редактировать основную информацию о себе
 */
const PersonalDetailForm: React.FC = () => {
  const { register, handleSubmit, onSubmit, errors, isLoading } = usePersonalDetails();

  return (
    <FormSection
      sectionTitle="Личные данные"
      description="Начните с базовой информации о себе"
      onSave={handleSubmit(onSubmit)}
    >
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm">Имя</label>
          <Input {...register('firstName', { required: 'Имя обязательно' })} placeholder="Иван" />
          {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName.message}</p>}
        </div>
        <div>
          <label className="text-sm">Фамилия</label>
          <Input
            {...register('lastName', { required: 'Фамилия обязательна' })}
            placeholder="Иванов"
          />
          {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName.message}</p>}
        </div>
        <div>
          <label className="text-sm col-span-2">Должность</label>
          <Input {...register('jobTitle')} placeholder="Разработчик ПО" />
        </div>
        <div>
          <label className="text-sm col-span-2">Адрес</label>
          <Input {...register('address')} placeholder="Москва" />
        </div>
        <div>
          <label className="text-sm">Email</label>
          <Input
            {...register('email', {
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Некорректный email',
              },
            })}
            type="email"
            placeholder="email@example.com"
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
        </div>
        <div>
          <label className="text-sm">Телефон</label>
          <Input {...register('phone')} placeholder="+7 123 456 78 90" />
        </div>
      </div>
    </FormSection>
  );
};

// Используем memo для оптимизации производительности
export default memo(PersonalDetailForm);
