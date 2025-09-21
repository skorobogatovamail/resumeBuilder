// src/services/firebase/__tests__/resume.service.test.ts
import { ResumeService } from '../resume.service';
import { firestore } from '../index';
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
import type { Resume } from '@/types/Resume';

// Мокаем модули firebase/firestore
jest.mock('../index', () => ({
  firestore: {},
}));

jest.mock('firebase/firestore', () => ({
  collection: jest.fn(),
  doc: jest.fn(),
  getDoc: jest.fn(),
  getDocs: jest.fn(),
  addDoc: jest.fn(),
  updateDoc: jest.fn(),
  deleteDoc: jest.fn(),
  query: jest.fn(),
  where: jest.fn(),
}));

describe('ResumeService', () => {
  const mockResume: Resume = {
    id: 'test-resume-id',
    firstName: 'John',
    lastName: 'Doe',
    jobTitle: 'Software Developer',
    experience: [
      {
        id: 1,
        position: 'Developer',
        companyName: 'Test Company',
        city: 'Test City',
        country: 'Test Country',
        startDate: '2020-01-01',
        endDate: '2021-01-01',
        description: 'Test description',
      },
    ],
  };

  const mockResumeDoc = {
    id: 'test-resume-id',
    data: () => ({
      firstName: 'John',
      lastName: 'Doe',
      jobTitle: 'Software Developer',
      experience: [
        {
          id: 1,
          position: 'Developer',
          companyName: 'Test Company',
          city: 'Test City',
          country: 'Test Country',
          startDate: '2020-01-01',
          endDate: '2021-01-01',
          description: 'Test description',
        },
      ],
    }),
  };

  const mockQuerySnapshot = {
    docs: [mockResumeDoc],
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (collection as jest.Mock).mockReturnValue('resumes-collection');
    (doc as jest.Mock).mockReturnValue('resume-doc-ref');
    (query as jest.Mock).mockReturnValue('query-result');
    (where as jest.Mock).mockReturnValue('where-condition');
  });

  describe('getUserResumes', () => {
    it('should return resumes for a user', async () => {
      // Arrange
      const userId = 'test-user-id';
      (getDocs as jest.Mock).mockResolvedValueOnce(mockQuerySnapshot);

      // Act
      const result = await ResumeService.getUserResumes(userId);

      // Assert
      expect(collection).toHaveBeenCalledWith(firestore, 'resumes');
      expect(where).toHaveBeenCalledWith('userId', '==', userId);
      expect(query).toHaveBeenCalledWith('resumes-collection', 'where-condition');
      expect(getDocs).toHaveBeenCalledWith('query-result');
      expect(result).toEqual([
        {
          id: 'test-resume-id',
          firstName: 'John',
          lastName: 'Doe',
          jobTitle: 'Software Developer',
          experience: [
            {
              id: 1,
              position: 'Developer',
              companyName: 'Test Company',
              city: 'Test City',
              country: 'Test Country',
              startDate: '2020-01-01',
              endDate: '2021-01-01',
              description: 'Test description',
            },
          ],
        },
      ]);
    });

    it('should throw an error when fetching resumes fails', async () => {
      // Arrange
      const userId = 'test-user-id';
      const error = new Error('Failed to fetch resumes');
      (getDocs as jest.Mock).mockRejectedValueOnce(error);

      // Act & Assert
      await expect(ResumeService.getUserResumes(userId)).rejects.toThrow('Failed to fetch resumes');
    });
  });

  describe('getResumeById', () => {
    it('should return a resume by id', async () => {
      // Arrange
      const resumeId = 'test-resume-id';
      const mockDocSnap = {
        exists: jest.fn().mockReturnValue(true),
        data: jest.fn().mockReturnValue(mockResume),
      };
      (getDoc as jest.Mock).mockResolvedValueOnce(mockDocSnap);

      // Act
      const result = await ResumeService.getResumeById(resumeId);

      // Assert
      expect(doc).toHaveBeenCalledWith('resumes-collection', resumeId);
      expect(getDoc).toHaveBeenCalledWith('resume-doc-ref');
      expect(result).toEqual({ ...mockResume, id: resumeId });
    });

    it('should throw an error when resume does not exist', async () => {
      // Arrange
      const resumeId = 'test-resume-id';
      const mockDocSnap = {
        exists: jest.fn().mockReturnValue(false),
      };
      (getDoc as jest.Mock).mockResolvedValueOnce(mockDocSnap);

      // Act & Assert
      await expect(ResumeService.getResumeById(resumeId)).rejects.toThrow('Резюме не найдено');
    });
  });

  describe('createResume', () => {
    it('should create a new resume', async () => {
      // Arrange
      const userId = 'test-user-id';
      const resumeData = { firstName: 'John', lastName: 'Doe' } as Resume;
      (addDoc as jest.Mock).mockResolvedValueOnce({ id: 'new-resume-id' });

      // Act
      const result = await ResumeService.createResume(resumeData, userId);

      // Assert
      expect(collection).toHaveBeenCalledWith(firestore, 'resumes');
      expect(addDoc).toHaveBeenCalledWith('resumes-collection', { ...resumeData, userId });
      expect(result).toEqual({ ...resumeData, id: 'new-resume-id' });
    });

    it('should throw an error when creating resume fails', async () => {
      // Arrange
      const userId = 'test-user-id';
      const resumeData = { firstName: 'John', lastName: 'Doe' } as Resume;
      const error = new Error('Failed to create resume');
      (addDoc as jest.Mock).mockRejectedValueOnce(error);

      // Act & Assert
      await expect(ResumeService.createResume(resumeData, userId)).rejects.toThrow(
        'Failed to create resume',
      );
    });
  });

  describe('updateResume', () => {
    it('should update an existing resume', async () => {
      // Arrange
      const resumeData = { ...mockResume, jobTitle: 'Senior Developer' };
      const mockDocSnap = {
        exists: jest.fn().mockReturnValue(true),
      };
      (getDoc as jest.Mock).mockResolvedValueOnce(mockDocSnap);

      // Act
      const result = await ResumeService.updateResume(resumeData);

      // Assert
      expect(doc).toHaveBeenCalledWith('resumes-collection', 'test-resume-id');
      expect(getDoc).toHaveBeenCalledWith('resume-doc-ref');
      expect(updateDoc).toHaveBeenCalledWith('resume-doc-ref', resumeData);
      expect(result).toEqual(resumeData);
    });

    it('should throw an error when resume ID is missing', async () => {
      // Arrange
      const resumeData = { firstName: 'John', lastName: 'Doe' } as Resume;

      // Act & Assert
      await expect(ResumeService.updateResume(resumeData)).rejects.toThrow(
        'Resume ID is required for update',
      );
    });

    it('should throw an error when resume does not exist', async () => {
      // Arrange
      const resumeData = { ...mockResume };
      const mockDocSnap = {
        exists: jest.fn().mockReturnValue(false),
      };
      (getDoc as jest.Mock).mockResolvedValueOnce(mockDocSnap);

      // Act & Assert
      await expect(ResumeService.updateResume(resumeData)).rejects.toThrow('Resume not found');
    });
  });

  describe('deleteResume', () => {
    it('should delete a resume', async () => {
      // Arrange
      const resumeId = 'test-resume-id';
      (deleteDoc as jest.Mock).mockResolvedValueOnce(undefined);

      // Act
      await ResumeService.deleteResume(resumeId);

      // Assert
      expect(doc).toHaveBeenCalledWith('resumes-collection', resumeId);
      expect(deleteDoc).toHaveBeenCalledWith('resume-doc-ref');
    });

    it('should throw an error when deleting resume fails', async () => {
      // Arrange
      const resumeId = 'test-resume-id';
      const error = new Error('Failed to delete resume');
      (deleteDoc as jest.Mock).mockRejectedValueOnce(error);

      // Act & Assert
      await expect(ResumeService.deleteResume(resumeId)).rejects.toThrow('Failed to delete resume');
    });
  });
});
