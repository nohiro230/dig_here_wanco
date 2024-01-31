import Cell from '@/components/Cell';
import { useGameStore } from '@/store/gameStore';


export default function Board() {
  const grid = useGameStore((state) => state.grid);
  const openCell = useGameStore((state) => state.openCell);
  const gridCols = grid[0]?.length || 0;
  const toggleFlag = useGameStore((state) => state.toggleFlag);

  return (
    <>
      <div className={`boardGrid grid gap-1 w-fit max-w-full mx-auto`}>
        {grid.map((row, rowIndex) =>
          row.map((cell, cellIndex) => (
            <Cell
              key={`${rowIndex}-${cellIndex}`}
              value={cell.adjacentMines}
              isMine={cell.isMine}
              isOpen={cell.isOpen}
              isFlagged={cell.isFlagged}
              onClick={() => openCell(rowIndex, cellIndex)}
              onLongPress={() => toggleFlag(rowIndex, cellIndex)}
            />
          ))
        )}
      </div>

      {/* 動的にtailwindcssを生成したかったができなかった */}
      <style jsx>{`
        .boardGrid {
          grid-template-columns: repeat(${gridCols}, minmax(0, 1fr));
        }
      `}</style>
    </>
  );
};
