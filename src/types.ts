export type GameMode = 'world' | 'us';

export type City = {
  name: string; // name of the city
  location: string; // country or state of city
  coords: {
    lat: number;
    long: number;
  };
  flag?: string; // emoji flag
  temp?: number; // in fahrenheit
};
