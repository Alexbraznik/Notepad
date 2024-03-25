import { useState } from "react";
import { TrashIcon } from "./trash-icon";
import { ModalBoard } from "./modal-board";
import { v4 as uuidv4 } from "uuid";

export function Board({
  todo,
  setTodo,
  currentSubCategoriesId,
  collectionList,
  setCollectionList,
}) {
  const [title, setTitle] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [modalText, setModalText] = useState("");

  function addTodo() {
    if (title.trim().length === 0) {
      return;
    } else {
      const newTodo = [...todo];
      newTodo.push({
        id: uuidv4(),
        title: title.trim(),
        isCompleted: false,
      });
      setTodo(newTodo);

      const updatedCatalog = collectionList.map((section) => {
        const updatedSubCategories = section.subCategories.map(
          (subCategory) => {
            if (subCategory.id === currentSubCategoriesId) {
              return {
                ...subCategory,
                tasks: [
                  ...subCategory.tasks,
                  {
                    id: uuidv4(),
                    title: title.trim(),
                    isCompleted: false,
                  },
                ],
              };
            }
            return subCategory;
          }
        );
        return { ...section, subCategories: updatedSubCategories };
      });

      setCollectionList(updatedCatalog);
      setTitle("");
    }
  }

  function deleteTodo(id) {
    const updatedCollectionList = collectionList.map((section) => {
      const updatedSubCategories = section.subCategories.map((subCategory) => {
        if (subCategory.id === currentSubCategoriesId) {
          return {
            ...subCategory,
            tasks: subCategory.tasks.filter((task) => task.id !== id),
          };
        }
        return subCategory;
      });

      return { ...section, subCategories: updatedSubCategories };
    });

    setCollectionList(updatedCollectionList);
  }

  return (
    <div className="w-full bg-stone-800 h-full overflow-y-auto ">
      <ModalBoard
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        modalText={modalText}
        setModalText={setModalText}
        todo={todo}
        setTodo={setTodo}
        collectionList={collectionList}
        setCollectionList={setCollectionList}
      />
      <div className="flex flex-col items-center gap-1 justify-center pt-4 overflow-auto">
        <input
          type="text"
          placeholder="Введите задачу"
          className="w-9/12  h-8 rounded p-1 bg-neutral-700 text-whiteText"
          onChange={(event) => setTitle(event.target.value)}
          value={title}
        />
        <button
          onClick={() => addTodo()}
          className="bg-neutral-700 text-whiteText hover:bg-neutral-600 w-40 h-8 rounded transition-colors ease-in-out shadow-md"
        >
          Добавить задачу
        </button>
      </div>
      <div className="pt-4 text-whiteText">
        {collectionList.map((section) =>
          section.subCategories.map((subCategory) =>
            subCategory.id === currentSubCategoriesId
              ? subCategory.tasks.map((task) => (
                  <div
                    className="flex items-center border-b-2 border-black pl-2"
                    key={task.id}
                  >
                    <div
                      className="w-[calc(100vw-35%)] truncate cursor-pointer hover:opacity-60 py-1.5 px-3"
                      onClick={() => {
                        setIsOpen(true);
                        setModalText(task.title);
                      }}
                    >
                      {task.title}
                    </div>
                    <TrashIcon
                      className="hover:text-red-500 cursor-pointer transition-colors ease-in-out ml-5"
                      onClick={() => deleteTodo(task.id)}
                    />
                  </div>
                ))
              : null
          )
        )}
      </div>
    </div>
  );
}
