import { useCallback, useEffect, useState } from 'react';
import worldCountryCapitals from './data/world_country_capitals.json';
import usStateCapitals from './data/us_state_capitals.json';
import { getTwoRandomCities } from './utils';
import { fetchTemperatureByCity } from './services/geoweather';
import { GameMode, City } from './types';
import GameModeSelector from './components/GameModeSelector';
import CityCard from './components/CityCard';
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

  const switchGameMode = () => {
    setCurrentGameMode((prev) => (prev === 'world' ? 'us' : 'world'));
  };

  return (
    <div className="text-center">
      <header className="py-3">
        <h3 className="mb-0">Weather Game</h3>
      </header>
      <main className="container">
        <GameModeSelector
          currentGameMode={currentGameMode}
          onSwitchGameMode={switchGameMode}
        />
        <div className="d-flex flex-column flex-md-row justify-content-md-center">
          {currentCities.map((city, index) => (
            <CityCard
              key={index}
              city={city}
              temperature={temps[index]}
              onSelectCity={setSelectedCity}
              selectedCity={selectedCity}
              warmerCity={warmerCity}
            />
          ))}
        </div>
        <div className="d-grid col-8 col-md-4 mx-auto">
          <button
            className={`btn mt-4 my-2 ${
              isWaitingForPlayer ? 'btn-outline-primary' : 'btn-primary'
            }`}
            onClick={changeCurrentCities}
            disabled={isWaitingForPlayer}
          >
            Next Cities
          </button>
        </div>
      </main>
    </div>
  );
}

export default App;
