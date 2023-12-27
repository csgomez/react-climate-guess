import { City, Score } from '../types';
import CityCard from './CityCard';

interface GameProps {
  cities: City[];
  cityTemperatures: number[];
  onChangeCities: () => void;
  setScore: React.Dispatch<React.SetStateAction<Score>>;
  selectedCity: City | null;
  setSelectedCity: React.Dispatch<React.SetStateAction<City | null>>;
}

function Game({
  cities,
  cityTemperatures,
  setScore,
  selectedCity,
  setSelectedCity,
}: GameProps) {
  const warmerCity = getWarmerCity();

  function getWarmerCity() {
    if (cityTemperatures.length !== 2) return null;

    return cityTemperatures[0] > cityTemperatures[1] ? cities[0] : cities[1];
  }

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
    <div className="d-flex flex-column flex-md-row justify-content-md-center">
      {cities.map((city, index) => (
        <CityCard
          key={index}
          city={city}
          temperature={cityTemperatures[index]}
          onSelectCity={handleSelectCity}
          selectedCity={selectedCity}
          warmerCity={warmerCity}
        />
      ))}
    </div>
  );
}

export default Game;
