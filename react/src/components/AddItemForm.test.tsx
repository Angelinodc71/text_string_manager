
import { describe, it, expect, vi } from 'vitest';
import { render, screen  } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AddItemForm from './AddItemForm';

describe('AddItemForm component', () => {
  const onAdd = vi.fn();
  const onCancel = vi.fn();
  
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('lets the user type text and calls onAdd with it', async () => {
    render(<AddItemForm onAdd={onAdd} onCancel={onCancel} />);

    const input = screen.getByPlaceholderText('Type the text here...');
    await userEvent.type(input, 'New Item');
    expect(input).toHaveValue('New Item');

    const addButton = screen.getByText('ADD');
    await userEvent.click(addButton);

    expect(onAdd).toHaveBeenCalledWith('New Item');
  });

  it('calls onCancel when CANCEL is clicked', async () => {
    render(<AddItemForm onAdd={onAdd} onCancel={onCancel} />);

    const cancelButton = screen.getByText('CANCEL');
    await userEvent.click(cancelButton);

    expect(onCancel).toHaveBeenCalledOnce();
  });


  it('does not call onAdd if input is empty', async () => {
    render(<AddItemForm onAdd={onAdd} onCancel={onCancel} />);
    const addButton = screen.getByText('ADD');
    await userEvent.click(addButton);

    expect(onAdd).not.toHaveBeenCalled();
  });

  it('calls onAdd when user presses Enter', async () => {
    render(<AddItemForm onAdd={onAdd} onCancel={onCancel} />);

    const input = screen.getByPlaceholderText('Type the text here...');

    await userEvent.type(input, 'Item with enter{enter}');

    expect(onAdd).toHaveBeenCalledWith('Item with enter');
  });
});
