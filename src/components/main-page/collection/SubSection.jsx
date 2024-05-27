import clsx from 'clsx';
import { useCollection } from '../../../store/useCollection';

// Дочерний элемент Section. Отвечает за подразделы
export function SubSection({
  sectionId,
  subSection,
  setCurrentSectionId,
  setCurrentSubSectionId,
  currentSubSectionId,
}) {
  const deleteSubSection = useCollection((state) => state.deleteSubSection);

  return (
    <li
      key={subSection.id}
      title={subSection.title}
      className={clsx(
        'text-xs ml-3 flex justify-between items-center cursor-pointer [&_span]:hover:opacity-70',
        currentSubSectionId === subSection.id ? 'bg-neutral-700 rounded' : '',
      )}
      onClick={() => {
        setCurrentSubSectionId(subSection.id);
        setCurrentSectionId(sectionId);
      }}
    >
      <span className="truncate p-2">{subSection.title}</span>
      <small
        className="text-xl mx-2 hover:text-rose-500 cursor-pointer"
        onClick={(event) => {
          event.stopPropagation();
          deleteSubSection(subSection.id);
          if (currentSubSectionId === subSection.id) {
            setCurrentSubSectionId(null);
          }
        }}
      >
        &times;
      </small>
    </li>
  );
}
