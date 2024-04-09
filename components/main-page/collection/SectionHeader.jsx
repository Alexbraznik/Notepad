import { useCollection } from '../store/useCollection';

// Название раздела
export function SectionHeader({
  section,
  setActiveSectionId,
  setIsNewSubSection,
}) {
  const deleteSection = useCollection((state) => state.deleteSection);

  return (
    <div className="flex mb-1 justify-between items-center gap-4">
      <span className="truncate h-5">{section.name}</span>
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
          onClick={() => deleteSection(section.id)}
        >
          &times;
        </span>
      </div>
    </div>
  );
}
