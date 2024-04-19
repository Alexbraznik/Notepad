import { FC } from 'react';
import { useCollection, useIdsStorage } from '../store';
import { ISectionHeaderProps } from './interfaces/collection-interfaces';

// Название раздела
export const SectionHeader: FC<ISectionHeaderProps> = ({
  section,
  setActiveSectionId,
  setIsNewSubSection,
}) => {
  const currentSectionId = useIdsStorage((state) => state.currentSectionId);
  const setCurrentSubSectionId = useIdsStorage((state) => state.setCurrentSubSectionId);
  const deleteSection = useCollection((state) => state.deleteSection);

  return (
    <div className="flex mb-1 justify-between items-center gap-4">
      <span className="truncate h-5">{section.title}</span>
      <div className="text-xl flex gap-3 mr-2">
        <>
          <span
            className="hover:text-emerald-500 cursor-pointer"
            onClick={() => {
              setActiveSectionId(section.id);
              setIsNewSubSection(true);
            }}
          >
            +
          </span>
        </>
        <span
          className="hover:text-rose-500 cursor-pointer"
          onClick={() => {
            deleteSection(section.id);
            if (currentSectionId === section.id) {
              setCurrentSubSectionId(null);
            }
          }}
        >
          &times;
        </span>
      </div>
    </div>
  );
};
