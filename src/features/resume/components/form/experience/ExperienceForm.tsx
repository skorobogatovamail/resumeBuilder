// src/features/resume/components/form/experience/ExperienceForm.tsx
import React, { memo } from 'react';
import { Button } from '@/components/ui/button';
import { PlusIcon, Trash } from 'lucide-react';
import { useExperienceForm } from '@/features/resume/hooks/useExperienceForm';
import { FormSection } from '../FormSection';
import ExperienceItemWithHookForm from './ExperienceItemWithHookForm';

/**
 * Компонент формы опыта работы
 * Позволяет пользователю добавлять, редактировать и удалять опыт работы
 */
const ExperienceForm: React.FC = () => {
  const { control, handleSubmit, onSubmit, fields, remove, addExperience, isLoading } =
    useExperienceForm();

  return (
    <FormSection
      sectionTitle="Опыт работы"
      description="Опишите ваш опыт работы подробно"
      onSave={handleSubmit(onSubmit)}
    >
      <div className="grid grid-cols-1 gap-6">
        {fields.map((field, index) => (
          <div key={field.id} className="relative border p-4 rounded-md">
            <ExperienceItemWithHookForm control={control} index={index} />
            <Button
              type="button"
              onClick={() => remove(index)}
              className="absolute top-2 right-2"
              variant="destructive"
              size="sm"
            >
              <Trash className="h-4 w-4" />
              <span className="ml-1">Удалить</span>
            </Button>
          </div>
        ))}

        <Button type="button" onClick={addExperience} className="mt-4" variant="outline">
          <PlusIcon className="h-4 w-4 mr-2" />
          Добавить опыт работы
        </Button>
      </div>
    </FormSection>
  );
};

// Используем memo для оптимизации производительности
export default memo(ExperienceForm);
