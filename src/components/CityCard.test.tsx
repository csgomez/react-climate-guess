import { render, screen } from '@testing-library/react';
import CityCard from './CityCard';

describe('CityCard', () => {
  const mockCity = {
    flag: '🇵🇪',
    coords: {
      lat: -12.05,
      long: -77.05,
    },
    location: 'Peru',
    name: 'Lima',
  };

  const mockCityIndex = 0;
  const mockTemperature = 65.7;
  const mockOnSelectCity = vi.fn();
  const mockSelectedCity = null;
  const mockWarmerCity = null;

  it('renders its props correctly', () => {
    render(
      <CityCard
        city={mockCity}
        cityIndex={mockCityIndex}
        temperature={mockTemperature}
        onSelectCity={mockOnSelectCity}
        selectedCity={mockSelectedCity}
        warmerCity={mockWarmerCity}
      />
    );

    expect(screen.getByText(/Lima/)).toBeInTheDocument();
    expect(screen.getByText(/Peru/)).toBeInTheDocument();

    const chooseButton = screen.getByRole('button');
    expect(chooseButton).toBeInTheDocument();
  });
});
