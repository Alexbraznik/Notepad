import { useState } from 'react';
import { useCollection } from '../../../store/useCollection';

import { ModalAddSection } from './ModalAddSection';
import { Section } from './Section';

// Родительский элемент всей папки collection
export function Collection() {
  const [isOpen, setIsOpen] = useState(false); // открыть-закрыть модальное окно
  const sectionList = useCollection((state) => state.sectionList);

  return (
    <div className="bg-neutral-800 w-[25%] relative border-r border-neutral-900 overflow-auto overflow-x-hidden pt-4">
      <div className="flex justify-center">
        <ModalAddSection isOpen={isOpen} setIsOpen={setIsOpen} />
        <div
          className="text-center border border-gray-600 bg-neutral-800 hover:bg-neutral-900 text-whiteText cursor-pointer w-56 p-2 shadow-md rounded border-opacity-50"
          onClick={() => setIsOpen(true)}
        >
          Создать раздел
        </div>
      </div>
      {sectionList.map((section) => (
        <Section key={section.id} section={section} />
      ))}
    </div>
  );
}
