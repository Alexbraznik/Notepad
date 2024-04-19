export interface IBoardListProps {
  setIsOpen: (isOpen: boolean) => void;
  setModalText: (modalText: string) => void;
}

export interface IBoardItemProps {
  id: number;
  title: string;
  setIsOpen: (isOpen: boolean) => void;
  setModalText: (modalText: string) => void;
}

export interface IModalBoardProps {
  isOpen: boolean;
  modalText: string;
  setIsOpen: (isOpen: boolean) => void;
  setModalText: (modalText: string) => void;
}

export interface ISubmitTaskProps {
  title: string;
  setTitle: (title: string) => void;
}

export interface IIconComponentProps {
  className?: string;
  onClick?: () => void;
}
