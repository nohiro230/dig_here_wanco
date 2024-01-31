import { useGameStore } from '@/store/gameStore';
import { GameStatus } from '@/types/GameStatus';

type Props = {
  status: GameStatus;
};

export default function StatusBar({ status }: Props) {
  const minesCount = useGameStore((state) => state.minesCount);
  const flagsCount = useGameStore((state) => state.flagsCount);

  const minesLeft = minesCount - flagsCount;

  return (
    <div className="flex justify-center bg-gray-200 p-4">
      <div className="container flex justify-between items-center">
        <div>Dig here Wanco!!</div>
        <div>
          {status}
        </div>
        <div className="flex justify-between w-10 text-right">
          <span>🚩</span>{minesLeft}
        </div>
      </div>
    </div>
  );
};
