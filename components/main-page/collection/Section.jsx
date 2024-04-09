import { useState } from 'react';
import { SectionHeader, SubSection, CreateNewSubSection } from './index';
import { useCollection } from '../store/useCollection';

// Дочерний элемент Collection, контейнер подразделов и пр.
export function Section() {
  const [isNewSubSection, setIsNewSubSection] = useState(false); // флаг создания нового подраздела
  const [activeSectionId, setActiveSectionId] = useState(null); // id активной секции

  const sectionList = useCollection((state) => state.sectionList);

  return (
    <>
      {sectionList &&
        sectionList.map((section) => (
          <div key={section.id} className="flex flex-col text-whiteText">
            <div className="border-b">
              <ul className="m-2 leading-4 items-center">
                <SectionHeader
                  section={section}
                  setActiveSectionId={setActiveSectionId}
                  setIsNewSubSection={setIsNewSubSection}
                />
                <SubSection sectionId={section.id} />
                {isNewSubSection && section.id === activeSectionId && (
                  <CreateNewSubSection
                    setIsNewSubSection={setIsNewSubSection}
                    activeSectionId={activeSectionId}
                  />
                )}
              </ul>
            </div>
          </div>
        ))}
    </>
  );
}
