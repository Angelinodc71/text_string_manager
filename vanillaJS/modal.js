import { modal, modalInput } from './domRefs.js';
import { addItem } from './actions.js';

export function openModal() {
  modal.style.display = 'flex';
  modalInput.value = '';
  modalInput.focus();
}

export function closeModal() {
  modal.style.display = 'none';
}

export function handleAddItem() {
  addItem(modalInput.value);
}
