import { Loader, PlusSquare } from 'lucide-react';
import React, { use, useState } from 'react';
import { toast } from 'react-toastify';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '../ui/button';
import { addDoc, collection } from 'firebase/firestore';
import { auth, firestore } from '@/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';

type AddResumeProps = {};

const AddResume: React.FC<AddResumeProps> = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [resumeTitle, setResumeTitle] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!resumeTitle || !user?.uid) {
      return;
    }
    setIsLoading(true);
    try {
      const data = {
        title: resumeTitle,
        userId: user?.uid,
      };
      const resumeCollection = collection(firestore, 'resumes');
      const newResume = await addDoc(resumeCollection, data);
      toast.success('Resume added successfully');

      setIsOpen(false);
      setResumeTitle('');
      navigate(`/dashboard/resume/${newResume.id}/edit`);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Error adding resume');
      console.error('Error adding document: ', error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div>
      <div
        className="p-14 py-24 border-dashed items-center flex justify-center 
      bg-secondary rounded-lg h-[280px] hover:scale-105 transition-all 
      hover:shadow-md cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <PlusSquare />
      </div>

      <Dialog open={isOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Resume</DialogTitle>
            <DialogDescription>
              <p>Add title for ypur new resume</p>
              <Input
                className="my-2"
                placeholder="Full Stack Developer"
                onChange={(e) => setResumeTitle(e.target.value)}
                value={resumeTitle}
              />
            </DialogDescription>
            <div className="flex justify-end gap-2">
              <Button variant="secondary" onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSubmit} disabled={!resumeTitle || isLoading}>
                {isLoading ? <Loader className="animate-spin" /> : 'Create'}
              </Button>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};
export default AddResume;
