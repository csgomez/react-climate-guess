import axios from 'axios';
import { City } from '../App';

// Either a latitude or longittude value
type Coord = string | number;

const getLocationUrl = (locationName: string) =>
  `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
    locationName
  )}&format=json`;

const getWeatherUrl = (latitude: Coord, longitude: Coord) =>
  `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&temperature_unit=fahrenheit`;

export const fetchCoordinatesByLocationName = async (locationName: string) => {
  const url = getLocationUrl(locationName);
  const response = await axios.get(url);

  const { lat, lon, display_name } = response.data[0];
  const longName = display_name.split(',');
  const country = longName[longName.length - 1].trim();

  return { lat, lon, country };
};

export const fetchWeather = async (latitude: Coord, longitude: Coord) => {
  const url = getWeatherUrl(latitude, longitude);
  const response = await axios.get(url);
  console.log(response);

  const { temperature, time } = response.data.current_weather;

  return { temperature, time };
};

export const fetchTemperatureByCoordinates = async (
  latitude: Coord,
  longitude: Coord
) => {
  const url = getWeatherUrl(latitude, longitude);
  const response = await axios.get(url);
  console.log(response);

  const { temperature } = response.data.current_weather;

  return temperature;
};

export const fetchTemperatureByCity = async (city: City) => {
  const url = getWeatherUrl(city.coords.lat, city.coords.long);
  const response = await axios.get(url);
  console.log(response.data);

  const { temperature } = response.data.current_weather;

  return temperature;
};
