import { render, screen } from '@testing-library/react';
import App from './App';

describe('App component', () => {
  it('renders Home component', () => {
    render(<App />);
    expect(screen.getByText('This is a technical proof')).toBeVisible();
  });
});