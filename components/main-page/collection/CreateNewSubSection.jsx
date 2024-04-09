import { FaCheck } from 'react-icons/fa6';
import { useRef, useState } from 'react';
import { enterKeyPress, escapeKeyPress } from '../keyPress';
import { useCollection } from '../store/useCollection';

// Создает Input для названия нового подраздела
export function CreateNewSubSection({ setIsNewSubSection, activeSectionId }) {
  const [newSubSectionText, setNewSubSectionText] = useState(''); // текст новой подкатегории

  const addNewSubSection = useCollection((state) => state.addNewSubSection);

  const submitRef = useRef(null); // отправка задачи по клику на Enter
  const escapeRef = useRef(null); // закрытие модалки на Escape
  return (
    <>
      <div
        className="text-xs ml-3 flex justify-between items-center cursor-pointer"
        onKeyDown={(event) => escapeKeyPress(event, escapeRef)}
      >
        <input
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-0.5 w-8/12 max-w-48"
          placeholder="Введите название"
          autoFocus
          value={newSubSectionText}
          onKeyDown={(event) => enterKeyPress(event, submitRef)}
          onChange={(e) => setNewSubSectionText(e.target.value)}
        />
        <div className="flex items-center">
          <span
            ref={submitRef}
            onClick={() => {
              addNewSubSection(activeSectionId, newSubSectionText);
              setIsNewSubSection(false);
              setNewSubSectionText('');
            }}
          >
            <FaCheck className="hover:text-green-400 -mb-1" />
          </span>
          <span
            className="text-xl mx-2 hover:text-rose-500 cursor-pointer"
            ref={escapeRef}
            onClick={() => {
              setIsNewSubSection(false);
              setNewSubSectionText('');
            }}
          >
            &times;
          </span>
        </div>
      </div>
    </>
  );
}
