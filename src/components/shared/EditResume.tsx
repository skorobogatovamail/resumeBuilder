import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { firestore } from '@/firebase';
import { collection, doc, getDoc } from 'firebase/firestore';
import ResumeForm from './ResumeForm';
import ResumePreview from './ResumePreview';
import type { Resume } from '@/types/Resume';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import dummy from '@/data/dummy';

const EditResume: React.FC = () => {
  const { resumeId } = useParams();
  const [resumeInfo, setResumeInfo] = useState<Resume>();

  useEffect(() => {
    // const fetchData = async () => {
    //   const resumesCollection = collection(firestore, 'resumes');

    //   const resumeRef = doc(resumesCollection, resumeId);
    //   const resumeSnap = await getDoc(resumeRef);
    //   if (resumeSnap.exists()) {
    //     const resumeData = resumeSnap.data();
    //     setResumeInfo(resumeData);
    //   }
    // };

    // fetchData();
    setResumeInfo(dummy);
  }, [resumeId]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 p-10 ">
      <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }}>
        <ResumeForm />
        <ResumePreview />
      </ResumeInfoContext.Provider>
    </div>
  );
};
export default EditResume;
