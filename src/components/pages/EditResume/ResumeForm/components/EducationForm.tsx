import React from 'react';

type EducationFormProps = {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isLoading: boolean;
};

const EducationForm: React.FC<EducationFormProps> = ({ handleSubmit, isLoading }) => {
  return (
    <div className="rounded-lg border-t-4 border-primary p-4 shadow-md">
      <h2 className="text-lg font-bold">Education</h2>
      <p>Describe your education in detail</p>
    </div>
  );
};
export default EducationForm;
