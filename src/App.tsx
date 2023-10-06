import { useCallback, useEffect, useState } from 'react';
import worldCountryCapitals from './data/world_country_capitals.json';
import usStateCapitals from './data/us_state_capitals.json';
import { getTwoRandomCities } from './utils';
import { fetchTemperatureByCity } from './services/geoweather';
import { GameMode, City } from './types';
import GameModeSelector from './components/GameModeSelector';
import CityCard from './components/CityCard';
import './App.css';

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
    <>
      <header>
        <h3>
          Weather Game <small>or something like that</small>
        </h3>
      </header>
      <GameModeSelector
        currentGameMode={currentGameMode}
        onSwitchGameMode={switchGameMode}
      />
      <main>
        <div className="capital-choices">
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
        <button onClick={changeCurrentCities}>New Cities</button>
      </main>
    </>
  );
}

export default App;
