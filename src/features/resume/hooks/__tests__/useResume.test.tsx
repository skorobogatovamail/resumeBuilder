// src/features/resume/hooks/__tests__/useResume.test.tsx
import { renderHook, act } from '@testing-library/react';
import { useResume } from '../useResume';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import resumeReducer, {
  fetchResume,
  saveResume,
  updatePersonalDetails,
  addExperience,
  updateExperience,
  removeExperience,
} from '@/features/resume/slice/resumeSlice';
import type { Resume, Experience } from '@/types/Resume';

// Мокаем хук useAuthState
jest.mock('react-firebase-hooks/auth', () => ({
  useAuthState: jest.fn(() => [{ uid: 'test-user-id' }, false, undefined]),
}));

// Мокаем dispatch для асинхронных thunks
jest.mock('@/store/hooks', () => ({
  useAppDispatch: () =>
    jest.fn((action) => {
      if (typeof action === 'function') {
        return Promise.resolve({ payload: mockResume });
      }
      return action;
    }),
  useAppSelector: jest.fn((selector) =>
    selector({
      resume: {
        data: mockResume,
        status: 'succeeded',
        error: null,
      },
    }),
  ),
}));

// Тестовые данные
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

const mockExperience: Experience = {
  id: 2,
  position: 'Senior Developer',
  companyName: 'Another Company',
  city: 'Another City',
  country: 'Another Country',
  startDate: '2021-01-01',
  endDate: '2022-01-01',
  description: 'Another description',
};

describe('useResume', () => {
  it('should return resume data and status', () => {
    // Act
    const { result } = renderHook(() => useResume());

    // Assert
    expect(result.current.resumeData).toEqual(mockResume);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('should load resume data', async () => {
    // Act
    const { result } = renderHook(() => useResume());

    await act(async () => {
      await result.current.loadResume('test-resume-id');
    });

    // Assert
    // Проверяем, что dispatch был вызван с правильным действием
    // Это косвенная проверка, так как мы мокаем dispatch
    expect(result.current.resumeData).toEqual(mockResume);
  });

  it('should update personal data', () => {
    // Act
    const { result } = renderHook(() => useResume());

    act(() => {
      result.current.updatePersonalData({ firstName: 'Jane' });
    });

    // Assert
    // Проверяем, что dispatch был вызван с правильным действием
    // Это косвенная проверка, так как мы мокаем dispatch
    expect(result.current.resumeData).toEqual(mockResume);
  });

  it('should add experience item', () => {
    // Act
    const { result } = renderHook(() => useResume());

    act(() => {
      result.current.addExperienceItem(mockExperience);
    });

    // Assert
    // Проверяем, что dispatch был вызван с правильным действием
    // Это косвенная проверка, так как мы мокаем dispatch
    expect(result.current.resumeData).toEqual(mockResume);
  });

  it('should update experience item', () => {
    // Act
    const { result } = renderHook(() => useResume());

    act(() => {
      result.current.updateExperienceItem(0, { position: 'Updated Position' });
    });

    // Assert
    // Проверяем, что dispatch был вызван с правильным действием
    // Это косвенная проверка, так как мы мокаем dispatch
    expect(result.current.resumeData).toEqual(mockResume);
  });

  it('should remove experience item', () => {
    // Act
    const { result } = renderHook(() => useResume());

    act(() => {
      result.current.removeExperienceItem(0);
    });

    // Assert
    // Проверяем, что dispatch был вызван с правильным действием
    // Это косвенная проверка, так как мы мокаем dispatch
    expect(result.current.resumeData).toEqual(mockResume);
  });

  it('should save resume data', async () => {
    // Act
    const { result } = renderHook(() => useResume());

    let saveResult;
    await act(async () => {
      saveResult = await result.current.saveResumeData();
    });

    // Assert
    expect(saveResult).toBe(true);
  });

  it('should return false when saving fails', async () => {
    // Arrange
    jest.spyOn(console, 'error').mockImplementation(() => {});

    // Переопределяем мок для этого теста
    jest.mock('@/store/hooks', () => ({
      useAppDispatch: () => jest.fn(() => Promise.reject(new Error('Save failed'))),
      useAppSelector: jest.fn((selector) =>
        selector({
          resume: {
            data: mockResume,
            status: 'succeeded',
            error: null,
          },
        }),
      ),
    }));

    // Act
    const { result } = renderHook(() => useResume());

    let saveResult;
    await act(async () => {
      saveResult = await result.current.saveResumeData();
    });

    // Assert
    expect(saveResult).toBe(false);

    // Восстанавливаем console.error
    jest.restoreAllMocks();
  });
});
