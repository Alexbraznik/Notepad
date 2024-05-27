import { useState } from 'react';
import { ModalBoard, BoardList, SubmitTask } from './index';
import { useIdsStorage } from '../../../store/useIdsStorage';

export function Board() {
  const [isOpen, setIsOpen] = useState(false); // открытие-закрытие модального окна
  const [modalText, setModalText] = useState(''); // текст модального окна

  const currentSubSectionId = useIdsStorage((state) => state.currentSubSectionId);

  return (
    <div className="w-full bg-stone-800 h-full overflow-y-auto ">
      {currentSubSectionId ? (
        <div>
          <ModalBoard
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            modalText={modalText}
            setModalText={setModalText}
          />
          <SubmitTask />
          <BoardList setIsOpen={setIsOpen} setModalText={setModalText} />
        </div>
      ) : (
        <div className="h-full w-full flex justify-center items-center">
          <span className="text-zinc-700 text-8xl select-none">Выберите подраздел</span>
        </div>
      )}
    </div>
  );
}
