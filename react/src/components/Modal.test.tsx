import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import Modal from './Modal';

describe('Modal component', () => {
  it('should render component', async () => {
    const onClose = vi.fn();

    render(<Modal onClose={onClose} ><p>test</p></Modal>);
    
    const children = screen.getAllByText(/test/i);

    expect(children).toBeTruthy();
  });
});