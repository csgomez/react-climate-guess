import { render, screen } from '@testing-library/react';
import CityCard from './CityCard';

describe('CityCard', () => {
  const mockCityProps = {
    city: {
      flag: '🇵🇪',
      coords: {
        lat: -12.05,
        long: -77.05,
      },
      location: 'Peru',
      name: 'Lima',
    },
    temperature: 65.7,
    onSelectCity: () => {
      return;
    },
    selectedCity: null,
    warmerCity: null,
  };

  it('renders its props correctly', () => {
    render(<CityCard {...mockCityProps} />);

    expect(screen.getByText(/Lima/)).toBeInTheDocument();
    expect(screen.getByText(/Peru/)).toBeInTheDocument();

    const chooseButton = screen.getByRole('button');
    expect(chooseButton).toBeInTheDocument();
  });
});
