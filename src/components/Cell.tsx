import { handleCellClick, handleCellTouchEnd, handleCellTouchStart } from '@/actions/gameActions';
import React, { useState, useEffect } from 'react';

type Props = {
  value: number;
  isMine: boolean;
  isOpen: boolean;
  isFlagged: boolean;
  onClick: () => void;
  onLongPress: () => void;
};

export default function Cell({ value, isMine, isOpen, isFlagged, onClick, onLongPress }: Props) {
  const [pressTimer, setPressTimer] = useState<NodeJS.Timeout | null>(null);
  const [longPressTriggered, setLongPressTriggered] = useState(false);

  const openClass = isOpen ? 'bg-white' : 'bg-gray-200 cursor-pointer';

  return (
    <div
      className={`w-8 h-8 border border-gray-400 rounded flex justify-center items-center ${openClass}`}
      onClick={(e) => handleCellClick(e, isFlagged, longPressTriggered, onClick)}
      onTouchStart={() => handleCellTouchStart(isOpen, setLongPressTriggered, setPressTimer, onLongPress)}
      onTouchEnd={(e) => handleCellTouchEnd(e, longPressTriggered, pressTimer, setPressTimer)}
      onMouseDown={() => handleCellTouchStart(isOpen, setLongPressTriggered, setPressTimer, onLongPress)}
      onMouseUp={(e) => handleCellTouchEnd(e, longPressTriggered, pressTimer, setPressTimer)}
      onMouseLeave={(e) => handleCellTouchEnd(e, longPressTriggered, pressTimer, setPressTimer)}
      onContextMenu={(e) => handleCellTouchEnd(e, longPressTriggered, pressTimer, setPressTimer)}
    >
      {isFlagged ? '🚩' : isOpen ? (isMine ? '💣' : value > 0 ? value : '') : ''}
    </div>
  );
};
