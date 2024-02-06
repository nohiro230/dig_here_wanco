import { useEffect } from 'react';
import { GameStatus } from '@/types/GameStatus';
import { useGameStore } from '@/store/gameStore';

export const useGameTimer = (gameStatus: GameStatus) => {
  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null;;

    if (gameStatus === GameStatus.Playing) {
      // カウンターを開始
      intervalId = setInterval(() => {
        useGameStore.setState((prevState) => ({ elapsedTime: prevState.elapsedTime + 1 }));
      }, 1000);
    }

    return () => {
      // カウンターを停止
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [gameStatus]);
};
