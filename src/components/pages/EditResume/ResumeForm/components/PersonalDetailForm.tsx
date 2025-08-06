import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import { auth, firestore } from '@/firebase';
import { addDoc, collection, doc, getDoc, updateDoc } from 'firebase/firestore';
import React, { useContext, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { toast } from 'react-toastify';

function removeUndefined<T extends object>(obj: T): Partial<T> {
  return Object.fromEntries(Object.entries(obj).filter(([_, v]) => v !== undefined)) as Partial<T>;
}

const PersonalDetailForm: React.FC = () => {
  const [user] = useAuthState(auth);
  const [isLoading, setIsLoading] = useState(false);

  const context = useContext(ResumeInfoContext);
  if (!context) return null;
  const { resumeInfo, setResumeInfo } = context;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (resumeInfo && setResumeInfo) {
      setResumeInfo({ ...resumeInfo, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!resumeInfo || !user?.uid) {
      return;
    }
    setIsLoading(true);
    try {
      const resumeCollection = collection(firestore, 'resumes');
      const resumeRef = doc(resumeCollection, String(resumeInfo.id));
      const resumeDoc = await getDoc(resumeRef);
      if (!resumeDoc.exists()) {
        await addDoc(resumeCollection, { ...resumeInfo, userId: user.uid });
      } else {
        await updateDoc(resumeRef, removeUndefined(resumeInfo) as Record<string, any>);
      }
      toast.success('Resume added successfully');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Error adding resume');
      console.error('Error adding document: ', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="rounded-lg border-t-4 border-primary p-4 shadow-md">
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
