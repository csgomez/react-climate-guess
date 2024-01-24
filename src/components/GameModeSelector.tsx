import { GameMode } from '../types';

interface GameModeSelectorProps {
  currentGameMode: GameMode;
  setCurrentGameMode: (newGameMode: GameMode) => void;
}

const GameModeSelector = ({
  currentGameMode,
  setCurrentGameMode,
}: GameModeSelectorProps) => {
  return (
    <div className="d-inline-block">
      <div className="btn-group btn-group-sm opacity-75">
        <input
          type="radio"
          name="gamemode"
          id="worldbtn"
          className="btn-check"
          autoComplete="off"
          checked={currentGameMode === 'world'}
          onChange={() => setCurrentGameMode('world')}
        />
        <label htmlFor="worldbtn" className="btn btn-outline-light">
          WORLD
        </label>

        <input
          type="radio"
          name="gamemode"
          id="usbtn"
          className="btn-check"
          autoComplete="off"
          checked={currentGameMode === 'us'}
          onChange={() => setCurrentGameMode('us')}
        />
        <label htmlFor="usbtn" className="btn btn-outline-light">
          USA
        </label>
      </div>
    </div>
  );
};

export default GameModeSelector;
