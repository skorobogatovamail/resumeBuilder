import { firestore } from '@/firebase';
import { collection, doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

type EditResumeProps = {};

const EditResume: React.FC<EditResumeProps> = () => {
  const { resumeId } = useParams();
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const resumesCollection = collection(firestore, 'resume');

      const resumeRef = doc(resumesCollection, resumeId);
      const resumeSnap = await getDoc(resumeRef);
      if (resumeSnap.exists()) {
        const resumeData = resumeSnap.data();
        setData(resumeData);
      }
    };

    fetchData();
  }, [resumeId]);

  return (
    <div>
      Have a good coding
      {/* {data} */}
    </div>
  );
};
export default EditResume;
