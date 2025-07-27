import AddResume from '@/components/shared/AddResume';
import ResumeCardItem from '@/components/shared/ResumeCardItem';
import { auth, firestore } from '@/firebase';
import type { Resume } from '@/types/Resume';
import { collection, getDocs, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

type DashboardProps = {};

const Dashboard: React.FC<DashboardProps> = () => {
  const [user, loading, error] = useAuthState(auth);
  const [resumeList, setResumeList] = useState<Resume[]>([]);

  useEffect(() => {
    if (!user || loading) return;
    const fetchData = async () => {
      try {
        const q = query(collection(firestore, 'resumes'), where('userId', '==', user.uid));

        const querySnapshot = await getDocs(q);
        const resumeData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Resume[];

        setResumeList(resumeData);
      } catch (err) {
        console.error('Error fetching resumes:', err);
      }
    };

    fetchData();
  }, [user]);

  return (
    <div className="flex flex-col justify-center h-screen px-10 md:px-20 lg:px-32">
      <div className="flex flex-col gap-4">
        <h1 className="font-bold text-3xl">My resume</h1>
        <p>Start creating your resume</p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 mb-4">
          <AddResume />
          {resumeList.map((item) => (
            <ResumeCardItem item={item} key={item.id} />
          ))}
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
