import { create } from 'zustand';
import { sectionList, subSectionList } from '../components/main-page/constatns';
import { useBoard } from './useBoard';
import uniqid from 'uniqid';

// Отвечает за разделы и подразделы(папка collection)
export const useCollection = create((set) => ({
  sectionList: sectionList, // раздел
  subSectionList: subSectionList, // подраздел

  // Создает новый раздел
  addSection: (modalText) =>
    set((state) => {
      const updatedSectionList = {
        name: modalText.trim(),
        id: uniqid(),
      };
      return { sectionList: [...state.sectionList, updatedSectionList] };
    }),

  // Создает новый подраздел
  addNewSubSection: (activeSectionId, newSubSectionText) =>
    set((state) => {
      const updatedSubSectionList = {
        title: newSubSectionText.trim(),
        id: uniqid(),
        parentId: activeSectionId,
      };
      return { subSectionList: [...state.subSectionList, updatedSubSectionList] };
    }),

  // Удаление раздела
  deleteSection: (sectionId) =>
    set((state) => {
      const tasksList = useBoard.getState().tasksList;

      const updatedSectionList = state.sectionList.filter(
        (section) => section.id !== sectionId,
      );

      // Удаление подраздела, если удален раздел
      const updatedSubSectionList = state.subSectionList.filter(
        (subSection) => subSection.parentId !== sectionId,
      );

      // Удаление задач, если удален раздел
      const updatedTasksList = tasksList.filter((task) => task.sectionId !== sectionId);
      useBoard.setState({ tasksList: updatedTasksList });

      return {
        sectionList: updatedSectionList,
        subSectionList: updatedSubSectionList,
      };
    }),

  // Удаление подраздела
  deleteSubSection: (subSectionId) =>
    set((state) => {
      const tasksList = useBoard.getState().tasksList;

      const updatedSubSectionList = state.subSectionList.filter(
        (subSection) => subSection.id !== subSectionId,
      );

      // Удаляет задачи при удалении подраздела
      const updatedTasksList = tasksList.filter((task) => task.parentId !== subSectionId);
      useBoard.setState({ tasksList: updatedTasksList });

      return {
        subSectionList: updatedSubSectionList,
      };
    }),
}));
