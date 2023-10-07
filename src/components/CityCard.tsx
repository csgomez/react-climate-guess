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
      className={`cityCard d-flex flex-column justify-content-between align-items-center py-3 bg-secondary bg-gradient border border-2 rounded ${getBorderColor()}`}
    >
      <p>
        <span className="flagEmoji">{city.flag}</span>
        {city.name}, {city.location}
      </p>
      <p>
        <em>
          <b>{isWaitingForPlayer ? '' : `${temperature}°F`}</b>
        </em>
      </p>
      <div className="d-grid col-6 mx-auto">
        <button
          className="btn btn-dark"
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
