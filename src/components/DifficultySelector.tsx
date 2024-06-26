type Props = {
  onSelectDifficulty: (rows: number, cols: number, mineCount: number) => void;
};

export default function DifficultySelector({ onSelectDifficulty }: Props) {
  return (
    <div className="flex justify-center items-center gap-4">
      <button onClick={() => onSelectDifficulty(8, 8, 10)} className="bg-pink border border-base-100 rounded shadow text-base-100 px-2">
        Easy
      </button>
      <button onClick={() => onSelectDifficulty(15, 15, 40)} className="bg-orange border border-base-100 rounded shadow text-base-100 px-2">
        Medium
      </button>
      <button onClick={() => onSelectDifficulty(27, 15, 99)} className="bg-blue border border-base-100 rounded shadow text-base-100 px-2">
        Hard
      </button>
    </div>
  );
};
