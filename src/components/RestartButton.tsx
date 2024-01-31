import React from 'react';
import { useGameStore } from '@/store/gameStore';

export default function RestartButton() {
  const restartGame = useGameStore((state) => state.initializeGame);

  const handleRestart = () => {
    restartGame(10, 10); // グリッドサイズとマインの数を指定
  };

  return (
    <button onClick={handleRestart}>Restart Game</button>
  );
};
