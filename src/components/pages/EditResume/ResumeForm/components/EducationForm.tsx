import React from 'react';

type EducationFormProps = {};

const EducationForm: React.FC<EducationFormProps> = () => {
  return (
    <div className="rounded-lg border-t-4 border-primary p-4 shadow-md">
      <h2 className="text-lg font-bold">Education</h2>
      <p>Describe your education in detail</p>
    </div>
  );
};
export default EducationForm;
