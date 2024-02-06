import { useGameStore } from '@/store/gameStore';
import { GameStatus } from '@/types/GameStatus';
import Flag from './icons/Flag';

type Props = {
  status: GameStatus;
};

export default function StatusBar({ status }: Props) {
  const minesCount = useGameStore((state) => state.minesCount);
  const flagsCount = useGameStore((state) => state.flagsCount);
  const minesLeft = minesCount - flagsCount;

  const elapsedTime = useGameStore((state) => state.elapsedTime);

  return (
    <div className="flex justify-center bg-gray-200 p-4">
      <div className="container flex justify-between items-center">
        <div>inu</div>
        <div>
          {status}
        </div>
        <div className="flex justify-between gap-x-4 text-right">
          <div className="flex items-center gap-x-1">
            <span>time:</span>{elapsedTime}
          </div>
          <div className="flex items-center gap-x-1 w-10">
            <span><Flag /></span>{minesLeft}
          </div>
        </div>
      </div>
    </div>
  );
};
