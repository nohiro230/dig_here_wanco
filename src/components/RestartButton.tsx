import { useGameStore } from '@/store/gameStore';

export default function RestartButton() {
  const restartGame = useGameStore((state) => state.initializeGame);

  return (
    <button onClick={restartGame} className="block w-fit max-w-full bg-primary/50 text-base-100 rounded py-2 px-4 mx-auto shadow-md">
      Restart Game
    </button>
  );
};
