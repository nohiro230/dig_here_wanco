type Props = {
  onSelectDifficulty: (gridSize: number, mineCount: number) => void;
};

export default function DifficultySelector({ onSelectDifficulty }: Props) {
  return (
    <div className="flex justify-center items-center gap-4">
      <button onClick={() => onSelectDifficulty(8, 10)}>Easy</button>
      <button onClick={() => onSelectDifficulty(15, 40)}>Medium</button>
      <button onClick={() => onSelectDifficulty(20, 99)}>Hard</button>
    </div>
  );
};
