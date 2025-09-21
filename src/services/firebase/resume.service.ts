// src/services/firebase/resume.service.ts
import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
} from 'firebase/firestore';
import { firestore } from './index';
import type { Resume } from '@/types/Resume';

export class ResumeService {
  private static readonly COLLECTION_NAME = 'resumes';
  private static readonly collection = collection(firestore, ResumeService.COLLECTION_NAME);

  /**
   * Получение всех резюме пользователя
   */
  static async getUserResumes(userId: string): Promise<Resume[]> {
    try {
      const q = query(this.collection, where('userId', '==', userId));
      const querySnapshot = await getDocs(q);

      return querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Resume[];
    } catch (error) {
      console.error('Error fetching resumes:', error);
      throw error;
    }
  }

  /**
   * Получение резюме по ID
   */
  static async getResumeById(resumeId: string): Promise<Resume> {
    try {
      const resumeRef = doc(this.collection, resumeId);
      const resumeSnap = await getDoc(resumeRef);

      if (resumeSnap.exists()) {
        return { ...resumeSnap.data(), id: resumeId } as Resume;
      }

      throw new Error('Резюме не найдено');
    } catch (error) {
      console.error('Error fetching resume:', error);
      throw error;
    }
  }

  /**
   * Создание нового резюме
   */
  static async createResume(resumeData: Resume, userId: string): Promise<Resume> {
    try {
      const docRef = await addDoc(this.collection, { ...resumeData, userId });
      return { ...resumeData, id: docRef.id };
    } catch (error) {
      console.error('Error creating resume:', error);
      throw error;
    }
  }

  /**
   * Обновление существующего резюме
   */
  static async updateResume(resumeData: Resume): Promise<Resume> {
    try {
      if (!resumeData.id) {
        throw new Error('Resume ID is required for update');
      }

      const resumeRef = doc(this.collection, resumeData.id);
      const resumeDoc = await getDoc(resumeRef);

      if (!resumeDoc.exists()) {
        throw new Error('Resume not found');
      }

      // Функция для удаления undefined значений из объекта
      const removeUndefined = <T extends object>(obj: T): Partial<T> => {
        return Object.fromEntries(
          Object.entries(obj).filter(([_, v]) => v !== undefined),
        ) as Partial<T>;
      };

      await updateDoc(resumeRef, removeUndefined(resumeData) as Record<string, any>);
      return resumeData;
    } catch (error) {
      console.error('Error updating resume:', error);
      throw error;
    }
  }

  /**
   * Удаление резюме
   */
  static async deleteResume(resumeId: string): Promise<void> {
    try {
      const resumeRef = doc(this.collection, resumeId);
      await deleteDoc(resumeRef);
    } catch (error) {
      console.error('Error deleting resume:', error);
      throw error;
    }
  }
}
