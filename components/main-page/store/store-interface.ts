import { ISection, ISubSection, ITask } from '../interfaces/main-interfaces';

type IdsValue = number | null;

// useCollection.ts
export interface ICollectionState {
  sectionList: ISection[];
  subSectionList: ISubSection[];
  addSection: (modalText: string) => void;
  addNewSubSection: (activeSectionId: number, newSubSectionText: string) => void;
  deleteSection: (sectionId: number) => void;
  deleteSubSection: (subSectionId: number) => void;
}

// useBoard.ts
export interface IBoardState {
  tasksList: ITask[];
  addTask: (title: string) => void;
  deleteTask: (taskId: number) => void;
  editTask: (modalText: string) => void;
}

// useIdsStorage.ts
export interface IIdsState {
  currentSectionId: IdsValue;
  currentSubSectionId: IdsValue;
  currentTaskId: IdsValue;
  setCurrentSectionId: (sectionId: IdsValue) => void;
  setCurrentSubSectionId: (subSectionId: IdsValue) => void;
  setCurrentTaskId: (taskId: IdsValue) => void;
}
