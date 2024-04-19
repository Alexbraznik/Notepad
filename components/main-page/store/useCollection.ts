import { create } from 'zustand';
import { sectionList, subSectionList } from '../constatns';
import { useBoard } from './useBoard';
import { ICollectionState } from './store-interface';
import { ISection, ISubSection, ITask } from '../interfaces/main-interfaces';

// Отвечает за разделы и подразделы(папка collection)
export const useCollection = create<ICollectionState>((set) => ({
  sectionList: sectionList, // раздел
  subSectionList: subSectionList, // подраздел

  // Создает новый раздел
  addSection: (modalText) =>
    set((state) => {
      const updatedSectionList: ISection = {
        title: modalText.trim(),
        id: Date.now(),
      };
      return { sectionList: [...state.sectionList, updatedSectionList] };
    }),

  // Создает новый подраздел
  addNewSubSection: (activeSectionId, newSubSectionText) =>
    set((state) => {
      const updatedSubSectionList: ISubSection = {
        title: newSubSectionText.trim(),
        id: Date.now(),
        parentId: activeSectionId,
      };
      return { subSectionList: [...state.subSectionList, updatedSubSectionList] };
    }),

  // Удаление раздела
  deleteSection: (sectionId) =>
    set((state) => {
      const tasksList = useBoard.getState().tasksList;

      const updatedSectionList = state.sectionList.filter(
        (section: ISection) => section.id !== sectionId,
      );

      // Удаление подраздела, если удален раздел
      const updatedSubSectionList = state.subSectionList.filter(
        (subSection: ISubSection) => subSection.parentId !== sectionId,
      );

      // Удаление задач, если удален раздел
      const updatedTasksList = tasksList.filter(
        (task: ITask) => task.sectionId !== sectionId,
      );
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
      const updatedTasksList = tasksList.filter(
        (task: ITask) => task.parentId !== subSectionId,
      );
      useBoard.setState({ tasksList: updatedTasksList });

      return {
        subSectionList: updatedSubSectionList,
      };
    }),
}));
