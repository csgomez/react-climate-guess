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
    <div>
      Current Mode: {currentGameMode}
      <button style={{ marginLeft: '1rem' }} onClick={onSwitchGameMode}>
        Switch to {nextGameMode}
      </button>
    </div>
  );
};

export default GameModeSelector;
