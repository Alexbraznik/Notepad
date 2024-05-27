import { Board } from './board/Board';
import { Collection } from './collection/Collection';

export default function MainPage() {
  return (
    <div>
      <div className="flex w-screen h-screen">
        <Collection />
        <Board />
      </div>
    </div>
  );
}
