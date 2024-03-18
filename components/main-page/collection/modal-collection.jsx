import clsx from "clsx";
import { useEffect, useState } from "react";

export function ModalCollection({
  isOpen,
  setIsOpen,
  modalText,
  setModalText,
  collectionList,
  setCollectionList,
}) {
  const [currentModalText, setCurrentModalText] = useState(modalText);

  function inputValue(event) {
    const value = event.target.value;
    setCurrentModalText(value);
    setModalText(value);
  }

  useEffect(() => {
    setCurrentModalText(modalText);
  }, [isOpen]);

  function addSection() {
    if (modalText.trim().length === 0) {
      return;
    } else {
      const newSection = [...collectionList];
      newSection.push({ name: modalText, id: Date.now(), subCategories: [] });
      setCollectionList(newSection);
      setModalText("");
      setIsOpen(false);
    }
  }

  return (
    isOpen && (
      <div
        className={clsx(
          "fixed h-screen w-screen inset-0 bg-black/50",
          isOpen ? "pointer-events-auto" : "pointer-events-none"
        )}
      >
        <div className="relative flex flex-col overflow-y-auto bg-white h-44 w-1/2 text-wrap inset-[30%] p-4">
          <input
            type="text"
            id="name"
            autoFocus
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 focus:outline-none block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Введите название"
            value={currentModalText}
            onChange={inputValue}
          ></input>
          <div className="mt-auto py-4 flex justify-center gap-36">
            <button
              className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-2 px-4 rounded"
              onClick={() => addSection()}
            >
              Создать
            </button>
            <button
              className="bg-red-500	hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
              onClick={() => {
                setIsOpen(false);
                setModalText("");
              }}
            >
              Закрыть
            </button>
          </div>
        </div>
      </div>
    )
  );
}
