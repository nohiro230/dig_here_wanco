import { useGameStore } from '@/store/gameStore';

export default function RestartButton() {
  const restartGame = useGameStore((state) => state.initializeGame);

  return (
    <button onClick={restartGame}>Restart Game</button>
  );
};
