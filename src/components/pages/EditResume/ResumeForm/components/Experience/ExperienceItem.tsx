import { Checkbox } from '@/components/ui/checkbox';
import type { Experience } from '@/types/Resume';
import { FormField } from '../FormField';
import { Calendar28 } from '@/components/ui/Calendar28';

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
 */
export const ExperienceItem = ({ item, index, handleChange }: ExperienceItemProps) => {
  return (
    <>
      {/* Используем переиспользуемый компонент FormField для текстовых полей */}
      <FormField
        label="Company Name"
        name="companyName"
        value={item.companyName}
        index={index}
        placeholder="Microsoft"
        handleChange={handleChange}
      />

      <FormField
        label="Position"
        name="position"
        value={item.position}
        index={index}
        placeholder="Software Developer"
        handleChange={handleChange}
      />

      <FormField
        label="City"
        name="city"
        value={item.city}
        index={index}
        placeholder="London"
        handleChange={handleChange}
      />

      <FormField
        label="Country"
        name="country"
        value={item.country}
        index={index}
        placeholder="Great Britain"
        handleChange={handleChange}
      />

      {/* Для дат используем CustomDatePicker */}
      <div>
        <label>Start Date</label>
        <Calendar28
          name="startDate"
          data-index={index}
          onChange={handleChange}
          value={item.startDate}
          placeholder="01.01.2025"
        />
      </div>

      {/* Условный рендеринг для поля End Date */}
      {!item.currentlyWorking && (
        <div>
          <label>End Date</label>
          <Calendar28
            name="endDate"
            data-index={index}
            onChange={handleChange}
            value={item.endDate}
            placeholder="01.10.2025"
          />
        </div>
      )}

      {/* Чекбокс для поля Currently Working */}
      <div>
        <label>Currently Working</label>
        <Checkbox
          id={`currentlyWorking-${index}`}
          name="currentlyWorking"
          data-index={index}
          onChange={handleChange}
          checked={item.currentlyWorking}
        />
      </div>

      {/* Текстовая область для описания */}
      <FormField
        label="Description"
        name="description"
        value={item.description}
        index={index}
        as="textarea"
        handleChange={handleChange}
      />
    </>
  );
};
