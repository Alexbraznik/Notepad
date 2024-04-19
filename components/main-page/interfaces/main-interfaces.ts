// constants.ts
export interface ISection {
  title: string;
  id: number;
}

export interface ISubSection extends ISection {
  parentId: number;
}

export interface ITask extends ISubSection {
  isCompleted: boolean;
  sectionId: number;
}
