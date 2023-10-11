import { City } from '../types';
import './CityCard.css';

interface CityCardProps {
  city: City;
  temperature: number;
  onSelectCity: (city: City) => void;
  selectedCity: City | null;
  warmerCity: City | null;
}

const CityCard = ({
  city,
  temperature,
  onSelectCity,
  selectedCity,
  warmerCity,
}: CityCardProps) => {
  const isSelectedCity = selectedCity === city;
  const isWarmerCity = warmerCity === city;
  const isWaitingForPlayer = selectedCity === null;

  // values defined in the css file
  const getBorderColor = () => {
    if (isWaitingForPlayer) {
      return 'default';
    }

    if (isSelectedCity) {
      return isWarmerCity ? 'correct' : 'incorrect';
    } else {
      return 'default';
    }
  };

  return (
    <div
      className={`cityCard shadow d-flex flex-column justify-content-between align-items-center py-3 bg-light-subtle border border-1 rounded ${getBorderColor()}`}
    >
      <p data-testid="city-details">
        <span className="flagEmoji me-1">{city.flag}</span>
        {city.name}, {city.location}
      </p>
      <p>
        <em>
          <b>{isWaitingForPlayer ? '' : `${temperature}°F`}</b>
        </em>
      </p>
      <div className="d-grid col-6 mx-auto">
        <button
          className={`shadow-sm btn ${
            isWaitingForPlayer ? 'btn-dark' : 'btn-outline-dark'
          }`}
          onClick={() => onSelectCity(city)}
          disabled={selectedCity !== null}
        >
          Choose
        </button>
      </div>
    </div>
  );
};

export default CityCard;
