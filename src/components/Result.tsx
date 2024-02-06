import { GameStatus } from '@/types/GameStatus';
import RestartButton from '@/components/RestartButton';

type Props = {
  status: GameStatus;
};

export default function Result({ status }: Props) {
  return (
    <>
      <div className="fixed w-screen h-screen top-0 left-0 bg-black bg-opacity-50"></div>
      <div className="fixed z-10 inset-0 m-auto w-fit max-w-full h-fit max-h-full bg-white rounded-lg py-6 px-4 flex flex-col items-center gap-4">
        <div>
          {status === GameStatus.Won && <div>おめでとうございます！勝利しました！</div>}
          {status === GameStatus.Lost && <div>残念！ゲームオーバーです。</div>}
        </div>
        <RestartButton />
      </div>
    </>
  );
};
