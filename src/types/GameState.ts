import { CellType } from "@/types/CellType";
import { GameStatus } from "@/types/GameStatus";

export type GameState = {
  gameStatus: GameStatus;
  grid: CellType[][];
  minesCount: number;
  flagsCount: number;
  gridSize: number;
  setGrid: (newGrid: CellType[][]) => void;
  setDifficulty: (gridSize: number, mineCount: number) => void;
  openCell: (rowIndex: number, cellIndex: number) => void;
  toggleFlag: (rowIndex: number, cellIndex: number) => void;
  initializeGame: () => void;
};