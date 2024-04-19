type IdsValue = number | null;

export interface ISectionProps {
  section: {
    title: string;
    id: number;
  };
}

export interface ISectionHeaderProps {
  section: {
    title: string;
    id: number;
  };
  setActiveSectionId: (id: number) => void;
  setIsNewSubSection: (isNew: boolean) => void;
}

export interface ISubSectionProps {
  subSection: {
    title: string;
    id: number;
    parentId: number;
  };
  sectionId: number;
  currentSubSectionId: IdsValue;
  setCurrentSectionId: (sectionId: IdsValue) => void;
  setCurrentSubSectionId: (subSectionId: IdsValue) => void;
}

export interface ICreateNewSubSectionProps {
  activeSectionId: number;
  setIsNewSubSection: (isNew: boolean) => void;
}

export interface IModalAddSectionProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}
