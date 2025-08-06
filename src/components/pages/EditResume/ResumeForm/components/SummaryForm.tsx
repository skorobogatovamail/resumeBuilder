import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import React, { useContext } from 'react';

type SummaryFormProps = {
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isLoading: boolean;
};

const SummaryForm: React.FC<SummaryFormProps> = ({
  handleInputChange,
  handleSubmit,
  isLoading,
}) => {
  const context = useContext(ResumeInfoContext);
  if (!context) return;

  const { resumeInfo } = context;

  return (
    <div className="rounded-lg border-t-4 border-primary p-4 shadow-md">
      <h2 className="text-lg font-bold">Personal Detail</h2>
      <p>Get started with the basic information</p>

      <form className="grid grid-cols-2 gap-4" onSubmit={handleSubmit}>
        <div>
          <label className="text-sm">First Name</label>
          <Input
            name="summary"
            required
            placeholder="John"
            onChange={handleInputChange}
            value={resumeInfo?.summary}
          ></Input>
        </div>

        <div className="mt-3 flex justify-end">
          <Button disabled={isLoading} type="submit">
            Save
          </Button>
        </div>
      </form>
    </div>
  );
};
export default SummaryForm;
