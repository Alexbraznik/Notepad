import { useEffect, useState } from "react";
import clsx from "clsx";

export function ModalBoard({
  isOpen,
  setIsOpen,
  modalText,
  setModalText,
  todo,
  setTodo,
  collectionList,
  setCollectionList,
}) {
  const [currentModalText, setCurrentModalText] = useState(modalText);

  function closeModal(event) {
    if (event.target.classList.contains("modal-board")) {
      setIsOpen(false);
    }
  }

  function editText() {
    const updatedCollectionList = collectionList.map((section) => ({
      ...section,
      subCategories: section.subCategories.map((subCategory) => ({
        ...subCategory,
        tasks: subCategory.tasks.map((task) =>
          task.title === modalText
            ? { ...task, title: currentModalText.trim() }
            : task
        ),
      })),
    }));

    setCollectionList(updatedCollectionList);
    setIsOpen(false);
  }

  useEffect(() => {
    setCurrentModalText(modalText);
  }, [isOpen]);

  return (
    isOpen && (
      <div
        className={clsx(
          "modal-board fixed inset-0 h-full w-full bg-black/50",
          isOpen ? "pointer-events-auto" : "pointer-events-none"
        )}
        onClick={closeModal}
      >
        <div className="relative flex flex-col overflow-y-auto bg-neutral-800 text-whiteText h-1/2 w-1/2 text-wrap	inset-x-[35%] inset-y-[25%] p-4 ">
          <textarea
            className="resize-none overflow-auto	h-full bg-neutral-800 border border-neutral-700 border-opacity-60 scrollbar scrollbar-thumb-gray-700"
            value={currentModalText}
            onChange={(event) => setCurrentModalText(event.target.value)}
          ></textarea>
          <div className="mt-auto py-4 flex justify-center gap-36">
            <button
              className="bg-teal-700	 hover:bg-emerald-600	 text-white font-bold py-2 px-4 rounded"
              onClick={() => editText()}
            >
              Редактировать
            </button>
            <button
              className="bg-rose-700 hover:bg-rose-600 text-white font-bold py-2 px-4 rounded"
              onClick={() => setIsOpen(false)}
            >
              Закрыть
            </button>
          </div>
        </div>
      </div>
    )
  );
}
