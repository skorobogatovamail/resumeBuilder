import React from 'react';

type SkillsFormProps = {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isLoading: boolean;
};

const SkillsForm: React.FC<SkillsFormProps> = ({ handleSubmit, isLoading }) => {
  return (
    <div className="rounded-lg border-t-4 border-primary p-4 shadow-md">
      <h2 className="text-lg font-bold">Skills</h2>
      <p>Describe your skills with detail</p>
    </div>
  );
};
export default SkillsForm;
