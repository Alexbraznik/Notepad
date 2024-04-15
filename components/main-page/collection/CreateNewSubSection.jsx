import { FaCheck } from 'react-icons/fa6';
import { useState } from 'react';
import { useCollection } from '../store/useCollection';

// Создает Input для названия нового подраздела
export function CreateNewSubSection({ setIsNewSubSection, activeSectionId }) {
  const [newSubSectionText, setNewSubSectionText] = useState(''); // текст новой подкатегории

  const addNewSubSection = useCollection((state) => state.addNewSubSection);

  // Локальная функция добавления подраздела
  function handleAddSubSection() {
    if (newSubSectionText.trim().length === 0) return;
    addNewSubSection(activeSectionId, newSubSectionText);
    setIsNewSubSection(false);
    setNewSubSectionText('');
  }

  return (
    <>
      <div className="text-xs ml-3 flex justify-between items-center cursor-pointer">
        <input
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-0.5 w-8/12 max-w-48"
          placeholder="Введите название"
          autoFocus
          value={newSubSectionText}
          onChange={(e) => setNewSubSectionText(e.target.value)}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              handleAddSubSection();
            }
            if (event.key === 'Escape') {
              setIsNewSubSection(false);
            }
          }}
        />
        <div className="flex items-center">
          <span onClick={handleAddSubSection}>
            <FaCheck className="hover:text-green-400 -mb-1" />
          </span>
          <span
            className="text-xl mx-2 hover:text-rose-500 cursor-pointer"
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
