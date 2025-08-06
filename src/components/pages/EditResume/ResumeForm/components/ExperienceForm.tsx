import React from 'react';

type ExperienceFormProps = {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isLoading: boolean;
};

const ExperienceForm: React.FC<ExperienceFormProps> = ({ handleSubmit, isLoading }) => {
  return (
    <div className="rounded-lg border-t-4 border-primary p-4 shadow-md">
      <h2 className="text-lg font-bold">Experience</h2>
      <p>Describe your experience in detail</p>
    </div>
  );
};
export default ExperienceForm;
