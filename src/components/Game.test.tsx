import { fireEvent, render } from '@testing-library/react';
import Game from './Game';
import { City } from '../types';
import { useState } from 'react';

const LIMA_PERU: City = {
  flag: '🇵🇪',
  coords: {
    lat: -12.05,
    long: -77.05,
  },
  location: 'Peru',
  name: 'Lima',
};

const PARIS_FRANCE: City = {
  flag: '🇫🇷',
  coords: {
    lat: 48.87,
    long: 2.33,
  },
  location: 'France',
  name: 'Paris',
};

describe('Game', () => {
  it('renders', () => {
    const mockCities = [LIMA_PERU, PARIS_FRANCE];
    const mockTemperatures = [88.0, 65.0];
    const mockChangeCities = vi.fn();
    const mockSetScore = vi.fn();

    const GameWrapper = () => {
      const [selectedCity, setSelectedCity] = useState<City | null>(null);
      return (
        <Game
          cities={mockCities}
          cityTemperatures={mockTemperatures}
          selectedCity={selectedCity}
          setSelectedCity={setSelectedCity}
          changeCities={mockChangeCities}
          setScore={mockSetScore}
        />
      );
    };

    render(<GameWrapper />);
  });

  it("correctly adds the 'correct' and 'incorrect' classes", async () => {
    const mockCities = [LIMA_PERU, PARIS_FRANCE];
    const mockTemperatures = [88.0, 65.0];
    const mockChangeCities = vi.fn();
    const mockSetScore = vi.fn();

    const GameWrapper = () => {
      const [selectedCity, setSelectedCity] = useState<City | null>(null);
      return (
        <Game
          cities={mockCities}
          cityTemperatures={mockTemperatures}
          selectedCity={selectedCity}
          setSelectedCity={setSelectedCity}
          changeCities={mockChangeCities}
          setScore={mockSetScore}
        />
      );
    };

    const component = render(<GameWrapper />);

    const firstCity = await component.findByTestId('city-1');
    const firstCityButton = await component.findByTestId('city-1-button');

    const secondCity = await component.findByTestId('city-2');
    const secondCityButton = await component.findByTestId('city-2-button');

    /* Click on Lima and ensure it gets the 'correct' class */
    fireEvent.click(firstCityButton);
    expect(firstCity).toHaveClass('correct');
    expect(firstCity).not.toHaveClass('default');

    /* Paris should not have 'correct' or 'incorrect' -- only 'default' */
    expect(secondCity).not.toHaveClass('correct incorrect');
    expect(secondCity).toHaveClass('default');

    /* RESET */

    /* Clicking the 'Next' button resets the state by removing 'correct' class */
    fireEvent.click(await component.findByTestId('next-button'));
    expect(firstCity).not.toHaveClass('correct');

    /* Click on Paris and ensure it gets the 'incorrect' class*/
    fireEvent.click(secondCityButton);
    expect(secondCity).toHaveClass('incorrect');

    /* Lima should not have 'correct' or 'incorrect' -- only 'default' */
    expect(firstCity).not.toHaveClass('correct incorrect');
    expect(firstCity).toHaveClass('default');
  });
});
