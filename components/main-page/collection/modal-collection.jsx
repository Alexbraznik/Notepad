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

  function closeModal(event) {
    if (event.target.classList.contains("modal-collection")) {
      setIsOpen(false);
      setModalText("");
    }
  }

  return (
    isOpen && (
      <div
        className={clsx(
          "fixed modal-collection h-screen w-screen inset-0 bg-black/50",
          isOpen ? "pointer-events-auto" : "pointer-events-none"
        )}
        onClick={closeModal}
      >
        <div className="relative flex flex-col overflow-y-auto bg-neutral-800 h-44 w-1/2 text-wrap inset-[30%] p-4">
          <input
            type="text"
            id="name"
            autoFocus
            className="bg-neutral-800 text-whiteText border border-neutral-600 text-sm rounded-lg focus:outline-none block w-full p-2.5  "
            placeholder="Введите название"
            value={currentModalText}
            onChange={inputValue}
          ></input>
          <div className="mt-auto py-4 flex justify-center gap-36">
            <button
              className="bg-teal-700 hover:bg-emerald-600 text-white font-bold py-2 px-4 rounded"
              onClick={() => addSection()}
            >
              Создать
            </button>
            <button
              className="bg-rose-700 hover:bg-rose-600 text-white font-bold py-2 px-4 rounded"
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
