import {
  modalAddBtn,
  modalCancelBtn,
  openModalBtn,
  deleteBtn,
  undoBtn,
} from './domRefs.js';

import { handleAddItem, openModal, closeModal } from './modal.js';
import { deleteSelected, undo } from './actions.js';

export function setupEventListeners() {
  modalAddBtn.addEventListener('click', handleAddItem);
  modalCancelBtn.addEventListener('click', closeModal);
  openModalBtn.addEventListener('click', openModal);
  deleteBtn.addEventListener('click', deleteSelected);
  undoBtn.addEventListener('click', undo);
}