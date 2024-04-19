import { FC, useEffect, useState } from 'react';
import { SectionHeader, SubSection, CreateNewSubSection } from './index';
import { useCollection, useIdsStorage } from '../store';
import { ISectionProps } from './interfaces/collection-interfaces';

// Дочерний элемент Collection, контейнер подразделов и пр.
export const Section: FC<ISectionProps> = ({ section }) => {
  const [isNewSubSection, setIsNewSubSection] = useState(false); // флаг создания нового подраздела
  const [activeSectionId, setActiveSectionId] = useState<number | null>(null); // id активной секции

  const sectionList = useCollection((state) => state.sectionList);
  const subSectionList = useCollection((state) => state.subSectionList);

  const setCurrentSectionId = useIdsStorage((state) => state.setCurrentSectionId);
  const setCurrentSubSectionId = useIdsStorage((state) => state.setCurrentSubSectionId);
  const currentSubSectionId = useIdsStorage((state) => state.currentSubSectionId);

  // Устанавливаем id первого подраздела(при загрузке страницы будет он)
  useEffect(() => {
    if (subSectionList.length > 0 && !currentSubSectionId) {
      setCurrentSubSectionId(subSectionList[0].id);
      setCurrentSectionId(sectionList[0].id);
    }
  }, []);

  return (
    <div className="flex flex-col text-whiteText">
      <div className="border-b">
        <ul className="m-2 leading-4 items-center">
          <SectionHeader
            section={section}
            setActiveSectionId={setActiveSectionId}
            setIsNewSubSection={setIsNewSubSection}
          />
          {subSectionList.map((subSection) => {
            if (section.id !== subSection.parentId) return null;
            return (
              <SubSection
                key={subSection.id}
                sectionId={section.id}
                subSection={subSection}
                setCurrentSectionId={setCurrentSectionId}
                setCurrentSubSectionId={setCurrentSubSectionId}
                currentSubSectionId={currentSubSectionId}
              />
            );
          })}
          {isNewSubSection && section.id === activeSectionId && (
            <CreateNewSubSection
              setIsNewSubSection={setIsNewSubSection}
              activeSectionId={activeSectionId}
            />
          )}
        </ul>
      </div>
    </div>
  );
};
