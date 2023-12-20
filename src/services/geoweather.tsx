import axios from 'axios';
import { City } from '../types';

// Either a latitude or longittude value
type Coord = string | number;

interface WeatherResponse {
  current_weather: {
    interval: number;
    is_day: number;
    temperature: number;
    time: string; // iso8601
    weathercode: number;
    winddirection: number;
    windspeed: number; // kph
  };
  latitude: number;
  longitude: number;
  timezone: string;
  timezone_abbreviation: string;
  utc_offset_seconds: number;
}

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

export const fetchTemperatureByCity = async (city: City) => {
  const url = getWeatherUrl(city.coords.lat, city.coords.long);
  const response = await axios.get<WeatherResponse>(url);
  console.log(response.data);

  const { temperature } = response.data.current_weather;

  return temperature;
};
