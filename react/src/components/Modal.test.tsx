import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import Modal from './Modal';

describe('Modal component', () => {
  it('should render component', async () => {
    const onClose = vi.fn();

    render(<Modal onClose={onClose} ><p>test</p></Modal>);
    
    const children = screen.getByText(/test/i);

    expect(children).toBeInTheDocument();
  });
  it('calls onClose when clicking outside the modal content', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();

    render(
      <div data-testid="outside">
        <Modal onClose={onClose}>
          <p>Modal Content</p>
        </Modal>
      </div>
    );

    await user.click(screen.getByTestId('outside'));

    expect(onClose).toHaveBeenCalled();
  });
});