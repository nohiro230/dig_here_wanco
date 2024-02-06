import { CellType } from "@/types/CellType";
import { GameStatus } from "@/types/GameStatus";

export type GameState = {
  gameStatus: GameStatus;
  grid: CellType[][];
  minesCount: number;
  flagsCount: number;
  elapsedTime: number;
  rows: number;
  cols: number;
  activeCell: {row?: number | null; col?: number | null;};
  setActiveCell: (row: number | null, col: number | null) => void;
  setGrid: (newGrid: CellType[][]) => void;
  setDifficulty: (rows: number, cols: number, mineCount: number) => void;
  openCell: (rowIndex: number, cellIndex: number) => void;
  toggleFlag: (rowIndex: number, cellIndex: number) => void;
  initializeGame: () => void;
};