import { useEffect, useRef, useState } from 'react';
import { useBoard } from '../../../store/useBoard';

// Отправка задачи в boardList
export function SubmitTask() {
  const [title, setTitle] = useState(''); // текст задачи в input

  // Отправка задачи по нажатию на Enter
  const addTask = useBoard((state) => state.addTask);

  // Локальная функция добавления задачи
  function addNewTask(title) {
    if (title.trim().length === 0) return;
    addTask(title);
    setTitle('');
  }

  // Ставит автофокус на input при загрузке страницы
  const inputRef = useRef(null);
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <div className="flex flex-col items-center gap-1 justify-center pt-4 overflow-auto">
      <input
        type="text"
        placeholder="Введите задачу"
        className="w-9/12  h-8 rounded p-1 bg-neutral-700 text-whiteText"
        ref={inputRef}
        onChange={(event) => setTitle(event.target.value)}
        value={title}
        onKeyDown={(event) => {
          if (event.key === 'Enter') {
            addNewTask(title);
          }
        }}
      />
      <button
        onClick={() => addNewTask(title)}
        className="bg-neutral-700 text-whiteText hover:bg-neutral-600 w-40 h-8 rounded transition-colors ease-in-out shadow-md"
      >
        Добавить задачу
      </button>
    </div>
  );
}
