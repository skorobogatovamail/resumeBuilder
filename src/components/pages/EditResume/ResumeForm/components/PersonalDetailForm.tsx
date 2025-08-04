import React from 'react';

type PersonalDetailFormProps = {};

const PersonalDetailForm: React.FC<PersonalDetailFormProps> = () => {
  return (
    <div className="rounded-lg border-t-4 border-primary p-4 shadow-md">
      <h2 className="text-lg font-bold">Personal Detail</h2>
      <p>Get started with the basic information</p>
    </div>
  );
};
export default PersonalDetailForm;
