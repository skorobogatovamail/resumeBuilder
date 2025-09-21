// src/features/resume/components/form/experience/ExperienceItem.tsx
import React, { memo, useEffect, useState } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Calendar28 } from '@/components/ui/Calendar28';
import type { Experience } from '@/types/Resume';
import FormField from '../FormField';

/**
 * Интерфейс для свойств компонента ExperienceItem
 */
interface ExperienceItemProps {
  item: Experience;
  index: number;
  handleChange: (
    e:
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | React.FormEvent<HTMLButtonElement>,
  ) => void;
}

/**
 * Компонент для отображения и редактирования одного элемента опыта работы
 *
 * @param item - Данные опыта работы
 * @param index - Индекс элемента в массиве
 * @param handleChange - Обработчик изменения значений
 */
export const ExperienceItem: React.FC<ExperienceItemProps> = ({ item, index, handleChange }) => {
  const handleDateChange = (fieldName: string) => (dateString: string) => {
    // Создаем синтетическое событие
    const syntheticEvent = {
      target: {
        name: fieldName,
        value: dateString,
        getAttribute: (attr: string) => (attr === 'data-index' ? index : null),
      },
    } as React.ChangeEvent<HTMLInputElement>;

    // Вызываем обработчик handleChange с синтетическим событием
    handleChange(syntheticEvent);
  };

  const [currentlyWorking, setCurrentlyWorking] = useState(item.currentlyWorking);

  // Обновляем состояние при изменении props
  useEffect(() => {
    setCurrentlyWorking(item.currentlyWorking);
  }, [item.currentlyWorking]);

  return (
    <div className="space-y-4">
      <FormField
        label="Название компании"
        name="companyName"
        value={item.companyName}
        index={index}
        placeholder="Microsoft"
        handleChange={handleChange}
      />

      <FormField
        label="Должность"
        name="position"
        value={item.position}
        index={index}
        placeholder="Разработчик ПО"
        handleChange={handleChange}
      />

      <FormField
        label="Город"
        name="city"
        value={item.city}
        index={index}
        placeholder="Москва"
        handleChange={handleChange}
      />

      <FormField
        label="Страна"
        name="country"
        value={item.country}
        index={index}
        placeholder="Россия"
        handleChange={handleChange}
      />

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Дата начала</label>
        <Calendar28
          initialValue={item.startDate}
          onDateChange={(value) => handleDateChange('startDate')(value)}
        />
      </div>

      {!currentlyWorking && (
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Дата окончания</label>
          <Calendar28
            initialValue={item.endDate}
            onDateChange={(value) => handleDateChange('endDate')(value)}
          />
        </div>
      )}

      <div className="flex items-center space-x-2 mb-4">
        <Checkbox
          id={`currentlyWorking-${index}`}
          name="currentlyWorking"
          data-index={index}
          onCheckedChange={(checked) => {
            setCurrentlyWorking(!!checked);

            // Создаем синтетическое событие
            const syntheticEvent = {
              target: {
                name: 'currentlyWorking',
                value: checked,
                getAttribute: (attr: string) => (attr === 'data-index' ? index : null),
              },
            } as React.ChangeEvent<HTMLInputElement>;

            handleChange(syntheticEvent);
          }}
          checked={currentlyWorking}
        />
        <label htmlFor={`currentlyWorking-${index}`} className="text-sm">
          Работаю сейчас
        </label>
      </div>

      <FormField
        label="Описание"
        name="description"
        value={item.description}
        index={index}
        as="textarea"
        handleChange={handleChange}
      />
    </div>
  );
};

// Используем memo для оптимизации производительности
export default memo(ExperienceItem);
