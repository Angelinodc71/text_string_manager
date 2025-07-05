import React, { useState } from 'react';
import Button from './Button';

const AddItemForm: React.FC<{ onAdd: (item: string) => void; onCancel: () => void }> = ({ onAdd, onCancel }) => {
  const [text, setText] = useState('');

  return (
    <>
      <label id="itemInputLabel" htmlFor="itemInput">Add item to list</label>
      <input id="itemInput" type="text" value={text} onChange={e => setText(e.target.value)} placeholder="Type the text here..." />
      <div className="modal-buttons">
        <Button type='primary' onClick={() => onAdd(text)}>ADD</Button>
        <Button type='outline' onClick={onCancel}>CANCEL</Button>
      </div>
    </>
  );
};

export default AddItemForm;
