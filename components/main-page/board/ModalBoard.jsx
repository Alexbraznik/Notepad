import { useEffect, useRef } from 'react';

import clsx from 'clsx';
import { enterKeyPress, escapeKeyPress } from '../keyPress';
import { useBoard } from '../store/useBoard';

export function ModalBoard({ isOpen, setIsOpen, modalText, setModalText }) {
  const editTask = useBoard((state) => state.editTask); // функция редактирования задачи из store

  const submitRef = useRef(null); // отправка задачи по клику на Enter
  const textAreaFocusRef = useRef(null); // установка focus на textarea, если был клик вне textarea
  const escapeRef = useRef(null); // закрытие модалки на Escape

  // Закрытие модального окна, при клике вне его
  const modalRef = useRef(null);
  function closeModal(event) {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  }
  // Отображение текста в модальном окне
  useEffect(() => {
    setModalText(modalText);
  }, [isOpen]);

  // Установка focus на textarea, если был клик вне textarea
  function textAreaFocus() {
    textAreaFocusRef.current.focus();
  }
  return (
    isOpen && (
      <div
        className={clsx(
          'fixed inset-0 h-full w-full bg-black/50',
          isOpen ? 'pointer-events-auto' : 'pointer-events-none',
        )}
        onChange={(event) => setModalText(event.target.value)}
        onClick={closeModal}
      >
        <div
          className="relative flex flex-col overflow-y-auto bg-neutral-800 text-whiteText h-1/2 w-1/2 text-wrap	inset-x-[35%] inset-y-[25%] p-4 "
          ref={modalRef}
          onKeyDown={(event) => escapeKeyPress(event, escapeRef)}
          onClick={textAreaFocus}
        >
          <textarea
            className="resize-none overflow-auto h-full bg-neutral-800 border border-neutral-700 border-opacity-60 scrollbar scrollbar-thumb-gray-700"
            autoFocus
            ref={textAreaFocusRef}
            value={modalText}
            onKeyDown={(event) => enterKeyPress(event, submitRef)}
            onChange={(event) => setModalText(event.target.value)}
          ></textarea>
          <div className="mt-auto py-4 flex justify-center gap-36">
            <button
              className="bg-teal-700	 hover:bg-emerald-600	 text-white font-bold py-2 px-4 rounded"
              ref={submitRef}
              onClick={() => {
                editTask(modalText);
                setIsOpen(false);
              }}
            >
              Редактировать
            </button>
            <button
              className="bg-rose-700 hover:bg-rose-600 text-white font-bold py-2 px-4 rounded"
              ref={escapeRef}
              onClick={() => setIsOpen(false)}
            >
              Закрыть
            </button>
          </div>
        </div>
      </div>
    )
  );
}
