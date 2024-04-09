import { useState } from 'react';
import { ModalBoard, BoardList, SubmitTask } from './index';

export function Board() {
  const [isOpen, setIsOpen] = useState(false); // открытие-закрытие модального окна
  const [modalText, setModalText] = useState(''); // текст модального окна

  return (
    <div className="w-full bg-stone-800 h-full overflow-y-auto ">
      <ModalBoard
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        modalText={modalText}
        setModalText={setModalText}
      />
      <SubmitTask />
      <BoardList setIsOpen={setIsOpen} setModalText={setModalText} />
    </div>
  );
}
