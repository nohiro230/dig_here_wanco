import { CellType } from '@/types/CellType';

export const generateGrid = (size: number, mineCount: number): CellType[][] => {
  // 空のグリッドを生成
  let grid: CellType[][] = Array.from({ length: size }, () =>
    Array.from({ length: size }, () => ({
      isMine: false,
      adjacentMines: 0,
      isOpen: false,
      isFlagged: false,
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

// 隣接する空白セルも一緒に開ける処理
const openAdjacentCells = (grid: CellType[][], row: number, col: number, rows: number, cols: number): CellType[][] => {
  // 新しいグリッドのインスタンスを作成
  let newGrid = grid.map(row => row.map(cell => ({ ...cell })));

  if (row < 0 || row >= rows || col < 0 || col >= cols || newGrid[row][col].isOpen) {
    return newGrid;
  }

  newGrid[row][col].isOpen = true;

  if (newGrid[row][col].adjacentMines === 0) {
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        if (i !== 0 || j !== 0) {
          newGrid = openAdjacentCells(newGrid, row + i, col + j, rows, cols);
        }
      }
    }
  }

  return newGrid;
};

export const openCell = (grid: CellType[][], row: number, col: number, rows: number, cols: number): CellType[][] => {
  return openAdjacentCells(grid, row, col, rows, cols);
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
