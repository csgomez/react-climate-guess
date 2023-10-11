import { render, screen } from '@testing-library/react';
import { City } from '../types';
import CityCard from './CityCard';

describe('CityCard', () => {
  it('renders its props correctly', () => {
    /* Create mock props for CityCard component */
    const mockCity: City = {
      flag: '🇵🇪',
      coords: {
        lat: -12.05,
        long: -77.05,
      },
      location: 'Peru',
      name: 'Lima',
    };

    const mockTemp = 60.5;

    const mockOnSelectCity = (city: City) => {
      console.log('Current city:', city.name);
    };

    const mockSelectedCity = null;

    const mockWarmerCity = null;

    const mockProps = {
      city: mockCity,
      temperature: mockTemp,
      onSelectCity: mockOnSelectCity,
      selectedCity: mockSelectedCity,
      warmerCity: mockWarmerCity,
    };

    /* Rendering and testing state */
    render(<CityCard {...mockProps} />);

    expect(screen.getByText(/Lima/)).toBeInTheDocument();
    expect(screen.getByText);
  });
});
