import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import React, { useContext } from 'react';

const PersonalDetailForm: React.FC = () => {
  const context = useContext(ResumeInfoContext);
  if (!context) return null;
  const { resumeInfo, setResumeInfo } = context;

  const handleInputChange = (e: HTMLInputElement) => {
    console.log(resumeInfo);
    if (resumeInfo && setResumeInfo) {
      setResumeInfo({ ...resumeInfo, [e.name]: e.value });
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(resumeInfo);
  };

  return (
    <div className="rounded-lg border-t-4 border-primary p-4 shadow-md">
      <h2 className="text-lg font-bold">Personal Detail</h2>
      <p>Get started with the basic information</p>

      <form className="grid grid-cols-2 gap-4" onSubmit={handleSubmit}>
        <div>
          <label>First Name</label>
          <Input
            name="firstName"
            required
            placeholder="John"
            onChange={(e) => handleInputChange(e.target)}
          ></Input>
        </div>
        <div>
          <label>Last Name</label>
          <Input name="lasttName" required placeholder="Doe"></Input>
        </div>
        <div>
          <label>Job Title</label>
          <Input name="jobTitle" required placeholder="Sowtware Developer"></Input>
        </div>
        <div>
          <label>Address</label>
          <Input name="address" required placeholder="Los Angeles"></Input>
        </div>
        <div>
          <label>Email</label>
          <Input name="email" type="email" required placeholder="email@example.com"></Input>
        </div>
        <div>
          <label>Phone</label>
          <Input name="phone" type="phone" required placeholder="+1 234 567 "></Input>
        </div>

        <div className="mt-3 flex justify-end">
          <Button type="submit">Save</Button>
        </div>
      </form>
    </div>
  );
};
export default PersonalDetailForm;
