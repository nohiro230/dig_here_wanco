"use client"
import React, { useEffect } from 'react';

import { generateGrid } from '@/utils/logic';
import { useGameStore } from '@/store/gameStore';

import Board from "@/components/Board";
import StatusBar from '@/components/StatusBar';

export default function Home() {
  const gridSize = 10; // グリッドのサイズ
  const mineCount = 10; // マインの数

  const setGrid = useGameStore((state) => state.setGrid);
  const initializeGame = useGameStore((state) => state.initializeGame);
  const minesCount = useGameStore((state) => state.minesCount);
  const flagsCount = useGameStore((state) => state.flagsCount);

  useEffect(() => {
    initializeGame(gridSize, mineCount);
  }, [initializeGame, gridSize, mineCount]);

  const minesLeft = minesCount - flagsCount;

  return (
    <main className="grid gap-4">
        <StatusBar minesLeft={minesLeft} />
        <Board />
    </main>
  );
}
