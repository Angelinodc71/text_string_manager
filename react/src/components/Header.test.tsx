
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Header from './Header';

describe('Header component', () => {
  it('renders the heading and paragraph text', () => {
    render(<Header />);

    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).not.toBeNull();
    expect(heading.textContent).toEqual('This is a technical proof');

    const paragraph = screen.getByText(/Lorem ipsum/);
    expect(paragraph).not.toBeNull();
  });
});
