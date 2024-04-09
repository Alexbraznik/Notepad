import { useBoard } from '../store/useBoard';
import { useIdsStorage } from '../store/useIdsStorage';
import { TrashIcon } from './TrashIcon';

// Отдельный один элемент списка задач
export function BoardItem({ setIsOpen, setModalText, id, title }) {
  const deleteTask = useBoard((state) => state.deleteTask);
  const setCurrentTaskId = useIdsStorage((state) => state.setCurrentTaskId);

  return (
    <div className="flex items-center border-b-2 border-black pl-2">
      <div
        className="w-[calc(100vw-35%)] truncate cursor-pointer hover:opacity-60 py-1.5 px-3"
        onClick={() => {
          setIsOpen(true);
          setModalText(title);
          setCurrentTaskId(id);
        }}
      >
        {title}
      </div>
      <TrashIcon
        className="hover:text-red-500 cursor-pointer transition-colors ease-in-out ml-5"
        onClick={() => deleteTask(id)}
      />
    </div>
  );
}
