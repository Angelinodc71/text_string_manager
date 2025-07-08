
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Button from './Button';

describe('Button component', () => {
  it('should render label, handles click, uses default role, and render icon', async () => {
    const handleClick = vi.fn();
    const icon = <svg data-testid="icon" />;

    render(<Button label="Click me" onClick={handleClick} variant="primary" icon={icon} type='submit'/>);

    const button = screen.getByRole('button');
    expect(button.textContent).toContain('Click me');

    await userEvent.click(button);
    expect(handleClick).toHaveBeenCalledOnce();
  });

  it('should apply outline variant and custom role when provided', () => {
    const handleClick = vi.fn();
    render(<Button label="Outline" onClick={handleClick} variant="outline" />);
    
    const button = screen.getByRole('button');
    expect(button.className).toEqual('button-outline');
  });

  it('should render icon only button correctly without label', () => {
    const handleClick = vi.fn();
    const icon = <svg data-testid="icon" />;

    render(<Button onClick={handleClick} variant="primary" icon={icon} />);
    const button = screen.getByRole('button');

    expect(button.textContent).toEqual('');
  });
});
