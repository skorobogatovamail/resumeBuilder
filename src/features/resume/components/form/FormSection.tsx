// src/features/resume/components/form/FormSection.tsx
import React from 'react';
import { Button } from '@/components/ui/button';

/**
 * Компонент секции формы
 * Используется для группировки полей формы и добавления кнопки сохранения
 *
 * @param sectionTitle - Заголовок секции
 * @param description - Описание секции
 * @param onSave - Функция, вызываемая при нажатии на кнопку сохранения
 * @param children - Дочерние элементы (поля формы)
 */
interface FormSectionProps {
  sectionTitle: string;
  description: string;
  onSave: () => void;
}

export const FormSection: React.FC<React.PropsWithChildren<FormSectionProps>> = ({
  sectionTitle,
  description,
  onSave,
  children,
}) => {
  return (
    <div className="rounded-lg border-t-t border-primary p-4 shadow-md">
      <h2 className="text-lg font-bold">{sectionTitle}</h2>
      <p>{description}</p>
      {children}
      <div className="flex justify-end mt-3">
        <Button onClick={onSave}>Save</Button>
      </div>
    </div>
  );
};
