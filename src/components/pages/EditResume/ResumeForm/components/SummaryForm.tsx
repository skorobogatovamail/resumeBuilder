import React from 'react';

type SummaryFormProps = {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isLoading: boolean;
};

const SummaryForm: React.FC<SummaryFormProps> = ({ handleSubmit, isLoading }) => {
  return (
    <div className="rounded-lg border-t-4 border-primary p-4 shadow-md">
      <h2 className="text-lg font-bold">Summary</h2>
      <p>The summary of your experience</p>
    </div>
  );
};
export default SummaryForm;
