import { useState } from 'react';
import MdiMine from '@/components/icons/Mine';
import ActionSelector from './ActionSelector';
import { useGameStore } from '@/store/gameStore';
import { GameStatus } from '@/types/GameStatus';
import Flag from './icons/Flag';
import { countFlagsAround, openAdjacentCells } from '@/utils/logic';

type Props = {
  value: number;
  isMine: boolean;
  isOpen: boolean;
  isFlagged: boolean;
  isSpecial: boolean;
  rowIndex: number;
  colIndex: number;
};

export default function Cell({ value, isMine, isOpen, isFlagged, isSpecial, rowIndex, colIndex }: Props) {
  const [showActionSelector, setShowActionSelector] = useState(false);
  const { state, openCell, toggleFlag, gameStatus, setGrid } = useGameStore(state => ({
    state: state,
    openCell: state.openCell,
    toggleFlag: state.toggleFlag,
    gameStatus: state.gameStatus,
    setGrid: state.setGrid,
  }));
  const { activeCell, setActiveCell } = useGameStore(state => ({
    activeCell: state.activeCell,
    setActiveCell: state.setActiveCell
  }));
  const isActive = activeCell.row === rowIndex && activeCell.col === colIndex;

  const handleClick = () => {
    if (gameStatus === GameStatus.Won || gameStatus === GameStatus.Lost) {
      return;
    }

    if (isOpen && value > 0) {
      // セルが開かれており、数字が表示されている場合
      handleOpenAdjacent();
    } else {
      if (isOpen || isActive) {
        // 既にアクティブなセルがクリックされた場合、ポップアップを閉じる
        setShowActionSelector(false);
        setActiveCell(null, null); // アクティブなセルをリセット
      } else {
        // 新しいセルがクリックされた場合、ポップアップを表示
        setActiveCell(rowIndex, colIndex);
        setShowActionSelector(true);
      }
    }
  };

  const handleOpen = () => {
    if (isFlagged) {
      return;
    }
    openCell(rowIndex, colIndex);
    setShowActionSelector(false);
  };

  const handleFlag = () => {
    toggleFlag(rowIndex, colIndex);
    setShowActionSelector(false);
  };

  const handleOpenAdjacent = () => {
    const flagsCount = countFlagsAround(state.grid, rowIndex, colIndex);
    if (flagsCount >= value) {
      // 隣接セルを開くロジック
      const newState = openAdjacentCells(state, rowIndex, colIndex);
      useGameStore.setState(newState);
    }
  };

  const cellClass = isOpen && isMine ? 'mine-blink' : '';
  const openClass = isOpen ? 'bg-white' : 'bg-gray-200 cursor-pointer';
  const specialClass = isSpecial && !isOpen ? 'special-class bg-gray-400' : '';
  const activeClass = isActive && !isOpen ? 'bg-yellow-200' : '';

  return (
    <div
      className={`w-[6vw] max-w-8 aspect-square border border-white rounded-sm md:rounded flex justify-center items-center text-[90%] overflow-hidden shadow ${specialClass} ${openClass} ${cellClass} ${activeClass}`}
      onClick={handleClick}
    >
      {isFlagged ? <Flag /> : isOpen ? (isMine ? <MdiMine /> : value > 0 ? value : '') : ''}
      {showActionSelector && isActive && (
        <ActionSelector onOpen={handleOpen} onFlag={handleFlag} />
      )}
    </div>
  );
};
