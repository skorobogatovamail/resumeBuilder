// src/features/resume/components/form/FormField.tsx
import React, { memo } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

/**
 * Интерфейс свойств компонента FormField
 */
interface FormFieldProps {
  label: string;
  name: string;
  value: string;
  index: number;
  placeholder?: string;
  type?: string;
  as?: 'input' | 'textarea';
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

/**
 * Переиспользуемый компонент для полей формы
 * Поддерживает input и textarea
 *
 * @param label - Текст метки поля
 * @param name - Имя поля
 * @param value - Значение поля
 * @param index - Индекс поля (для массивов)
 * @param placeholder - Текст подсказки
 * @param type - Тип поля ввода (для input)
 * @param as - Тип компонента ('input' или 'textarea')
 * @param handleChange - Обработчик изменения значения
 */
export const FormField: React.FC<FormFieldProps> = ({
  label,
  name,
  value,
  index,
  placeholder = '',
  type = 'text',
  as = 'input',
  handleChange,
}) => {
  const id = `${name}-${index}`;

  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-sm font-medium mb-1">
        {label}
      </label>
      {as === 'input' ? (
        <Input
          type={type}
          id={id}
          name={name}
          data-index={index}
          onChange={handleChange}
          value={value}
          placeholder={placeholder}
          className="w-full"
        />
      ) : (
        <Textarea
          id={id}
          name={name}
          data-index={index}
          onChange={handleChange}
          value={value}
          placeholder={placeholder}
          className="w-full"
        />
      )}
    </div>
  );
};

// Используем memo для оптимизации производительности
export default memo(FormField);
