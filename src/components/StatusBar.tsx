import { useGameStore } from '@/store/gameStore';
import React from 'react';

type Props = {
  minesLeft: number;
};

const StatusBar: React.FC<Props> = () => {
  const minesCount = useGameStore(state => state.minesCount);
  const flagsCount = useGameStore(state => state.flagsCount);

  const minesLeft = minesCount - flagsCount;

  return (
    <div className="flex justify-between items-center p-4 bg-gray-200">
      <div>Dig here Wanco!!</div>
      <div>Mines Left: {minesLeft}</div>
    </div>
  );
};

export default StatusBar;
