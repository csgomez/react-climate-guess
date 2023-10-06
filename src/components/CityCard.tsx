import { City } from '../types';
// import styles from './CityCard.module.css';
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
  const hasTemperature = temperature !== undefined;
  const isSelectedCity = selectedCity === city;
  const isWarmerCity = warmerCity === city;
  const isWaitingForPlayer = selectedCity === null;

  const getBorderColor = () => {
    if (isWaitingForPlayer) {
      return 'black';
    }

    if (isSelectedCity) {
      return isWarmerCity ? 'success' : 'danger';
    } else {
      return 'black';
    }
  };

  return (
    <div
      className={`cityCard d-flex flex-column justify-content-between align-items-center py-3 border rounded border-${getBorderColor()}`}
    >
      <p>
        <span className="flagEmoji">{city.flag}</span>
        {city.name}, {city.location}
      </p>
      <p> {isWaitingForPlayer ? '' : `${temperature}°F`}</p>
      <div className="d-grid col-6 mx-auto">
        <button
          className={`btn ${
            isWaitingForPlayer ? 'btn-primary' : 'btn-outline-primary'
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
