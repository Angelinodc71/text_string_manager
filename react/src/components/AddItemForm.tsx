import React, { useRef } from 'react';
import Button from './Button';

const AddItemForm: React.FC<{ onAdd: (item: string) => void; onCancel: () => void }> = ({ onAdd, onCancel }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const value = inputRef.current?.value;
    if (value) onAdd(value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label id="itemInputLabel" htmlFor="itemInput">Add item to list</label>
      <input
        id="itemInput"
        type="text"
        ref={inputRef}
        placeholder="Type the text here..."
      />
      <div className="modal-buttons">
        <Button type='submit' variant='primary'>ADD</Button>
        <Button type='reset' variant='outline' onClick={onCancel}>CANCEL</Button>
      </div>
    </form>
  );
};

export default AddItemForm;
