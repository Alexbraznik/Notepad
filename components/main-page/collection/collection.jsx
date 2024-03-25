import { useState } from "react";
import { ModalCollection } from "./modal-collection";
import { FaCheck } from "react-icons/fa6";
import { catalog } from "../constatns";

import clsx from "clsx";

export function Collection({
  setTodo,
  currentSubCategoriesId,
  setCurrentSubCategoriesId,
  collectionList,
  setCollectionList,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [modalText, setModalText] = useState("");
  const [isNewSubCategories, setIsNewSubCategories] = useState(false);
  const [activeSectionId, setActiveSectionId] = useState(null);
  const [activeCollectionList, setActiveCollectionList] = useState(false);

  const [newSubCategoriesText, setNewSubCategoriesText] = useState("");

  // Выбор подраздела
  function handleSubCategorySelect(subCategoryId) {
    const selectedTask = catalog
      .flatMap((section) => section.subCategories)
      .find((subCategory) => subCategory.id === subCategoryId);

    if (selectedTask) {
      setTodo(selectedTask.tasks);
      setCurrentSubCategoriesId(subCategoryId);
    }
  }

  // Background подраздела
  function bgColorSubCategory(subCategoryId) {
    setCurrentSubCategoriesId(subCategoryId);
  }

  // Удаление раздела
  function deleteSection(id) {
    const newCatalog = collectionList.filter((el) => el.id !== id);
    setCollectionList(newCatalog);
  }

  // Удаление подраздела
  function deleteSubSection(sectionId, subsectionId) {
    const newCatalog = collectionList.map((section) => {
      if (sectionId === section.id) {
        const newSubCategories = section.subCategories.filter(
          (subSection) => subSection.id !== subsectionId
        );
        section.subCategories = newSubCategories;
      }
      return section;
    });
    setCollectionList(newCatalog);
  }

  function addNewSubCategories(sectionId) {
    const newSubCategories = {
      title: newSubCategoriesText,
      id: Date.now(),
      tasks: [],
    };
    const updatedCollectionList = collectionList.map((section) => {
      if (
        section.id === sectionId &&
        newSubCategoriesText.trim().length !== 0
      ) {
        return {
          ...section,
          subCategories: [...section.subCategories, newSubCategories],
        };
      }

      return section;
    });

    setActiveSectionId(sectionId);
    setCollectionList(updatedCollectionList);
    setIsNewSubCategories(true);
    setNewSubCategoriesText("");
  }

  return (
    <div className="bg-neutral-800 w-[25%] relative border-r border-neutral-900 overflow-auto overflow-x-hidden pt-4">
      <div className="flex justify-center">
        <ModalCollection
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          modalText={modalText}
          setModalText={setModalText}
          collectionList={collectionList}
          setCollectionList={setCollectionList}
        />
        <div
          className="text-center border border-gray-600 bg-neutral-800 hover:bg-neutral-900 text-whiteText cursor-pointer w-56 p-2 shadow-md rounded border-opacity-50"
          onClick={() => setIsOpen(true)}
        >
          Создать раздел
        </div>
      </div>
      {collectionList.map((section) => (
        <div
          key={section.id}
          className="flex flex-col text-whiteText"
          onClick={() => console.log(collectionList)}
        >
          <div className="border-b">
            <ul className="m-2 leading-4 items-center">
              <div className="flex mb-1 justify-between items-center gap-4">
                <span className="truncate h-5">{section.name}</span>
                <div className="text-xl flex gap-3 mr-2">
                  {!isNewSubCategories && (
                    <>
                      <span
                        className="hover:text-emerald-500 cursor-pointer"
                        onClick={() => addNewSubCategories(section.id)}
                      >
                        +
                      </span>
                    </>
                  )}
                  <span
                    className="hover:text-rose-500 cursor-pointer"
                    onClick={() => deleteSection(section.id)}
                  >
                    &times;
                  </span>
                </div>
              </div>
              {section.subCategories.map((subsection) => (
                <li
                  key={subsection.id}
                  className={clsx(
                    "text-xs ml-3 flex justify-between items-center cursor-pointer",
                    currentSubCategoriesId === subsection.id
                      ? "bg-neutral-700 rounded"
                      : ""
                  )}
                  onClick={() => {
                    handleSubCategorySelect(subsection.id),
                      bgColorSubCategory(subsection.id);
                  }}
                >
                  <span className="hover:opacity-70 truncate p-2">
                    {subsection.title}
                  </span>
                  <span
                    className="text-xl mx-2 hover:text-rose-500 cursor-pointer"
                    onClick={() => deleteSubSection(section.id, subsection.id)}
                  >
                    &times;
                  </span>
                </li>
              ))}
              {isNewSubCategories && activeSectionId === section.id && (
                <div className="text-xs ml-3 flex justify-between items-center cursor-pointer">
                  <input
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-0.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Введите название"
                    autoFocus
                    value={newSubCategoriesText}
                    onChange={(e) => setNewSubCategoriesText(e.target.value)}
                  />

                  <div className="flex items-center">
                    <span>
                      <FaCheck
                        className="hover:text-green-400 -mb-1"
                        onClick={() => {
                          addNewSubCategories(section.id);
                          setIsNewSubCategories(false);
                        }}
                      />
                    </span>
                    <span
                      className="text-xl mx-2 hover:text-rose-500 cursor-pointer"
                      onClick={() => {
                        setIsNewSubCategories(false);
                        setNewSubCategoriesText("");
                      }}
                    >
                      &times;
                    </span>
                  </div>
                </div>
              )}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
}
