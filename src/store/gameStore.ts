import { create } from 'zustand';
import { GameStatus } from '@/types/GameStatus';
import { GameState } from '@/types/GameState';
import { initializeGame, openCellAction, toggleFlagAction } from '@/actions/gameActions';

export const useGameStore = create<GameState>((set) => ({
  gameStatus: GameStatus.Waiting,
  grid: [],
  minesCount: 0,
  flagsCount: 0,
  setGrid: (newGrid) => set({ grid: newGrid }),
  openCell: (row: number, col: number) => set((state) => openCellAction(state, row, col)),
  toggleFlag: (row: number, col: number) => set((state) => toggleFlagAction(state, row, col)),
  initializeGame: (size: number, mineCount: number) => set(() => initializeGame(size, mineCount)),
}));
