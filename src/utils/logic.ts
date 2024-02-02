import { openCellAction } from '@/actions/gameActions';
import { CellType } from '@/types/CellType';
import { GameState } from '@/types/GameState';

export const generateGrid = (size: number, mineCount: number): CellType[][] => {
  // 空のグリッドを生成
  let grid: CellType[][] = Array.from({ length: size }, () =>
    Array.from({ length: size }, () => ({
      isMine: false,
      adjacentMines: 0,
      isOpen: false,
      isFlagged: false,
      isSpecial: false,
    }))
  );

  // マインをランダムに配置
  let minesPlaced = 0;
  while (minesPlaced < mineCount) {
    const row = Math.floor(Math.random() * size);
    const col = Math.floor(Math.random() * size);

    if (!grid[row][col].isMine) {
      grid[row][col].isMine = true;
      minesPlaced++;
    }
  }

  // 隣接するマインの数を計算
  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      if (!grid[row][col].isMine) {
        grid[row][col].adjacentMines = countAdjacentMines(grid, row, col, size);
      }
    }
  }

  // ランダムな空白セルに特別なクラスを付与
  let specialCellPlaced = false;
  while (!specialCellPlaced) {
    const row = Math.floor(Math.random() * size);
    const col = Math.floor(Math.random() * size);

    if (!grid[row][col].isMine && grid[row][col].adjacentMines === 0) {
      grid[row][col].isSpecial = true;
      specialCellPlaced = true;
    }
  }


  return grid;
};

// 隣接するマインの計算
const countAdjacentMines = (grid: CellType[][], row: number, col: number, size: number): number => {
  let count = 0;
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      const newRow = row + i;
      const newCol = col + j;
      if (newRow >= 0 && newRow < size && newCol >= 0 && newCol < size && grid[newRow][newCol].isMine) {
        count++;
      }
    }
  }
  return count;
};

export const countFlagsAround = (grid: CellType[][], row: number, col: number): number => {
  let count = 0;
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      const newRow = row + i;
      const newCol = col + j;
      if (newRow >= 0 && newRow < grid.length && newCol >= 0 && newCol < grid[0].length) {
        if (grid[newRow][newCol].isFlagged) {
          count++;
        }
      }
    }
  }
  return count;
};

export const openAdjacentCells = (state: GameState, row: number, col: number): GameState => {
  const cellValue = state.grid[row][col].adjacentMines;

  if (cellValue > 0) {
    const flagsCount = countFlagsAround(state.grid, row, col);
    if (flagsCount >= cellValue) {
      // 隣接セルを開く
      for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
          if (i === 0 && j === 0) continue; // クリックされたセル自体は除外

          const newRow = row + i;
          const newCol = col + j;

          if (newRow >= 0 && newRow < state.grid.length && newCol >= 0 && newCol < state.grid[0].length) {
            const adjacentCell = state.grid[newRow][newCol];
            if (!adjacentCell.isFlagged && !adjacentCell.isOpen) {
              // openCellAction を使用してセルを開く
              state = openCellAction(state, newRow, newCol);
            }
          }
        }
      }
    }
  }

  return state;
};

// 隣接する空白セルも一緒に開ける処理
const openAdjacentBlankCells = (grid: CellType[][], row: number, col: number, rows: number, cols: number): CellType[][] => {
  // 新しいグリッドのインスタンスを作成
  let newGrid = grid.map(row => row.map(cell => ({ ...cell })));

  if (row < 0 || row >= rows || col < 0 || col >= cols || newGrid[row][col].isOpen || newGrid[row][col].isFlagged) {
    return newGrid;
  }

  newGrid[row][col].isOpen = true;

  // 隣接するマインがない場合、隣接するセルも開く
  if (newGrid[row][col].adjacentMines === 0) {
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        if (i !== 0 || j !== 0) {
          newGrid = openAdjacentBlankCells(newGrid, row + i, col + j, rows, cols);
        }
      }
    }
  }

  return newGrid;
};

export const openCell = (grid: CellType[][], row: number, col: number, rows: number, cols: number): CellType[][] => {
  return openAdjacentBlankCells(grid, row, col, rows, cols);
};

// Flug
export const toggleFlag = (grid: CellType[][], row: number, col: number): CellType[][] => {
  const newGrid = grid.map((rowArr, rowIndex) =>
    rowArr.map((cell, colIndex) => {
      if (rowIndex === row && colIndex === col) {
        return { ...cell, isFlagged: !cell.isFlagged };
      }
      return cell;
    })
  );
  return newGrid;
};
