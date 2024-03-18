import { Header } from "./header/header";
import { Collection } from "./collection/collection";
import { Board } from "./board/board";

export default function MainPage() {
  return (
    <div>
      <Header />
      <div className="flex w-full bg-teal-500 md:w-auto h-[calc(100vh-64px)]">
        <Collection />
        <Board />
      </div>
    </div>
  );
}
