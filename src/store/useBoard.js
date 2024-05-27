import { create } from 'zustand';
import { tasksList } from '../components/main-page/constatns';
import { useIdsStorage } from './useIdsStorage';
import uniqid from 'uniqid';

// Отвечает за задачи(папка board)
export const useBoard = create((set) => ({
  tasksList: tasksList, // задачи

  // Добавление задачи
  addTask: (title) =>
    set((state) => {
      const currentSectionId = useIdsStorage.getState().currentSectionId;
      const currentSubSectionId = useIdsStorage.getState().currentSubSectionId;

      const updatedTasksList = {
        id: uniqid(),
        title: title.trim(),
        isCompleted: false,
        parentId: currentSubSectionId,
        sectionId: currentSectionId,
      };
      return { tasksList: [...state.tasksList, updatedTasksList] };
    }),

  // Удаление задачи
  deleteTask: (taskId) =>
    set((state) => {
      const updatedTasksList = state.tasksList.filter((task) => task.id !== taskId);
      return { tasksList: updatedTasksList };
    }),

  // Редактирование текста в модальном окне
  editTask: (modalText) =>
    set((state) => {
      const currentTaskId = useIdsStorage.getState().currentTaskId;
      const updatedTasksList = state.tasksList.map((task) =>
        task.id === currentTaskId ? { ...task, title: modalText.trim() } : task,
      );
      return { tasksList: updatedTasksList };
    }),
}));
