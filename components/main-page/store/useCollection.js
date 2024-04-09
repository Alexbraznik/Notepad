import { create } from 'zustand';
import { sectionList, subSectionList } from '../constatns';

// Отвечает за разделы и подразделы(папка collection)
export const useCollection = create((set) => ({
  sectionList: sectionList, // раздел
  subSectionList: subSectionList, // подраздел

  // Создает новый подраздел
  addNewSubSection: (activeSectionId, newSubSectionText) =>
    set((state) => {
      const updatedSubSectionList = {
        title: newSubSectionText.trim(),
        id: Date.now(),
        parentId: activeSectionId,
      };
      if (updatedSubSectionList.title.length !== 0) {
        return {
          subSectionList: [...state.subSectionList, updatedSubSectionList],
        };
      }
      return state;
    }),

  // Удаление раздела
  deleteSection: (sectionId) =>
    set((state) => {
      const updatedSectionList = state.sectionList.filter(
        (section) => section.id !== sectionId,
      );
      return { sectionList: updatedSectionList };
    }),

  // Удаление подраздела
  deleteSubSection: (subSectionId) =>
    set((state) => {
      const updatedSubSectionList = state.subSectionList.filter(
        (subSection) => subSection.id !== subSectionId,
      );
      return { subSectionList: updatedSubSectionList };
    }),
}));
