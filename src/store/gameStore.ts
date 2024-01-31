import { create } from 'zustand';
import { GameStatus } from '@/types/GameStatus';
import { GameState } from '@/types/GameState';
import { initializeGame, openCellAction, toggleFlagAction } from '@/actions/gameActions';

export const useGameStore = create<GameState>((set) => ({
  gameStatus: GameStatus.Waiting,
  grid: [],
  minesCount: 10,
  flagsCount: 0,
  gridSize: 8,
  setGrid: (newGrid) => set({ grid: newGrid }),
  setDifficulty: (gridSize: number, mineCount: number) => set({ gridSize, minesCount: mineCount }),
  openCell: (row: number, col: number) => set((state) => openCellAction(state, row, col)),
  toggleFlag: (row: number, col: number) => set((state) => toggleFlagAction(state, row, col)),
  initializeGame: () => set((state) => initializeGame(state)),
}));
