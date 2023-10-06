import { GameMode } from '../types';

interface GameModeSelectorProps {
  currentGameMode: GameMode;
  onSwitchGameMode: () => void;
}

const GameModeSelector = ({
  currentGameMode,
  onSwitchGameMode,
}: GameModeSelectorProps) => {
  const nextGameMode = currentGameMode === 'world' ? 'us' : 'world';

  return (
    <div className="d-inline-block my-2 border border-black">
      Current Mode: {currentGameMode}
      <button
        className="btn btn-sm btn-outline-primary ms-3"
        onClick={onSwitchGameMode}
      >
        Switch to {nextGameMode}
      </button>
    </div>
  );
};

export default GameModeSelector;
