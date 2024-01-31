type Props = {
  onSelectDifficulty: (gridSize: number, mineCount: number) => void;
};

export default function DifficultySelector({ onSelectDifficulty }: Props) {
  return (
    <div className="flex justify-center items-center gap-4">
      <button onClick={() => onSelectDifficulty(8, 10)}>Easy</button>
      <button onClick={() => onSelectDifficulty(10, 20)}>Medium</button>
      <button onClick={() => onSelectDifficulty(12, 30)}>Hard</button>
    </div>
  );
};
