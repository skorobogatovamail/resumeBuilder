import React, { useContext } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';

interface PersonalDetailFormProps {
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isLoading: boolean;
}

const PersonalDetailForm: React.FC<PersonalDetailFormProps> = ({
  handleInputChange,
  handleSubmit,
  isLoading,
}) => {
  const context = useContext(ResumeInfoContext);
  if (!context) return null;
  const { resumeInfo } = context;

  return (
    <div className="rounded-lg border-t-4 border-primary p-4 shadow-md  flex flex-col gap-4">
      <h2 className="text-lg font-bold">Personal Detail</h2>
      <p>Get started with the basic information</p>

      <form className="grid grid-cols-2 gap-4" onSubmit={handleSubmit}>
        <div>
          <label className="text-sm">First Name</label>
          <Input
            name="firstName"
            required
            placeholder="John"
            onChange={handleInputChange}
            value={resumeInfo?.firstName}
          ></Input>
        </div>
        <div>
          <label className="text-sm">Last Name</label>
          <Input
            name="lastName"
            required
            onChange={handleInputChange}
            placeholder="Doe"
            value={resumeInfo?.lastName}
          ></Input>
        </div>
        <div>
          <label className="text-sm col-span-2">Job Title</label>
          <Input
            name="jobTitle"
            onChange={handleInputChange}
            placeholder="Sowtware Developer"
            value={resumeInfo?.jobTitle}
          ></Input>
        </div>
        <div>
          <label className="text-sm col-span-2">Address</label>
          <Input
            name="address"
            onChange={handleInputChange}
            placeholder="Los Angeles"
            value={resumeInfo?.address}
          ></Input>
        </div>
        <div>
          <label className="text-sm">Email</label>
          <Input
            name="email"
            type="email"
            onChange={handleInputChange}
            placeholder="email@example.com"
            value={resumeInfo?.email}
          ></Input>
        </div>
        <div>
          <label className="text-sm">Phone</label>
          <Input
            name="phone"
            type="phone"
            onChange={handleInputChange}
            placeholder="+1 234 567 89 01"
            value={resumeInfo?.phone}
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
export default PersonalDetailForm;
