import { useEffect, useRef, useState } from 'react';
import { enterKeyPress } from '../keyPress';
import { useBoard } from '../store/useBoard';

// Отправка задачи в boardList
export function SubmitTask() {
  const [title, setTitle] = useState(''); // текст задачи в input

  // Отправка задачи по нажатию на Enter
  const buttonRef = useRef(null);
  const addTask = useBoard((state) => state.addTask);

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
        onKeyDown={(event) => enterKeyPress(event, buttonRef)}
      />
      <button
        ref={buttonRef}
        onClick={() => {
          addTask(title);
          setTitle('');
        }}
        className="bg-neutral-700 text-whiteText hover:bg-neutral-600 w-40 h-8 rounded transition-colors ease-in-out shadow-md"
      >
        Добавить задачу
      </button>
    </div>
  );
}
