import { FC, useEffect, useRef } from 'react';
import { useBoard } from '../store';
import { Modal } from '../Modal';
import { IModalBoardProps } from './interfaces/board-interfaces';

export const ModalBoard: FC<IModalBoardProps> = ({
  isOpen,
  setIsOpen,
  modalText,
  setModalText,
}) => {
  const editTask = useBoard((state) => state.editTask); // функция редактирования задачи из store
  const textAreaRef = useRef<HTMLTextAreaElement>(null); // рефка для устанавливки фокуса в конце текста

  // Отображение текста в модальном окне
  useEffect(() => {
    setModalText(modalText);
  }, [isOpen]);

  // Локальная функция редактирования текста
  function handleEditTask() {
    if (modalText.trim().length === 0) return;
    editTask(modalText);
    setIsOpen(false);
  }

  // Устанавливает фокус в конце текста
  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.selectionStart = textAreaRef.current.value.length;
    }
  }, [isOpen]);

  return (
    <Modal
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      width="w-1/2"
      height="h-1/2"
      insetX="inset-x-1/3"
      insetY="inset-y-1/4"
      buttonAgree="Редактировать"
      buttonCancel="Закрыть"
      onAgree={handleEditTask}
    >
      <textarea
        className="resize-none overflow-auto bg-neutral-800 border border-neutral-700 border-opacity-60 scrollbar scrollbar-thumb-gray-700 w-full h-full"
        ref={textAreaRef}
        value={modalText}
        onChange={(event) => setModalText(event.target.value)}
      ></textarea>
    </Modal>
  );
};
