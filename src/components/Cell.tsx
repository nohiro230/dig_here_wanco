import React, { useState, useEffect } from 'react';

type Props = {
  value: number;
  isMine: boolean;
  isOpen: boolean;
  isFlagged: boolean;
  onClick: () => void;
  onLongPress: () => void;
};

const LONG_PRESS_DURATION = 500; // 長押しとみなす時間（ミリ秒）

const Cell: React.FC<Props> = ({ value, isMine, isOpen, isFlagged, onClick, onLongPress }) => {
  const [pressTimer, setPressTimer] = useState<NodeJS.Timeout | null>(null);
  const [longPressTriggered, setLongPressTriggered] = useState(false);

  const openClass = isOpen ? 'bg-white' : 'bg-gray-300';

  const handleTouchStart = () => {
    if (isOpen) {
      return;
    }

    setLongPressTriggered(false);
    setPressTimer(setTimeout(() => {
      onLongPress();
      setLongPressTriggered(true);
    }, LONG_PRESS_DURATION));
  };

  const handleTouchEnd = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    if (pressTimer) {
      clearTimeout(pressTimer);
      setPressTimer(null);
    }
    if (longPressTriggered) {
      e.preventDefault(); // 長押しの場合はクリックイベントをキャンセル
    }
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    if (isFlagged || longPressTriggered) {
      e.preventDefault();
      return;
    }
    onClick();
  };

  return (
    <div
      className={`w-8 h-8 border border-gray-400 rounded flex justify-center items-center ${openClass}`}
      onClick={handleClick}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleTouchStart}
      onMouseUp={handleTouchEnd}
      onMouseLeave={handleTouchEnd}
      onContextMenu={handleTouchEnd}
    >
      {isFlagged ? '🚩' : isOpen ? (isMine ? '💣' : value > 0 ? value : '') : ''}
    </div>
  );
};

export default Cell;