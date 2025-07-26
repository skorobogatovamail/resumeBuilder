import AddResume from '@/components/shared/AddResume';
import ResumeCardItem from '@/components/shared/ResumeCardItem';
import { firestore } from '@/firebase';
import type { Resume } from '@/types/Resume';
import { useUser } from '@clerk/clerk-react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';

type DashboardProps = {};

const Dashboard: React.FC<DashboardProps> = () => {
  const { user } = useUser();
  const [resumeList, setResumeList] = useState<Resume[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const resumesCollection = collection(firestore, 'resume');
      const q = query(resumesCollection, where('userId', '==', user?.id));
      const querySnapshot = await getDocs(q);
      const resumeData: Resume[] = [];
      querySnapshot.forEach((el) => resumeData.push(el.data() as Resume));
      setResumeList(resumeData);
    };

    fetchData();
  }, []);

  return (
    <div className="p-10 md:px-20 lg:px-32">
      <h2 className="font-bold text-3xl">My resume</h2>
      <p>Start creating your resume</p>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 mb-4">
        <AddResume />
        {resumeList.map((item) => (
          <ResumeCardItem item={item} key={item.id} />
        ))}
      </div>
    </div>
  );
};
export default Dashboard;
