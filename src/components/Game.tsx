import { City, Score } from '../types';
import CityCard from './CityCard';
import NextCitiesButton from './NextCitiesButton';
import { getWarmerCity } from '../lib/utils';

interface GameProps {
  cities: City[];
  cityTemperatures: number[];
  selectedCity: City | null;
  setSelectedCity: (city: City | null) => void;
  changeCities: () => Promise<void>;
  setScore: React.Dispatch<React.SetStateAction<Score>>;
}

function Game({
  cities,
  cityTemperatures,
  selectedCity,
  setSelectedCity,
  changeCities,
  setScore,
}: GameProps) {
  const isWaitingForPlayer = selectedCity === null;
  const warmerCity = getWarmerCity(cities, cityTemperatures);

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

  const handleNextButtonClick = async () => {
    setSelectedCity(null);
    await changeCities();
  };

  return (
    <>
      <div className="d-flex flex-column flex-md-row justify-content-md-center">
        {cities.map((city, index) => (
          <CityCard
            key={index}
            city={city}
            cityIndex={index}
            temperature={cityTemperatures[index]}
            onSelectCity={handleSelectCity}
            selectedCity={selectedCity}
            warmerCity={warmerCity}
          />
        ))}
      </div>
      <NextCitiesButton
        isWaitingForPlayer={isWaitingForPlayer}
        onClick={handleNextButtonClick}
      />
    </>
  );
}

export default Game;
