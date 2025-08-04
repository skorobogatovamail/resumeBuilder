import React from 'react';

type ExperienceFormProps = {};

const ExperienceForm: React.FC<ExperienceFormProps> = () => {
  return (
    <div className="rounded-lg border-t-4 border-primary p-4 shadow-md">
      <h2 className="text-lg font-bold">Experience</h2>
      <p>Describe your experience in detail</p>
    </div>
  );
};
export default ExperienceForm;
