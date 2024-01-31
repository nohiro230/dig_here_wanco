"use client"
import React, { useEffect } from 'react';

import { GameStatus } from '@/types/GameStatus';
import { useGameStore } from '@/store/gameStore';

import Board from "@/components/Board";
import StatusBar from '@/components/StatusBar';
import RestartButton from '@/components/RestartButton';
import DifficultySelector from '@/components/DifficultySelector';

export default function Home() {

  const { gameStatus, initializeGame, setDifficulty } = useGameStore((state) => ({
    gameStatus: state.gameStatus,
    initializeGame: state.initializeGame,
    setDifficulty: state.setDifficulty
  }));

  useEffect(() => {
    initializeGame();
  }, [initializeGame]);

  const handleSelectDifficulty = (gridSize: number, mineCount: number) => {
    setDifficulty(gridSize, mineCount);
    initializeGame();
  };

  return (
    <main className="grid gap-4">
        <StatusBar status={gameStatus} />
        <Board />
        <RestartButton />
        {gameStatus === GameStatus.Lost && (
          <div>
            <p>Game Over!</p>
          </div>
        )}
        {gameStatus !== GameStatus.Playing && (
          <DifficultySelector onSelectDifficulty={handleSelectDifficulty} />
        )}
    </main>
  );
}
