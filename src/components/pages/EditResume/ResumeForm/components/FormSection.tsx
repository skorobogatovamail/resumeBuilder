import { Button } from '@/components/ui/button';

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
