import FocusLock from 'react-focus-lock';
import clsx from 'clsx';
import { FC, MouseEvent, ReactNode } from 'react';

export interface ModalProps {
  isOpen: boolean;
  children: ReactNode;
  height?: string;
  width?: string;
  inset?: string;
  insetX?: string;
  insetY?: string;
  buttonCancel?: string;
  buttonAgree?: string;
  setIsOpen: (isOpen: boolean) => void;
  onAgree?: () => void;
}

export const Modal: FC<ModalProps> = ({
  isOpen, // флаг открытия/закрытия
  setIsOpen, // установка флага открытия/закрытия
  children, // дочерний элемент для контента модалки
  height, // устанавливает высоту
  width, // устанавливает ширину
  inset, // позиционирование на странице по X и Y
  insetX, // позиционирование на странице только по X
  insetY, // позиционирование на странице только по Y
  buttonAgree, // Кпопка согласия
  buttonCancel, // Кпопка отмены
  onAgree, // Логика отправки согласия
}) => {
  // Закрытие модального окна при клике вне его
  function closeModal(event: MouseEvent<HTMLDivElement>) {
    const target = event.target as HTMLDivElement;
    if (target.classList.contains('modal')) {
      setIsOpen(false);
    }
  }

  return (
    isOpen && (
      <div
        tabIndex={0}
        className={clsx(
          'modal fixed h-screen w-screen inset-0 bg-black/50',
          isOpen ? 'pointer-events-auto' : 'pointer-events-none',
        )}
        onClick={closeModal}
      >
        <div
          className={`relative flex flex-col overflow-y-auto bg-neutral-800 text-whiteText text-wrap p-4 ${height} ${width} ${inset} ${insetX} ${insetY}`}
          onKeyDown={(event) => {
            if (event.key === 'Escape') {
              setIsOpen(false);
            } else if (event.key === 'Enter') {
              onAgree?.();
            }
          }}
        >
          <FocusLock className="w-full h-full">{children}</FocusLock>

          <div className="mt-auto py-4 flex justify-center gap-36">
            <button
              className="bg-teal-700 hover:bg-emerald-600 text-white font-bold py-2 px-4 rounded"
              onClick={onAgree}
            >
              {buttonAgree}
            </button>
            <button
              className="bg-rose-700 hover:bg-rose-600 text-white font-bold py-2 px-4 rounded"
              onClick={() => setIsOpen(false)}
            >
              {buttonCancel}
            </button>
          </div>
        </div>
      </div>
    )
  );
};
