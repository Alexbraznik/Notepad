import clsx from 'clsx';
import { useRef, useState } from 'react';
import { enterKeyPress, escapeKeyPress } from '../keyPress';
import { useCollection } from '../store/useCollection';

export function ModalAddSection({ isOpen, setIsOpen }) {
  const [modalText, setModalText] = useState('');

  const sectionList = useCollection((state) => state.sectionList);

  // Отправка задачи по нажатию на Enter
  const submitRef = useRef(null);
  const inputFocusRef = useRef(null); // установка focus на textarea, если был клик вне textarea
  const escapeRef = useRef(null); // закрытие модалки на Escape

  // Добавление секции
  function addSection() {
    if (modalText.trim().length === 0) {
      return;
    }
    const newSection = [...sectionList];
    sectionList.push({
      name: modalText,
      id: Date.now(),
      subSection: [],
    });
    setModalText('');
    setIsOpen(false);

    return newSection;
  }

  // Установка focus на textarea, если был клик вне textarea
  function inputFocus() {
    inputFocusRef.current.focus();
  }

  // Закрытие модального окна при клике вне его
  function closeModal(event) {
    if (event.target.classList.contains('modal-collection')) {
      setIsOpen(false);
      setModalText('');
    }
  }

  return (
    isOpen && (
      <div
        className={clsx(
          'modal-collection fixed h-screen w-screen inset-0 bg-black/50',
          isOpen ? 'pointer-events-auto' : 'pointer-events-none',
        )}
        onClick={closeModal}
      >
        <div
          className="relative flex flex-col overflow-y-auto bg-neutral-800 h-44 w-1/2 text-wrap inset-[30%] p-4"
          onKeyDown={(event) => escapeKeyPress(event, escapeRef)}
          onClick={inputFocus}
        >
          <input
            type="text"
            id="name"
            autoFocus
            className="bg-neutral-800 text-whiteText border border-neutral-600 text-sm rounded-lg focus:outline-none block w-full p-2.5  "
            placeholder="Введите название"
            value={modalText}
            ref={inputFocusRef}
            onKeyDown={(event) => enterKeyPress(event, submitRef)}
            onChange={(event) => setModalText(event.target.value)}
          ></input>
          <div className="mt-auto py-4 flex justify-center gap-36">
            <button
              className="bg-teal-700 hover:bg-emerald-600 text-white font-bold py-2 px-4 rounded"
              ref={submitRef}
              onClick={() => addSection()}
            >
              Создать
            </button>
            <button
              className="bg-rose-700 hover:bg-rose-600 text-white font-bold py-2 px-4 rounded"
              ref={escapeRef}
              onClick={() => {
                setIsOpen(false);
              }}
            >
              Закрыть
            </button>
          </div>
        </div>
      </div>
    )
  );
}
