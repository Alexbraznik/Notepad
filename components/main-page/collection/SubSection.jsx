import clsx from 'clsx';
import { useEffect } from 'react';
import { useIdsStorage } from '../store/useIdsStorage';
import { useCollection } from '../store/useCollection';

// Дочерний элемент Section. Отвечает за подразделы
export function SubSection({ sectionId }) {
  const setCurrentSubSectionId = useIdsStorage(
    (state) => state.setCurrentSubSectionId,
  );
  const currentSubSectionId = useIdsStorage(
    (state) => state.currentSubSectionId,
  );
  const deleteSubSection = useCollection((state) => state.deleteSubSection);

  const subSectionList = useCollection((state) => state.subSectionList);

  console.log(currentSubSectionId, 'currentSubSectionId');

  // Устанавливаем id первого подраздела(при загрузке страницы будет он)
  useEffect(() => {
    if (!currentSubSectionId) {
      setCurrentSubSectionId(subSectionList[0].id);
    }
  }, []);

  return (
    <>
      {subSectionList.map((subSection) =>
        sectionId === subSection.parentId ? (
          <li
            key={subSection.id}
            title={subSection.title}
            className={clsx(
              'text-xs ml-3 flex justify-between items-center cursor-pointer [&_span]:hover:opacity-70',
              currentSubSectionId === subSection.id
                ? 'bg-neutral-700 rounded'
                : '',
            )}
            onClick={() => {
              setCurrentSubSectionId(subSection.id);
            }}
          >
            <span className="truncate p-2">{subSection.title}</span>
            <small
              className="text-xl mx-2 hover:text-rose-500 cursor-pointer"
              onClick={() => deleteSubSection(subSection.id)}
            >
              &times;
            </small>
          </li>
        ) : null,
      )}
    </>
  );
}
