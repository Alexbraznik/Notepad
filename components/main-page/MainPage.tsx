import { FC } from 'react';
import { Board } from './board/Board';
import { Collection } from './collection/Collection';

const MainPage: FC = () => {
  return (
    <div className="flex w-screen h-screen">
      <Collection />
      <Board />
    </div>
  );
};

export default MainPage;
