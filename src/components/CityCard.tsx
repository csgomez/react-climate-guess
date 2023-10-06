import { City } from '../types';

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
};

export default CityCard;
