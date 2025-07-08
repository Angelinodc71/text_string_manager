
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Home from './Home';

describe('Home component', () => {
  it('shows initial items and adds a new one through the modal', async () => {
    render(<Home />);
    expect(screen.getByText('Item 1')).not.toBeNull();
    expect(screen.getByText('Item 4')).not.toBeNull();

    await userEvent.click(screen.getByRole('button', { name: 'ADD' }));
    const input = screen.getByPlaceholderText('Type the text here...');
    await userEvent.type(input, 'New item');
    const addButtons = screen.getAllByText('ADD');
    const lastAddButton = addButtons[addButtons.length - 1];
    await userEvent.click(lastAddButton);

    expect(screen.getByText('New item')).not.toBeNull();
  });

  it('does not add an item when input is empty or whitespace', async () => {
    render(<Home />);

    await userEvent.click(screen.getByRole('button', { name: 'ADD' }));
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

  it('deletes all selected items and handles deletion with no selection', async () => {
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

  it('resets the list after an item was removed', async () => {
    render(<Home />);
    const item3 = screen.getByText('Item 3');
    await userEvent.dblClick(item3);
    expect(screen.queryByText('Item 3')).toBeNull();
    const reloadButtons = screen.getAllByRole('button');
    const reloadButton = reloadButtons[0];
    await userEvent.click(reloadButton);
    expect(screen.getByText('Item 3')).toBeDefined();
  });

  it('closes the modal when clicking outside of it', async () => {
    render(<Home />);
    await userEvent.click(screen.getByRole('button', { name: 'ADD' }));

    const dialog = document.querySelector('dialog')!;
    await userEvent.click(dialog);

    expect(screen.queryByPlaceholderText('Type the text here...')).not.toBeInTheDocument();
  });

  it('lets the user type text and cancels without adding', async () => {
    render(<Home />);
    const addButton = screen.getByRole('button', { name: 'ADD' });
    await userEvent.click(addButton);
  
    const input = screen.getByPlaceholderText('Type the text here...');
    await userEvent.type(input, 'New Item');
  
    const cancelButton = screen.getByText('CANCEL');
    await userEvent.click(cancelButton);
  
    expect(screen.queryByText('New Item')).not.toBeInTheDocument();
  });
});
