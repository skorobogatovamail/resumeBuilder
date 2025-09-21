// src/features/resume/components/form/experience/ExperienceItemWithHookForm.tsx
import React, { memo } from 'react';
import { Controller } from 'react-hook-form';
import type { Control } from 'react-hook-form';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Calendar28 } from '@/components/ui/Calendar28';

/**
 * Интерфейс свойств компонента ExperienceItemWithHookForm
 */
interface ExperienceItemWithHookFormProps {
  control: Control<any>;
  index: number;
}

/**
 * Компонент для отображения и редактирования опыта работы с использованием React Hook Form
 *
 * @param control - Объект управления формой из React Hook Form
 * @param index - Индекс элемента в массиве опыта работы
 */
export const ExperienceItemWithHookForm: React.FC<ExperienceItemWithHookFormProps> = ({
  control,
  index,
}) => {
  return (
    <div className="space-y-4">
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Название компании</label>
        <Controller
          control={control}
          name={`experience.${index}.companyName`}
          rules={{ required: 'Название компании обязательно' }}
          render={({ field, fieldState: { error } }) => (
            <>
              <Input {...field} placeholder="Microsoft" className="w-full" />
              {error && <p className="text-red-500 text-sm">{error.message}</p>}
            </>
          )}
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Должность</label>
        <Controller
          control={control}
          name={`experience.${index}.position`}
          rules={{ required: 'Должность обязательна' }}
          render={({ field, fieldState: { error } }) => (
            <>
              <Input {...field} placeholder="Разработчик ПО" className="w-full" />
              {error && <p className="text-red-500 text-sm">{error.message}</p>}
            </>
          )}
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Город</label>
        <Controller
          control={control}
          name={`experience.${index}.city`}
          render={({ field }) => <Input {...field} placeholder="Москва" className="w-full" />}
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Страна</label>
        <Controller
          control={control}
          name={`experience.${index}.country`}
          render={({ field }) => <Input {...field} placeholder="Россия" className="w-full" />}
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Дата начала</label>
        <Controller
          control={control}
          name={`experience.${index}.startDate`}
          render={({ field }) => (
            <Calendar28
              initialValue={field.value}
              onDateChange={(value) => field.onChange(value)}
            />
          )}
        />
      </div>

      <Controller
        control={control}
        name={`experience.${index}.currentlyWorking`}
        render={({ field }) => {
          const currentlyWorking = field.value;

          return (
            <>
              {!currentlyWorking && (
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">Дата окончания</label>
                  <Controller
                    control={control}
                    name={`experience.${index}.endDate`}
                    render={({ field }) => (
                      <Calendar28
                        initialValue={field.value}
                        onDateChange={(value) => field.onChange(value)}
                      />
                    )}
                  />
                </div>
              )}

              <div className="flex items-center space-x-2 mb-4">
                <Checkbox
                  id={`currentlyWorking-${index}`}
                  checked={currentlyWorking}
                  onCheckedChange={(checked) => field.onChange(checked)}
                />
                <label htmlFor={`currentlyWorking-${index}`} className="text-sm">
                  Работаю сейчас
                </label>
              </div>
            </>
          );
        }}
      />

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Описание</label>
        <Controller
          control={control}
          name={`experience.${index}.description`}
          render={({ field }) => (
            <Textarea
              {...field}
              placeholder="Опишите ваши обязанности и достижения"
              className="w-full"
            />
          )}
        />
      </div>
    </div>
  );
};

// Используем memo для оптимизации производительности
export default memo(ExperienceItemWithHookForm);
