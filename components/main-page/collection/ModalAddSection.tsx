import { FC, useEffect, useState } from 'react';
import { useCollection } from '../store';
import { Modal } from '../Modal';
import { IModalAddSectionProps } from './interfaces/collection-interfaces';

export const ModalAddSection: FC<IModalAddSectionProps> = ({ isOpen, setIsOpen }) => {
  const [modalText, setModalText] = useState('');

  const addSection = useCollection((state) => state.addSection);

  // Локальная функция добавления секции
  function handleAddSection() {
    if (modalText.trim().length === 0) return;
    addSection(modalText);
    setIsOpen(false);
    setModalText('');
  }

  // При закрытии модалки поле ввода очищается
  useEffect(() => {
    if (!isOpen) {
      setModalText('');
    }
  }, [isOpen]);

  return (
    <Modal
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      width="w-1/2"
      height="h-44"
      inset="inset-1/3"
      buttonAgree="Создать раздел"
      buttonCancel="Закрыть"
      onAgree={handleAddSection}
    >
      <input
        type="text"
        className="bg-neutral-800 text-whiteText border border-neutral-600 text-sm rounded-lg focus:outline-none block w-full p-2.5  "
        placeholder="Введите название"
        value={modalText}
        autoComplete="off"
        onChange={(event) => setModalText(event.target.value)}
      ></input>
    </Modal>
  );
};
