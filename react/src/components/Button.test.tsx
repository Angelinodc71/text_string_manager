
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Button from './Button';

describe('Button component', () => {
  it('should render label, handles click, uses default role, and render icon', async () => {
    const handleClick = vi.fn();
    const icon = <svg data-testid="icon" />;

    render(<Button label="Click me" onClick={handleClick} type="primary" icon={icon} />);

    const button = screen.getByRole('button');
    expect(button.textContent).toContain('Click me');
    expect(button.className).toBe('button-primary');
    expect(screen.getByTestId('icon')).not.toBeNull();

    await userEvent.click(button);
    expect(handleClick).toHaveBeenCalledOnce();
  });

  it('should apply outline variant and custom role when provided', () => {
    const handleClick = vi.fn();
    render(<Button label="Outline" onClick={handleClick} type="outline" role="menuitem" />);
    
    const button = screen.getByRole('menuitem');
    expect(button.className).toBe('button-outline');
    expect(button.textContent).toBe('Outline');
  });

  it('should render icon only button correctly without label', () => {
    const handleClick = vi.fn();
    const icon = <svg data-testid="icon" />;

    render(<Button onClick={handleClick} type="primary" icon={icon} />);
    const button = screen.getByRole('button');

    expect(button.textContent).toBe('');
    expect(screen.getByTestId('icon')).not.toBeNull();
  });
});
