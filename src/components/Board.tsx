import Cell from '@/components/Cell';
import { useGameStore } from '@/store/gameStore';


export default function Board() {
  const grid = useGameStore((state) => state.grid);
  const gridCols = grid[0]?.length || 0;

  return (
    <>
      <div className={`boardGrid grid md:gap-1 w-fit max-w-full mx-auto`}>
        {grid.map((row, rowIndex) =>
          row.map((cell, cellIndex) => (
            <Cell
              key={`${rowIndex}-${cellIndex}`}
              value={cell.adjacentMines}
              isMine={cell.isMine}
              isOpen={cell.isOpen}
              isFlagged={cell.isFlagged}
              isSpecial={cell.isSpecial}
              rowIndex={rowIndex}
              colIndex={cellIndex}
            />
          ))
        )}
      </div>

      {/* 動的にtailwind cssを生成したかったができなかった */}
      <style jsx>{`
        .boardGrid {
          grid-template-columns: repeat(${gridCols}, minmax(0, 1fr));
        }
      `}</style>
    </>
  );
};
