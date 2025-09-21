// src/store/resumeSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { collection, doc, getDoc, addDoc, updateDoc } from 'firebase/firestore';
import { firestore } from '@/firebase';
import { toast } from 'sonner';
import type { Resume, Experience, Education, Skill } from '@/types/Resume';

// Функция для удаления undefined значений из объекта
function removeUndefined<T extends object>(obj: T): Partial<T> {
  return Object.fromEntries(Object.entries(obj).filter(([_, v]) => v !== undefined)) as Partial<T>;
}

// Асинхронный thunk для загрузки резюме
export const fetchResume = createAsyncThunk('resume/fetchResume', async (resumeId: string) => {
  const resumesCollection = collection(firestore, 'resumes');
  const resumeRef = doc(resumesCollection, resumeId);
  const resumeSnap = await getDoc(resumeRef);

  if (resumeSnap.exists()) {
    return { ...resumeSnap.data(), id: resumeId } as Resume;
  }

  throw new Error('Резюме не найдено');
});

// Асинхронный thunk для сохранения резюме
export const saveResume = createAsyncThunk(
  'resume/saveResume',
  async ({ resumeData, userId }: { resumeData: Resume; userId: string }) => {
    const resumesCollection = collection(firestore, 'resumes');

    if (resumeData.id) {
      const resumeRef = doc(resumesCollection, String(resumeData.id));
      const resumeDoc = await getDoc(resumeRef);

      if (resumeDoc.exists()) {
        await updateDoc(resumeRef, removeUndefined(resumeData) as Record<string, any>);
        toast('Резюме успешно сохранено');
        return resumeData;
      }
    }

    // Если резюме не существует или нет ID, создаем новое
    const docRef = await addDoc(resumesCollection, { ...resumeData, userId });
    toast('Резюме успешно создано');
    return { ...resumeData, id: docRef.id };
  },
);

interface ResumeState {
  data: Resume | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: ResumeState = {
  data: null,
  status: 'idle',
  error: null,
};

const resumeSlice = createSlice({
  name: 'resume',
  initialState,
  reducers: {
    // Обновление личных данных
    updatePersonalDetails: (state, action: PayloadAction<Partial<Resume>>) => {
      if (state.data) {
        state.data = { ...state.data, ...action.payload };
      }
    },

    // Добавление опыта работы
    addExperience: (state, action: PayloadAction<Experience>) => {
      if (state.data) {
        const experience = state.data.experience || [];
        state.data.experience = [...experience, action.payload];
      }
    },

    // Обновление опыта работы
    updateExperience: (
      state,
      action: PayloadAction<{ index: number; data: Partial<Experience> }>,
    ) => {
      if (state.data && state.data.experience) {
        const { index, data } = action.payload;
        state.data.experience[index] = { ...state.data.experience[index], ...data };
      }
    },

    // Удаление опыта работы
    removeExperience: (state, action: PayloadAction<number>) => {
      if (state.data && state.data.experience) {
        state.data.experience = state.data.experience.filter((_, i) => i !== action.payload);
      }
    },

    // Добавление образования
    addEducation: (state, action: PayloadAction<Education>) => {
      if (state.data) {
        const education = state.data.education || [];
        state.data.education = [...education, action.payload];
      }
    },

    // Обновление образования
    updateEducation: (
      state,
      action: PayloadAction<{ index: number; data: Partial<Education> }>,
    ) => {
      if (state.data && state.data.education) {
        const { index, data } = action.payload;
        state.data.education[index] = { ...state.data.education[index], ...data };
      }
    },

    // Удаление образования
    removeEducation: (state, action: PayloadAction<number>) => {
      if (state.data && state.data.education) {
        state.data.education = state.data.education.filter((_, i) => i !== action.payload);
      }
    },

    // Добавление навыка
    addSkill: (state, action: PayloadAction<Skill>) => {
      if (state.data) {
        const skills = state.data.skills || [];
        state.data.skills = [...skills, action.payload];
      }
    },

    // Обновление навыка
    updateSkill: (state, action: PayloadAction<{ index: number; data: Partial<Skill> }>) => {
      if (state.data && state.data.skills) {
        const { index, data } = action.payload;
        state.data.skills[index] = { ...state.data.skills[index], ...data };
      }
    },

    // Удаление навыка
    removeSkill: (state, action: PayloadAction<number>) => {
      if (state.data && state.data.skills) {
        state.data.skills = state.data.skills.filter((_, i) => i !== action.payload);
      }
    },

    // Обновление резюме целиком
    updateResume: (state, action: PayloadAction<Resume>) => {
      state.data = action.payload;
    },

    // Сброс состояния
    resetResume: (state) => {
      state.data = null;
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Обработка fetchResume
      .addCase(fetchResume.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchResume.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchResume.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Не удалось загрузить резюме';
      })

      // Обработка saveResume
      .addCase(saveResume.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(saveResume.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(saveResume.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Не удалось сохранить резюме';
      });
  },
});

export const {
  updatePersonalDetails,
  addExperience,
  updateExperience,
  removeExperience,
  addEducation,
  updateEducation,
  removeEducation,
  addSkill,
  updateSkill,
  removeSkill,
  updateResume,
  resetResume,
} = resumeSlice.actions;

export default resumeSlice.reducer;
