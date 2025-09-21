// src/components/pages/EditResume/ResumeForm/components/Experience/ExperienceItemWithHookForm.tsx
import React from 'react';
import { Controller, Control } from 'react-hook-form';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Calendar28 } from '@/components/ui/Calendar28';

interface ExperienceItemWithHookFormProps {
  control: Control<any>;
  index: number;
}

export const ExperienceItemWithHookForm: React.FC<ExperienceItemWithHookFormProps> = ({
  control,
  index,
}) => {
  return (
    <>
      <div>
        <label>Название компании</label>
        <Controller
          control={control}
          name={`experience.${index}.companyName`}
          rules={{ required: 'Название компании обязательно' }}
          render={({ field, fieldState: { error } }) => (
            <>
              <Input {...field} placeholder="Microsoft" />
              {error && <p className="text-red-500 text-sm">{error.message}</p>}
            </>
          )}
        />
      </div>

      <div>
        <label>Должность</label>
        <Controller
          control={control}
          name={`experience.${index}.position`}
          rules={{ required: 'Должность обязательна' }}
          render={({ field, fieldState: { error } }) => (
            <>
              <Input {...field} placeholder="Разработчик ПО" />
              {error && <p className="text-red-500 text-sm">{error.message}</p>}
            </>
          )}
        />
      </div>

      <div>
        <label>Город</label>
        <Controller
          control={control}
          name={`experience.${index}.city`}
          render={({ field }) => <Input {...field} placeholder="Москва" />}
        />
      </div>

      <div>
        <label>Страна</label>
        <Controller
          control={control}
          name={`experience.${index}.country`}
          render={({ field }) => <Input {...field} placeholder="Россия" />}
        />
      </div>

      <div>
        <label>Дата начала</label>
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
                <div>
                  <label>Дата окончания</label>
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

              <div className="flex items-center space-x-2 mt-2">
                <Checkbox
                  id={`currentlyWorking-${index}`}
                  checked={currentlyWorking}
                  onCheckedChange={(checked) => field.onChange(checked)}
                />
                <label htmlFor={`currentlyWorking-${index}`}>Работаю сейчас</label>
              </div>
            </>
          );
        }}
      />

      <div>
        <label>Описание</label>
        <Controller
          control={control}
          name={`experience.${index}.description`}
          render={({ field }) => (
            <Textarea {...field} placeholder="Опишите ваши обязанности и достижения" />
          )}
        />
      </div>
    </>
  );
};
