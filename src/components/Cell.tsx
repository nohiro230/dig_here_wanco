import React, { useEffect, useState } from 'react';
import MdiMine from '@/components/icons/Mine';
import ActionSelector from './ActionSelector';
import { useGameStore } from '@/store/gameStore';
import { GameStatus } from '@/types/GameStatus';
import Flag from './icons/Flag';

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
  const { openCell, toggleFlag, gameStatus } = useGameStore(state => ({
    openCell: state.openCell,
    toggleFlag: state.toggleFlag,
    gameStatus: state.gameStatus
  }));
  const { activeCell, setActiveCell } = useGameStore(state => ({
    activeCell: state.activeCell,
    setActiveCell: state.setActiveCell
  }));
  const isActive = activeCell.row === rowIndex && activeCell.col === colIndex;

  const handleClick = () => {
    if (isOpen || gameStatus === GameStatus.Won || gameStatus === GameStatus.Lost) {
      return;
    }
    if (isActive) {
      // 既にアクティブなセルがクリックされた場合、ポップアップを閉じる
      setShowActionSelector(false);
      setActiveCell(null, null); // アクティブなセルをリセット
    } else {
      // 新しいセルがクリックされた場合、ポップアップを表示
      setActiveCell(rowIndex, colIndex);
      setShowActionSelector(true);
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

  const openClass = isOpen ? 'bg-white' : 'bg-gray-200 cursor-pointer';
  const specialClass = isSpecial && !isOpen ? 'special-class bg-gray-400' : '';
  const activeClass = isActive && !isOpen ? 'bg-yellow-200' : '';

  return (
    <div
      className={`w-8 h-8 border border-gray-400 rounded flex justify-center items-center ${specialClass} ${openClass} ${activeClass}`}
      onClick={handleClick}
    >
      {isFlagged ? <Flag /> : isOpen ? (isMine ? <MdiMine /> : value > 0 ? value : '') : ''}
      {showActionSelector && isActive && (
        <ActionSelector onOpen={handleOpen} onFlag={handleFlag} />
      )}
    </div>
  );
};
