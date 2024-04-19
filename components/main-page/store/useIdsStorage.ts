import { create } from 'zustand';
import { IIdsState } from './store-interface';

// Хранилище id
export const useIdsStorage = create<IIdsState>((set) => ({
  currentSectionId: null, // хранит id раздела,
  currentSubSectionId: null, // хранит id поtдраздела,
  currentTaskId: null, // хранит id задачи,

  // Устанавливает id раздела
  setCurrentSectionId: (sectionId) =>
    set(() => ({
      currentSectionId: sectionId,
    })),

  // Устанавливает id подраздела
  setCurrentSubSectionId: (subSectionId) =>
    set(() => ({
      currentSubSectionId: subSectionId,
    })),

  // Устанавливает id задачи
  setCurrentTaskId: (taskId) =>
    set(() => ({
      currentTaskId: taskId,
    })),
}));
