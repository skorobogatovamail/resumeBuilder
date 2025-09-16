import React, { useContext } from 'react';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import { ExperienceItem } from './ExperienceItem';
import type { Experience } from '@/types/Resume';
import { Button } from '@/components/ui/button';
import { PlusIcon, Trash } from 'lucide-react';

/**
 * Свойства компонента ExperienceForm
 */
type ExperienceFormProps = {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isLoading: boolean;
};

/**
 * Компонент для управления опытом работы
 * Позволяет добавлять, редактировать и удалять опыт работы
 */
const ExperienceForm: React.FC<ExperienceFormProps> = ({ handleSubmit, isLoading }) => {
  const context = useContext(ResumeInfoContext);
  if (!context) {
    return null;
  }

  const { resumeInfo, setResumeInfo } = context;

  const extractNameAndValue = (
    e:
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | React.FormEvent<HTMLButtonElement>,
  ): { name: string; value: string | boolean } => {
    if ('checked' in e.target) {
      // Обработка чекбокса
      return {
        name: (e.target as HTMLInputElement).name,
        value: (e.target as HTMLInputElement).checked,
      };
    } else {
      // Обработка текстовых полей
      return {
        name: (e.target as HTMLInputElement | HTMLTextAreaElement).name,
        value: (e.target as HTMLInputElement | HTMLTextAreaElement).value,
      };
    }
  };

  const handleInputChange = (
    e:
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | React.FormEvent<HTMLButtonElement>,
  ) => {
    const { name, value } = extractNameAndValue(e);
    // Получаем индекс опыта из атрибута data-index элемента
    const index = parseInt((e.target as HTMLElement).getAttribute('data-index') || '0', 10);

    if (resumeInfo && setResumeInfo && resumeInfo.experience) {
      // Создаем копию массива опыта
      const updatedExperience = [...resumeInfo.experience];

      // Обновляем нужное свойство в объекте опыта
      if (updatedExperience[index]) {
        updatedExperience[index] = {
          ...updatedExperience[index],
          [name]: value,
        };
      }

      // Обновляем состояние
      setResumeInfo({
        ...resumeInfo,
        experience: updatedExperience,
      });
    }
  };

  // Функция для добавления нового опыта
  const addExperience = () => {
    if (resumeInfo && setResumeInfo) {
      const updatedExperience = [...(resumeInfo?.experience || [])];
      const newExperience: Experience = {
        id: Date.now(),
        position: '',
        companyName: '',
        city: '',
        country: '',
        startDate: '',
        description: '',
      };

      setResumeInfo({
        ...resumeInfo,
        experience: [...updatedExperience, newExperience],
      });
    }
  };

  // Функция для удаления опыта
  const removeExperience = (index: number) => {
    if (resumeInfo && setResumeInfo && resumeInfo.experience) {
      const updatedExperience = [...resumeInfo.experience];
      updatedExperience.splice(index, 1);

      setResumeInfo({
        ...resumeInfo,
        experience: updatedExperience,
      });
    }
  };

  return (
    <div className="rounded-lg border-t-4 border-primary p-4 shadow-md">
      <h2 className="text-lg font-bold">Experience</h2>
      <p>Describe your experience in detail</p>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6">
        {resumeInfo?.experience?.map((el, i) => (
          <div key={i} className="relative border p-4 rounded-md">
            <ExperienceItem item={el} index={i} handleChange={handleInputChange} />
            <Button
              type="button"
              onClick={() => removeExperience(i)}
              className="absolute top-2 right-2"
              variant="destructive"
              size="sm"
            >
              <Trash className="h-4 w-4" />
              <span className="ml-1">Remove</span>
            </Button>
          </div>
        ))}

        <Button type="button" onClick={addExperience} className="mt-4" variant="outline">
          <PlusIcon className="h-4 w-4 mr-2" />
          Add Experience
        </Button>
      </form>
    </div>
  );
};
export default ExperienceForm;
