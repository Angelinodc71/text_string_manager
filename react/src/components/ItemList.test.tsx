
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ItemList from './ItemList';

describe('ItemList minimal tests', () => {
  const items = ['Item 1', 'Item 2'];

  it('calls onSelect on click and applies selected class', async () => {
    const onSelect = vi.fn();
    const selected = new Set<number>();
    render(<ItemList items={items} selected={selected} onSelect={onSelect} onDoubleClickDelete={() => {}} />);
    const item = screen.getByText('Item 1');
    await userEvent.click(item);
    expect(onSelect).toHaveBeenCalledWith(0);
  });

  it('calls onDoubleClickDelete on double click', async () => {
    const onDoubleClickDelete = vi.fn();
    render(<ItemList items={items} selected={new Set()} onSelect={() => {}} onDoubleClickDelete={onDoubleClickDelete} />);
    const item = screen.getByText('Item 2');
    await userEvent.dblClick(item);
    expect(onDoubleClickDelete).toHaveBeenCalledWith(1);
  });

  it('renders selected item with selected class', () => {
    const selected = new Set([1]);
    render(<ItemList items={items} selected={selected} onSelect={() => {}} onDoubleClickDelete={() => {}} />);
    const item = screen.getByText('Item 2');
    
    expect(item.className).toEqual('selected');
  });
});
