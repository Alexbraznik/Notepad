import { FC } from 'react';
import { BoardItem } from './index';
import { IBoardListProps } from './interfaces/board-interfaces';
import { useBoard, useIdsStorage } from '../store';

// Весь список задач. Сравнивается id активного подраздела и в него добавляется задача
export const BoardList: FC<IBoardListProps> = ({ setIsOpen, setModalText }) => {
  const currentSubSectionId = useIdsStorage((state) => state.currentSubSectionId);
  const tasksList = useBoard((state) => state.tasksList);

  return (
    <div className="pt-4 text-whiteText">
      {tasksList.map((task) => {
        if (task.parentId !== currentSubSectionId) return null;
        return (
          <BoardItem
            key={task.id}
            setIsOpen={setIsOpen}
            setModalText={setModalText}
            title={task.title}
            id={task.id}
          />
        );
      })}
    </div>
  );
};
