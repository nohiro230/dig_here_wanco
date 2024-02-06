"use client"
import React, { useEffect } from 'react';

import { GameStatus } from '@/types/GameStatus';
import { useGameStore } from '@/store/gameStore';

import Board from "@/components/Board";
import StatusBar from '@/components/StatusBar';
import RestartButton from '@/components/RestartButton';
import DifficultySelector from '@/components/DifficultySelector';
import Result from '@/components/Result';

export default function Home() {

  const { gameStatus, initializeGame, setDifficulty } = useGameStore((state) => ({
    gameStatus: state.gameStatus,
    initializeGame: state.initializeGame,
    setDifficulty: state.setDifficulty
  }));

  useEffect(() => {
    initializeGame();
  }, [initializeGame]);

  const handleSelectDifficulty = (rows: number, cols: number, mineCount: number) => {
    setDifficulty(rows, cols, mineCount);
    initializeGame();
  };

  return (
    <main className="grid gap-4">
        <StatusBar status={gameStatus} />
        <Board />
        <RestartButton />
        {(gameStatus === GameStatus.Won || gameStatus === GameStatus.Lost) && (
          <Result status={gameStatus} />
        )}
        {gameStatus !== GameStatus.Playing && (
          <DifficultySelector onSelectDifficulty={handleSelectDifficulty} />
        )}
    </main>
  );
}
