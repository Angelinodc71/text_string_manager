import React, { useState } from 'react';
import Header from '../components/Header';
import ItemList from '../components/ItemList';
import Modal from '../components/Modal';
import AddItemForm from '../components/AddItemForm';
import Button from '../components/Button';
import ReloadIcon from './../assets/refresh.svg?react';
import UndoIcon from './../assets/undo.svg?react';

const Home: React.FC = () => {
  const initialItems = ['Item 1', 'Item 2', 'Item 3', 'Item 4'];
  const [items, setItems] = useState<string[]>(initialItems);
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [history, setHistory] = useState<string[][]>([]);

  const addItem = (item: string) => {
    if (item.trim() === '') return;
    setHistory([...history, items]);
    setItems([...items, item]);
    setIsModalOpen(false);
  };

  const deleteItems = () => {
    if (selected.size === 0) return;
    setHistory([...history, items]);
    setItems(items.filter((_, i) => !selected.has(i)));
    setSelected(new Set());
  };

  const undo = () => {
    if (history.length === 0) return;
    const prev = history.pop()!;
    setItems(prev);
    setHistory([...history]);
  };

  const toggleSelect = (i: number) => {
    const newSet = new Set(selected);
    if (newSet.has(i)) newSet.delete(i);
    else newSet.add(i);
    setSelected(newSet);
  };

  const doubleClickDelete = (i: number) => {
    setHistory([...history, items]);
    setItems(items.filter((_, idx) => idx !== i));
    const newSet = new Set(selected);
    newSet.delete(i);
    setSelected(newSet);
  };

  const handleReset = () => {
    setItems(initialItems);
    setSelected(new Set());
    setHistory([]);
  };

  return (
    <main className="container">
      <Header />
      <ItemList
        items={items}
        selected={selected}
        onSelect={toggleSelect}
        onDoubleClickDelete={doubleClickDelete}
      />
      <div className="controls">
        <Button 
          icon={<ReloadIcon />}
          type="outline"
          onClick={handleReset}
        />
        <Button label="DELETE" type="outline" onClick={deleteItems} />
        <Button 
          icon={<UndoIcon />}
          label='UNDO'
          type="outline"
          onClick={undo}
        />
        <Button role="add" label="ADD" type="primary" onClick={() => setIsModalOpen(true)} />
      </div>
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <AddItemForm onAdd={addItem} onCancel={() => setIsModalOpen(false)} />
        </Modal>
      )}
    </main>
  );
};

export default Home;
