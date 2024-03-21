import { Header } from "./header/header";
import { Collection } from "./collection/collection";
import { Board } from "./board/board";
import { catalog } from "./constatns";
import { useState } from "react";

export default function MainPage() {
  const [todo, setTodo] = useState(catalog[0].subCategories[0].tasks);
  const [currentSubCategoriesId, setCurrentSubCategoriesId] = useState(
    catalog[0].subCategories[0].id
  );
  const [collectionList, setCollectionList] = useState(catalog);

  return (
    <div>
      {/* <Header /> */}
      {/* h-[calc(100vh-64px) было в div ниже, добавить, если будет header */}
      <div className="flex w-screen bg-teal-500 h-screen">
        <Collection
          setTodo={setTodo}
          currentSubCategoriesId={currentSubCategoriesId}
          setCurrentSubCategoriesId={setCurrentSubCategoriesId}
          collectionList={collectionList}
          setCollectionList={setCollectionList}
        />
        <Board
          todo={todo}
          setTodo={setTodo}
          catalog={catalog}
          currentSubCategoriesId={currentSubCategoriesId}
          setCurrentSubCategoriesId={setCurrentSubCategoriesId}
          collectionList={collectionList}
          setCollectionList={setCollectionList}
        />
      </div>
    </div>
  );
}
