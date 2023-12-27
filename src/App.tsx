import { useEffect, useState } from 'react';
import worldCountryCapitals from './data/world_country_capitals.json';
import usStateCapitals from './data/us_state_capitals.json';
import { getTwoRandomCities } from './utils';
import { fetchTemperatureByCity } from './services/geoweather';
import { GameMode, City, Score } from './types';
import useLocalStorage from './hooks/useLocalStorage';
import Game from './components/Game';
import GameModeSelector from './components/GameModeSelector';
import NextCitiesButton from './components/NextCitiesButton';
import ScoreStats from './components/ScoreStats';
import Header from './components/Header';

const citiesData = {
  world: worldCountryCapitals,
  us: usStateCapitals,
};

const INITIAL_GAME_MODE: GameMode = 'world';

function App() {
  const [currentGameMode, setCurrentGameMode] = useLocalStorage(
    'gameMode',
    INITIAL_GAME_MODE
  );
  const [currentCities, setCurrentCities] = useState<City[]>([]);
  const [cityTemperatures, setCityTemperatures] = useState<number[]>([]);
  const [selectedCity, setSelectedCity] = useState<City | null>(null);
  const [score, setScore] = useState<Score>({ correct: 0, incorrect: 0 });
  const isWaitingForPlayer = selectedCity === null;

  // Initiate game state on first render
  useEffect(() => {
    changeCities();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const changeCities = async () => {
    setSelectedCity(null);

    const currentCitiesData = citiesData[currentGameMode];
    const newCities = getTwoRandomCities(currentCitiesData);

    setCurrentCities(newCities);

    const newTemps = await Promise.all(
      newCities.map((city) => fetchTemperatureByCity(city))
    );

    setCityTemperatures(newTemps);
  };

  return (
    <div className="text-center">
      <Header />
      <main className="container d-flex flex-column gap-3 px-4">
        <GameModeSelector
          currentGameMode={currentGameMode}
          onGameModeChange={setCurrentGameMode}
        />
        <Game
          cities={currentCities}
          cityTemperatures={cityTemperatures}
          onChangeCities={changeCities}
          setScore={setScore}
          selectedCity={selectedCity}
          setSelectedCity={setSelectedCity}
        />
        <NextCitiesButton
          isWaitingForPlayer={isWaitingForPlayer}
          onClick={changeCities}
        />
        <ScoreStats score={score} />
      </main>
    </div>
  );
}

export default App;
