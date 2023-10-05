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
  const [currentGameMode, setGameMode] = useState<GameMode>('world');
  const [currentCities, setCurrentCities] = useState<City[]>([]);
  const [cityTemps, setCityTemps] = useState<number[]>([]);
  const [selectedCity, setSelectedCity] = useState<City | null>(null);

  const changeCurrentCities = () => {
    const currentCitiesData = citiesData[currentGameMode];
    const newCities = getTwoRandomCities(currentCitiesData);

    setCurrentCities(newCities);
    fetchCityTemps(newCities);
  };

  const _changeCurrentCities = (nextGameMode: GameMode) => {
    const currentCitiesData = citiesData[nextGameMode];
    const newCities = getTwoRandomCities(currentCitiesData);

    setCurrentCities(newCities);
    fetchCityTemps(newCities);
  };

  // useEffect(() => {
  //   const currentCitiesData = citiesData[currentGameMode];
  //   const newCities = getTwoRandomCities(currentCitiesData);

  //   setCurrentCities(newCities);
  //   fetchCityTemps(newCities);
  // }, [currentGameMode]);

  const fetchCityTemps = async (cities: City[]) => {
    const newTemps = await Promise.all(
      cities.map((city) => fetchTemperatureByCity(city))
    );
    setCityTemps(newTemps);
  };

  // useEffect(() => {
  //   const fetchTemps = async () => {
  //     const newTemps = await Promise.all(
  //       currentCities.map((city) => fetchTemperatureByCity(city))
  //     );
  //     setCityTemps(newTemps);
  //   };

  //   fetchTemps();
  // }, [currentCities]);

  const switchGameMode = () => {
    const nextGameMode = currentGameMode === 'world' ? 'us' : 'world';
    setGameMode(nextGameMode);
    _changeCurrentCities(nextGameMode);
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
        currentGameMode={currentGameMode}
        switchGameMode={switchGameMode}
      />
      <main>
        <div className="capital-choices">
          {currentCities.map((city, index) => (
            <CityCard
              key={index}
              city={city}
              temperature={cityTemps[index]}
              selectCity={selectCity}
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
  selectCity: (city: City) => void;
}

const CityCard = memo(({ city, temperature, selectCity }: CityCardProps) => {
  const hasTemperature = temperature !== undefined;
  useEffect(() => {}, [city]);
  // console.log('current temp:', temp);
  return (
    <div className="capital">
      <p>
        {Boolean(city.flag) && city.flag} {city.name}, {city.location},{' '}
      </p>
      <p> {hasTemperature && `${temperature}°F`}</p>
      <button onClick={() => selectCity(city)}>Choose</button>
    </div>
  );
});

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
