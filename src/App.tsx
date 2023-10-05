import { useEffect, useState, memo } from 'react';
import worldCountryCapitals from './data/world_country_capitals.json';
import usStateCapitals from './data/us_state_capitals.json';
import { getTwoRandomCities } from './utils';
import { fetchTemperatureByCity } from './services/geoweather';
import './App.css';

type GameMode = 'world' | 'us';

export type City = {
  name: string; // name of the city
  location: string; // country or state of city
  coords: {
    lat: number;
    long: number;
  };
  flag?: string; // emoji flag
  temp?: number; // in fahrenheit
};

const citiesData = {
  world: worldCountryCapitals,
  us: usStateCapitals,
};

function App() {
  const [gameMode, setGameMode] = useState<GameMode>('world');
  const [cities, setCities] = useState<City[]>([]);
  const [temps, setTemps] = useState<number[]>([]);
  const [selectedCity, setSelectedCity] = useState<City | null>(null);
  const warmerCity = getWarmerCity();

  function getWarmerCity() {
    if (temps.length !== 2) return null;

    // 'temps' and 'cities' indexes are one to one
    return temps[0] > temps[1] ? cities[0] : cities[1];
  }

  // When the user presses the 'New Cities' button
  const changeCurrentCities = () => {
    setSelectedCity(null);

    const currentCitiesData = citiesData[gameMode];
    const newCities = getTwoRandomCities(currentCitiesData);

    setCities(newCities);
  };

  useEffect(() => {
    const currentCitiesData = citiesData[gameMode];
    const newCities = getTwoRandomCities(currentCitiesData);

    setCities(newCities);
  }, [gameMode]);

  useEffect(() => {
    const fetchTemps = async () => {
      const newTemps = await Promise.all(
        cities.map((city) => fetchTemperatureByCity(city))
      );
      setTemps(newTemps);
    };

    fetchTemps();
  }, [cities]);

  const switchGameMode = () => {
    setGameMode((prev) => (prev === 'world' ? 'us' : 'world'));
  };

  const selectCity = (city: City) => {
    setSelectedCity(city);
  };

  return (
    <>
      <header>
        <h3>
          Weather Game <small>or something like that</small>
        </h3>
      </header>
      <GameModeSelector
        currentGameMode={gameMode}
        switchGameMode={switchGameMode}
      />
      <main>
        <div className="capital-choices">
          {cities.map((city, index) => (
            <CityCard
              key={index}
              city={city}
              temperature={temps[index]}
              onSelectCity={selectCity}
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

interface CityCardProps {
  city: City;
  temperature: number;
  onSelectCity: (city: City) => void;
  selectedCity: City | null;
  warmerCity: City | null;
}

const CityCard = memo(
  ({
    city,
    temperature,
    onSelectCity,
    selectedCity,
    warmerCity,
  }: CityCardProps) => {
    const hasTemperature = temperature !== undefined;
    const isSelectedCity = selectedCity === city;
    const isWarmerCity = warmerCity === city;

    const onSelectionMadeElement = (
      <>
        <p>{isSelectedCity ? 'SELECTED' : 'NOT SELECTED'}</p>
        <p>{isWarmerCity ? 'WARMER' : 'colder'}</p>
      </>
    );

    return (
      <div className="capital">
        <p>
          {Boolean(city.flag) && city.flag} {city.name}, {city.location}
        </p>
        <p> {hasTemperature && `${temperature}°F`}</p>
        {selectedCity !== null && onSelectionMadeElement}
        <button onClick={() => onSelectCity(city)}>Choose</button>
      </div>
    );
  }
);

interface GameModeSelectorProps {
  currentGameMode: GameMode;
  switchGameMode: () => void;
}

const GameModeSelector = ({
  currentGameMode,
  switchGameMode,
}: GameModeSelectorProps) => {
  const nextGameMode = currentGameMode === 'world' ? 'us' : 'world';
  return (
    <div>
      Current Mode: {currentGameMode}
      <button style={{ marginLeft: '1rem' }} onClick={switchGameMode}>
        Switch to {nextGameMode}
      </button>
    </div>
  );
};

export default App;
