import React from 'react';

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
    <div>
      <label htmlFor={id}>{label}</label>
      {as === 'input' ? (
        <input
          type={type}
          id={id}
          name={name}
          data-index={index}
          onChange={handleChange}
          value={value}
          placeholder={placeholder}
        />
      ) : (
        <textarea
          id={id}
          name={name}
          data-index={index}
          onChange={handleChange}
          value={value}
          placeholder={placeholder}
        />
      )}
    </div>
  );
};
