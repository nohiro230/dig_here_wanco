"use client"
import React, { useEffect } from 'react';

import { GameStatus } from '@/types/GameStatus';
import { useGameStore } from '@/store/gameStore';

import Board from "@/components/Board";
import StatusBar from '@/components/StatusBar';
import RestartButton from '@/components/RestartButton';
import DifficultySelector from '@/components/DifficultySelector';
import Result from '@/components/Result';
import { useGameTimer } from '@/utils/useGameTimer';

export default function Home() {

  const { gameStatus, initializeGame, setDifficulty, elapsedTime } = useGameStore((state) => ({
    gameStatus: state.gameStatus,
    initializeGame: state.initializeGame,
    setDifficulty: state.setDifficulty,
    elapsedTime: state.elapsedTime,
  }));

  useGameTimer(gameStatus);

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
        <div className="flex flex-col gap-y-4 max-w-screen-sm bg-base-100 mx-auto">
          <Board />
          <RestartButton />
          {(gameStatus === GameStatus.Won || gameStatus === GameStatus.Lost) && (
            <Result status={gameStatus} />
          )}
          {gameStatus !== GameStatus.Playing && (
            <DifficultySelector onSelectDifficulty={handleSelectDifficulty} />
          )}
        </div>
    </main>
  );
}
