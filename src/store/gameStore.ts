import { create } from 'zustand';
import { CellType } from '@/types/CellType';
import { generateGrid, openCell, toggleFlag } from '@/utils/logic';

type GameState = {
  grid: CellType[][];
  minesCount: number;
  flagsCount: number;
  setGrid: (newGrid: CellType[][]) => void;
  openCell: (rowIndex: number, cellIndex: number) => void;
  toggleFlag: (rowIndex: number, cellIndex: number) => void;
  initializeGame: (size: number, mineCount: number) => void;
};

export const useGameStore = create<GameState>((set) => ({
  grid: [],
  minesCount: 0,
  flagsCount: 0,
  setGrid: (newGrid) => set({ grid: newGrid }),
  openCell: (row: number, col: number) => set((state) => {
    const newGrid = openCell(state.grid, row, col, state.grid.length, state.grid[0].length);
    return { grid: newGrid };
  }),
  toggleFlag: (row: number, col: number) => set((state) => {
    const newGrid = toggleFlag(state.grid, row, col);
    const newFlagsCount = newGrid.flat().filter(cell => cell.isFlagged).length;
    return { grid: newGrid, flagsCount: newFlagsCount };
  }),
  initializeGame: (size: number, mineCount: number) => set(() => {
    const newGrid = generateGrid(size, mineCount);
    return { grid: newGrid, minesCount: mineCount, flagsCount: 0 };
  }),
}));

