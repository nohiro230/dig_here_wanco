import Dig from "@/components/icons/Dig";
import Flag from "@/components/icons/Flag";

type Props = {
  onOpen: () => void;
  onFlag: () => void;
};

export default function ActionSelector({ onOpen, onFlag }: Props) {
  const handleOpenClick = (e: { stopPropagation: () => void; }) => {
    e.stopPropagation();
    onOpen();
  };

  const handleFlagClick = (e: { stopPropagation: () => void; }) => {
    e.stopPropagation();
    onFlag();
  };

  return (
    <div className="w-8 h-8 absolute z-50">
      <button onClick={handleOpenClick} className="absolute inset-0 -mt-16">
        <Dig />
      </button>
      <button onClick={handleFlagClick} className="absolute inset-0 -ml-16">
        <Flag />
      </button>
    </div>
  );
};
