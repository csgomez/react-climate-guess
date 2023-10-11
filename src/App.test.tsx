import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
  it('renders the app with two initial cities', () => {
    render(<App />);

    const cityDetails = screen.getAllByTestId('city-details');
    expect(cityDetails).toHaveLength(2);

    cityDetails.forEach((element) => {
      expect(element.textContent).not.toBe('');
    });
  });

  it('has the Next Cities button disabled', () => {
    render(<App />);

    const button = screen.getByText('Next Cities');
    expect(button).toBeInTheDocument();
    expect(button).toBeDisabled();
  });

  it('allows you to choose a city', () => {
    render(<App />);

    const chooseButtons = screen.getAllByText('Choose');
    const firstCityButton = chooseButtons[0];

    fireEvent.click(firstCityButton);
  });
});
