import { useCallback, useEffect, useState } from 'react';
import worldCountryCapitals from './data/world_country_capitals.json';
import usStateCapitals from './data/us_state_capitals.json';
import { getTwoRandomCities } from './utils';
import { fetchTemperatureByCity } from './services/geoweather';
import { GameMode, City, Score } from './types';
import GameModeSelector from './components/GameModeSelector';
import CityCard from './components/CityCard';
import ScoreStats from './components/ScoreStats';
// import './App.css';

const citiesData = {
  world: worldCountryCapitals,
  us: usStateCapitals,
};

function App() {
  const [currentGameMode, setCurrentGameMode] = useState<GameMode>('world');
  const [currentCities, setCurrentCities] = useState<City[]>([]);
  const [temps, setTemps] = useState<number[]>([]);
  const [selectedCity, setSelectedCity] = useState<City | null>(null);
  const [score, setScore] = useState<Score>({ correct: 0, incorrect: 0 });
  const warmerCity = getWarmerCity();
  const isWaitingForPlayer = selectedCity === null;

  function getWarmerCity() {
    if (temps.length !== 2) return null;

    return temps[0] > temps[1] ? currentCities[0] : currentCities[1];
  }

  // When the user presses the 'New Cities' button
  const changeCurrentCities = useCallback(() => {
    setSelectedCity(null);

    const currentCitiesData = citiesData[currentGameMode];
    const newCities = getTwoRandomCities(currentCitiesData);

    setCurrentCities(newCities);
  }, [currentGameMode]);

  // After the initial render and whenver the GameMode changes
  useEffect(() => {
    changeCurrentCities();
  }, [currentGameMode, changeCurrentCities]);

  // Whenever the cities are changed, fetch their live temperatures
  useEffect(() => {
    if (currentCities.length === 0) return;

    const fetchTemps = async () => {
      const newTemps = await Promise.all(
        currentCities.map((city) => fetchTemperatureByCity(city))
      );
      setTemps(newTemps);
    };

    fetchTemps();
  }, [currentCities]);

  // When the WORLD/USA button group is changed
  const handleGameModeChange = (newGameMode: GameMode) => {
    setCurrentGameMode(newGameMode);
  };

  // When the user chooses a city. Increment appropriate score.
  const handleSelectCity = (city: City) => {
    setSelectedCity(city);

    const isPlayerCorrect = city === warmerCity;

    if (isPlayerCorrect) {
      setScore((prev) => ({ ...prev, correct: prev.correct + 1 }));
    } else {
      setScore((prev) => ({ ...prev, incorrect: prev.incorrect + 1 }));
    }
  };

  return (
    <div className="text-center">
      <header className="py-3">
        <h3 className="mb-0">Weather Game</h3>
      </header>
      <main className="container px-4">
        <GameModeSelector
          currentGameMode={currentGameMode}
          onGameModeChange={handleGameModeChange}
        />
        <div className="d-flex flex-column flex-md-row justify-content-md-center">
          {currentCities.map((city, index) => (
            <CityCard
              key={index}
              city={city}
              temperature={temps[index]}
              onSelectCity={handleSelectCity}
              selectedCity={selectedCity}
              warmerCity={warmerCity}
            />
          ))}
        </div>
        <div className="d-grid col-12 col-md-4 mx-auto">
          <button
            className={`btn mt-4 my-2 ${
              isWaitingForPlayer
                ? 'btn-outline-light opacity-25'
                : 'btn-light opacity-75'
            }`}
            onClick={changeCurrentCities}
            disabled={isWaitingForPlayer}
          >
            Next Cities
          </button>
        </div>
        <ScoreStats score={score} />
      </main>
    </div>
  );
}

export default App;
