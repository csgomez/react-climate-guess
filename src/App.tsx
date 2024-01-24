import { useEffect, useState } from 'react';
import worldCountryCapitals from './data/world_country_capitals.json';
import usStateCapitals from './data/us_state_capitals.json';
import { getTwoRandomCities } from './lib/utils';
import { fetchTemperatureByCity } from './services/geoweather';
import { GameMode, City, Score } from './types';
import useLocalStorage from './hooks/useLocalStorage';
import Game from './components/Game';
import GameModeSelector from './components/GameModeSelector';
import ScoreStats from './components/ScoreStats';
import Header from './components/Header';
import Footer from './components/Footer';
// import GamePrompt from './components/GamePrompt';

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
  const [selectedCity, setSelectedCity] = useState<City | null>(null);
  const [currentCities, setCurrentCities] = useState<City[]>([]);
  const [cityTemperatures, setCityTemperatures] = useState<number[]>([]);
  const [score, setScore] = useState<Score>({ correct: 0, incorrect: 0 });

  // Initiate game state on first render
  useEffect(() => {
    changeCities();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const changeCities = async () => {
    const currentCitiesData = citiesData[currentGameMode];
    const newCities = getTwoRandomCities(currentCitiesData);

    setCurrentCities(newCities);

    const newTemps = await Promise.all(
      newCities.map((city) => fetchTemperatureByCity(city))
    );

    setCityTemperatures(newTemps);
  };

  const changeGameMode = async (newGameMode: GameMode) => {
    setCurrentGameMode(newGameMode);

    // Only update the cities if the user hasn't chosen a city yet
    if (!selectedCity) {
      await changeCities();
    }
  };

  return (
    <div className="vh-100 text-center d-flex flex-column">
      <Header />
      <main className="container d-flex flex-column flex-grow-1 gap-3 px-4">
        <section className="d-flex flex-column flex-sm-row justify-content-center align-items-center gap-3 gap-sm-4 mb-2">
          <GameModeSelector
            currentGameMode={currentGameMode}
            onGameModeChange={changeGameMode}
          />
          <ScoreStats score={score} />
        </section>
        {/* <GamePrompt /> */}
        <Game
          cities={currentCities}
          cityTemperatures={cityTemperatures}
          selectedCity={selectedCity}
          setSelectedCity={setSelectedCity}
          changeCities={changeCities}
          setScore={setScore}
        />
        <Footer />
      </main>
    </div>
  );
}

export default App;
