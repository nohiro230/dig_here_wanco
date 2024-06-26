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
    <div className="relative flex justify-between bg-gray-200 p-4">
      <div className="container max-w-screen-sm flex justify-between items-center">
        <div>inu</div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
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
