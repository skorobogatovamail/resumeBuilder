import { PlusSquare } from 'lucide-react';
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '../ui/button';

type AddResumeProps = {};

const AddResume: React.FC<AddResumeProps> = () => {
  const [isOpen, setIsOpen] = useState(false);
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
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your account and remove
              your data from our servers.
            </DialogDescription>
            <div className="flex justify-end gap-2">
              <Button variant="secondary" onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
              <Button>Create</Button>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};
export default AddResume;
