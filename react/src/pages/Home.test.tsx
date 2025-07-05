
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Home from './Home';

describe('Home component', () => {
  it('shows initial items and adds a new one through the modal', async () => {
    render(<Home />);
    expect(screen.getByText('Item 1')).not.toBeNull();
    expect(screen.getByText('Item 4')).not.toBeNull();

    await userEvent.click(screen.getByRole('add'));
    const input = screen.getByPlaceholderText('Type the text here...');
    await userEvent.type(input, 'Nuevo ítem');
    const addButtons = screen.getAllByText('ADD');
    const lastAddButton = addButtons[addButtons.length - 1];
    await userEvent.click(lastAddButton);

    expect(screen.getByText('Nuevo ítem')).not.toBeNull();
  });

  it('shows initial items and try to add a new one in modal', async () => {
    render(<Home />);

    await userEvent.click(screen.getByRole('add'));
    const input = screen.getByPlaceholderText('Type the text here...');
    await userEvent.type(input, '   ');
    const addButtons = screen.getAllByText('ADD');
    const lastAddButton = addButtons[addButtons.length - 1];
    await userEvent.click(lastAddButton);

    expect(screen.queryByText('   ')).toBeNull();
  });

  it('selects and deletes an item', async () => {
    render(<Home />);
    const item = screen.getByText('Item 2');
    await userEvent.click(item);

    const deleteBtn = screen.getByText('DELETE');
    await userEvent.click(deleteBtn);

    expect(screen.queryByText('Item 2')).toBeNull();
  });

  it('selects all items, deletes all, then tries to delete again without selection', async () => {
    render(<Home />);
  
    const items = ['Item 1', 'Item 2', 'Item 3', 'Item 4'];
    for (const text of items) {
      const item = screen.getByText(text);
      await userEvent.click(item);
    }
  
    const deleteBtn = screen.getByText('DELETE');
    await userEvent.click(deleteBtn);
  
    for (const text of items) {
      expect(screen.queryByText(text)).toBeNull();
    }
      await userEvent.click(deleteBtn);
  
    for (const text of items) {
      expect(screen.queryByText(text)).toBeNull();
    }
  });

  it('undo restores the last deleted state', async () => {
    render(<Home />);
    const item = screen.getByText('Item 3');
    await userEvent.click(item);
    await userEvent.click(screen.getByText('DELETE'));

    expect(screen.queryByText('Item 3')).toBeNull();

    await userEvent.click(screen.getByText('UNDO'));
    expect(screen.getByText('Item 3')).not.toBeNull();
  });

  it('does nothing when undo is triggered with empty history', async () => {
    render(<Home />);
  
    expect(screen.getByText('Item 1')).toBeDefined();
  
    const undoBtn = screen.getByText('UNDO');
    await userEvent.click(undoBtn);
  
    expect(screen.getByText('Item 1')).toBeDefined();
    expect(screen.getByText('Item 4')).toBeDefined();
  });
  

  it('removes an item on double click', async () => {
    render(<Home />);
    const item2 = screen.getByText('Item 2');
    expect(item2).toBeDefined();
    await userEvent.dblClick(item2);
    expect(screen.queryByText('Item 2')).toBeNull();
  });

  it('resets the list when clicking the reload button', async () => {
    render(<Home />);
    const item3 = screen.getByText('Item 3');
    await userEvent.dblClick(item3);
    expect(screen.queryByText('Item 3')).toBeNull();
    const reloadButtons = screen.getAllByRole('button');
    const reloadButton = reloadButtons[0];
    await userEvent.click(reloadButton);
    expect(screen.getByText('Item 3')).toBeDefined();
  });

  it('lets the user type text and calls onAdd with it', async () => {
    render(<Home />);
    const addButtons = screen.getByRole('add');
    await userEvent.click(addButtons);

    const input = screen.getByPlaceholderText('Type the text here...');
    await userEvent.type(input, 'New Item');

    const addButtons2 = screen.getAllByText('ADD');
    const lastAddButton2 = addButtons2[addButtons2.length - 1];
    await userEvent.click(lastAddButton2);

    expect(screen.getByText('New Item')).toBeDefined();
  });

  it('lets the user type text and calls onAdd with it', async () => {
    render(<Home />);
    const addButton = screen.getByRole('add');
    await userEvent.click(addButton);
  
    const input = screen.getByPlaceholderText('Type the text here...');
    await userEvent.type(input, 'New Item');
  
    const cancelButton = screen.getByText('CANCEL');
    await userEvent.click(cancelButton);
  
    expect(screen.queryByText('New Item')).toBeNull();
  });

  it('lets the user click outside the modal', async () => {
    render(<Home />);
    const addButton = screen.getByRole('add');
    await userEvent.click(addButton);
  
    expect(screen.getByPlaceholderText('Type the text here...'));
  
    await userEvent.click(screen.getByRole('main'));
  
    expect(screen.queryByPlaceholderText('Type the text here...')).toBeNull();
  });
});
