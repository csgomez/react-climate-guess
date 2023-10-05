import { City } from './App';

// Returns a random integer between 0 and upperRange, inclusive
const randInt = (upperRange: number) => {
  return Math.floor(Math.random() * (upperRange + 1));
};

export const getTwoRandomCities = (citiesData: City[]) => {
  const len = citiesData.length - 1;

  const index1 = randInt(len);
  let index2 = randInt(len);

  while (index1 === index2) {
    index2 = randInt(len);
  }

  const city1 = citiesData[index1];
  const city2 = citiesData[index2];

  return [city1, city2];
};
