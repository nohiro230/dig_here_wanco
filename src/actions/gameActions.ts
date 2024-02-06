import { generateGrid, openCell, toggleFlag } from '@/utils/logic';
import { GameState } from '@/types/GameState';
import { GameStatus } from '@/types/GameStatus';
import { CellType } from '@/types/CellType';

export const initializeGame = (state: GameState) => {
  const newGrid = generateGrid(state.rows, state.cols, state.minesCount);

  return {
    gameStatus: GameStatus.Waiting,
    elapsedTime: 0,
    grid: newGrid,
    flagsCount: 0,
    activeCell: { row: null, col: null },
  };
};

export const openCellAction = (state: GameState, row: number, col: number) => {
  // 特定の状態ではセルを開けないようにする
  if (state.gameStatus === GameStatus.Won || state.gameStatus === GameStatus.Lost) {
    return state;
  }
  // WaitingからPlayingへの更新
  const newGameStatus = state.gameStatus === GameStatus.Waiting ? GameStatus.Playing : state.gameStatus;

  const newGrid = openCell(state.grid, row, col, state.grid.length, state.grid[0].length);
  const cell = newGrid[row][col];

  // 爆弾を開いたときの処理
  if (cell.isMine) {
    const revealedGrid = revealAllMines(newGrid);
    return { ...state, grid: revealedGrid, gameStatus: GameStatus.Lost };
  }

  // 開かれていないセルの数を計算
  const closedCellsCount = newGrid.flat().filter(cell => !cell.isOpen).length;

  // 開かれていないセルの数がマインの数と同じ場合、ゲームに勝利
  if (closedCellsCount === state.minesCount) {
    return { ...state, grid: newGrid, gameStatus: GameStatus.Won };
  }

  return { ...state, grid: newGrid, gameStatus: newGameStatus };
};

export const toggleFlagAction = (state: GameState, row: number, col: number) => {
  const newGrid = toggleFlag(state.grid, row, col);
  const newFlagsCount = newGrid.flat().filter(cell => cell.isFlagged).length;
  return { grid: newGrid, flagsCount: newFlagsCount };
};

const revealAllMines = (grid: CellType[][]): CellType[][] => {
  return grid.map(row => row.map(cell => {
    if (cell.isMine) {
      return { ...cell, isOpen: true };
    }
    return cell;
  }));
};

export const handleCellClick = (
  state: GameState,
  row: number,
  col: number,
  action: 'open' | 'flag'
) => {
  if (action === 'flag') {
    return toggleFlagAction(state, row, col);
  } else {
    return openCellAction(state, row, col);
  }
};