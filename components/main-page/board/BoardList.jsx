import { useBoard } from '../store/useBoard';
import { useIdsStorage } from '../store/useIdsStorage';
import { BoardItem } from './BoardItem';

// Весь список задач. Сравнивается id активного подраздела и в него добавляется задача
export function BoardList({ setIsOpen, setModalText }) {
  const currentSubSectionId = useIdsStorage(
    (state) => state.currentSubSectionId,
  );
  const tasksList = useBoard((state) => state.tasksList);

  return (
    <div className="pt-4 text-whiteText">
      {tasksList &&
        tasksList.map((task) =>
          task.parentId === currentSubSectionId ? (
            <BoardItem
              key={task.id}
              setIsOpen={setIsOpen}
              setModalText={setModalText}
              {...task}
            />
          ) : null,
        )}
    </div>
  );
}
