import React from 'react';

type SkillsFormProps = {};

const SkillsForm: React.FC<SkillsFormProps> = () => {
  return (
    <div className="rounded-lg border-t-4 border-primary p-4 shadow-md">
      <h2 className="text-lg font-bold">Skills</h2>
      <p>Describe your skills with detail</p>
    </div>
  );
};
export default SkillsForm;
