"use client"
import React, { useEffect } from 'react';

import { GameStatus } from '@/types/GameStatus';
import { useGameStore } from '@/store/gameStore';

import Board from "@/components/Board";
import StatusBar from '@/components/StatusBar';
import RestartButton from '@/components/RestartButton';

export default function Home() {
  const gameStatus = useGameStore((state) => state.gameStatus);

  const gridSize = 10; // グリッドのサイズ
  const mineCount = 10; // マインの数

  const initializeGame = useGameStore((state) => state.initializeGame);

  useEffect(() => {
    initializeGame(gridSize, mineCount);
  }, [initializeGame, gridSize, mineCount]);

  return (
    <main className="grid gap-4">
        <StatusBar status={gameStatus} />
        <Board />
        <RestartButton />
        {gameStatus === GameStatus.Lost && (
          <div>
            <p>Game Over!</p>
            <RestartButton />
          </div>
        )}
    </main>
  );
}
