import { create } from 'zustand';
import { GameStatus } from '@/types/GameStatus';
import { GameState } from '@/types/GameState';
import { initializeGame, openCellAction, toggleFlagAction } from '@/actions/gameActions';

export const useGameStore = create<GameState>((set) => ({
  gameStatus: GameStatus.Waiting,
  grid: [],
  minesCount: 10,
  flagsCount: 0,
  elapsedTime: 0,
  rows: 8,
  cols: 8,
  currentAction: 'open',
  activeCell: {},
  setActiveCell: (row: any, col: any) => set({ activeCell: { row, col } }),
  setGrid: (newGrid) => set({ grid: newGrid }),
  setDifficulty: (rows: number, cols: number, mineCount: number) => set({ rows: rows, cols: cols, minesCount: mineCount }),
  openCell: (row: number, col: number) => set((state) => openCellAction(state, row, col)),
  toggleFlag: (row: number, col: number) => set((state) => toggleFlagAction(state, row, col)),
  initializeGame: () => set((state) => initializeGame(state)),
}));
