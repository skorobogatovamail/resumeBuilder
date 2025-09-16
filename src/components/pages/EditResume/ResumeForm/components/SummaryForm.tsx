import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import { askAi } from '@/lib/yandexgpt';
import { BrainIcon } from 'lucide-react';
import React, { useContext, useState } from 'react';

type SummaryFormProps = {
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isLoading: boolean;
};

const SummaryForm: React.FC<SummaryFormProps> = ({
  handleInputChange,
  handleSubmit,
  isLoading,
}) => {
  const context = useContext(ResumeInfoContext);
  const [isGenerating, setIsGenerating] = useState(false);

  if (!context) return null;

  const { resumeInfo, setResumeInfo } = context;

  const handleGenerateWithAI = async () => {
    try {
      setIsGenerating(true);

      if (!resumeInfo) {
        console.error('Resume info is null');
        return;
      }

      const jobTitle = resumeInfo.jobTitle || 'Frontend Developer';
      const generatedSummary = await askAi(jobTitle, resumeInfo?.summary);

      if (setResumeInfo) {
        setResumeInfo({
          ...resumeInfo,
          summary: generatedSummary,
        });
      }
    } catch (error) {
      console.error('Ошибка при генерации текста:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="rounded-lg border-t-4 border-primary p-4 shadow-md flex flex-col gap-4">
      <h2 className="text-lg font-bold">Summary</h2>
      <p>Create the main information about your role</p>

      <form onSubmit={handleSubmit}>
        <div className="flex gap-4 justify-between mb-4 items-center pl-2">
          <label className="text-sm">Summary</label>
          <Button type="button" className="" onClick={handleGenerateWithAI} disabled={isGenerating}>
            <BrainIcon className="mr-1 h-4 w-4" />
            {isGenerating ? 'Генерация...' : 'Generate with AI'}
          </Button>
        </div>

        <div className="flex gap-4">
          <Textarea
            name="summary"
            required
            onChange={handleInputChange}
            value={resumeInfo?.summary}
            rows={10}
            className="h-[200px]"
          ></Textarea>
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
