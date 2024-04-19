import { FC } from 'react';
import { FaRegTrashAlt } from 'react-icons/fa';
import { IIconComponentProps } from './interfaces/board-interfaces';

export const TrashIcon: FC<IIconComponentProps> = ({ className, onClick }) => {
  return (
    <div>
      <FaRegTrashAlt className={className} onClick={onClick} />
    </div>
  );
};
