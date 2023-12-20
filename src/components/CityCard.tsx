import { City } from '../types';
// import './CityCard.css';

interface CityCardProps {
  city: City;
  temperature: number;
  onSelectCity: (city: City) => void;
  selectedCity: City | null;
  warmerCity: City | null;
}

const getBorderColor = (
  isWaitingForPlayer: boolean,
  isSelectedCity: boolean,
  isWarmerCity: boolean
) => {
  if (isWaitingForPlayer) {
    return 'default';
  }

  if (isSelectedCity) {
    return isWarmerCity ? 'correct' : 'incorrect';
  } else {
    return 'default';
  }
};

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
  const borderColor = getBorderColor(
    isWaitingForPlayer,
    isSelectedCity,
    isWarmerCity
  );

  return (
    // <div
    //   className={`cityCard shadow d-flex flex-column justify-content-between align-items-center py-3 bg-light-subtle border border-1 rounded ${borderColor}`}
    // >
    <div
      className={`h-48 md:w-[370px] shadow-xl flex flex-col justify-between items-center py-5 bg-gray-700 border rounded-md ${borderColor}`}
    >
      <p data-testid="city-details">
        <span className="font-emoji me-2">{city.flag}</span>
        {city.name}, {city.location}
      </p>
      <p>
        <em>
          <b>{isWaitingForPlayer ? '' : `${temperature}°F`}</b>
        </em>
      </p>
      <div className="d-grid col-6 mx-auto">
        {/* <button
          className={`shadow-sm btn ${
            isWaitingForPlayer ? 'btn-dark' : 'btn-outline-dark'
          }`} */}
        <button
          className="py-1 px-10 rounded-md enabled:shadow-lg enabled:bg-gray-800 disabled:outline disabled:outline-1 disabled:opacity-50 hover:enabled:bg-slate-200 hover:enabled:text-black transition duration-100 ease-in-out"
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
