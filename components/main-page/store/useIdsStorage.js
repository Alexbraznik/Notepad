import { create } from 'zustand';

// Хранилище id
export const useIdsStorage = create((set) => ({
  currentSubSectionId: null, // хранит id подраздела,
  currentTaskId: null, // хранит id задачи,

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
