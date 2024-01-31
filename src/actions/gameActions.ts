import { generateGrid, openCell, toggleFlag } from '@/utils/logic';
import { GameState } from '@/types/GameState';
import { GameStatus } from '@/types/GameStatus';

const LONG_PRESS_DURATION = 500; // 長押しとみなす時間（ミリ秒）

export const initializeGame = (state: GameState) => {
  const newGrid = generateGrid(state.gridSize, state.minesCount);
  return {
    gameStatus: GameStatus.Waiting,
    grid: newGrid,
    flagsCount: 0,
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
    return { ...state, grid: newGrid, gameStatus: GameStatus.Lost };
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

// セルのタッチ動作
export const handleCellTouchStart = (
  isOpen: boolean,
  setLongPressTriggered: (value: boolean) => void,
  setPressTimer: (timer: NodeJS.Timeout | null) => void,
  onLongPress: () => void
) => {

  if (isOpen) {
    return;
  }

  setLongPressTriggered(false);
  setPressTimer(setTimeout(() => {
    onLongPress();
    setLongPressTriggered(true);
  }, LONG_PRESS_DURATION));
};

export const handleCellTouchEnd = (
  e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>,
  longPressTriggered: boolean,
  pressTimer: NodeJS.Timeout | null,
  setPressTimer: (timer: NodeJS.Timeout | null) => void
) => {
  if (pressTimer) {
    clearTimeout(pressTimer);
    setPressTimer(null);
  }
  if (longPressTriggered) {
    e.preventDefault(); // 長押しの場合はクリックイベントをキャンセル
  }
};

export const handleCellClick = (
  e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>,
  isFlagged: boolean,
  longPressTriggered: boolean,
  onClick: () => void,
) => {
  if (isFlagged || longPressTriggered) {
    e.preventDefault();
    return;
  }
  onClick();
};