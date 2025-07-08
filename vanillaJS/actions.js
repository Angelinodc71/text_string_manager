import { items, selectedIndices, history, saveHistory, updateState } from './state.js';
import { renderList } from './list.js';
import { closeModal } from './modal.js';

export function toggleSelect(index) {
  if (selectedIndices.has(index)) {
    selectedIndices.delete(index);
  } else {
    selectedIndices.add(index);
  }
  renderList();
}

export function handleDoubleClick(index) {
  saveHistory();
  items.splice(index, 1);
  updateState([...items], new Set([...selectedIndices].filter(i => i !== index)));
  renderList();
}

export function addItem(text) {
  if (!text.trim()) return;
  saveHistory();
  items.push(text);
  renderList();
  closeModal();
}

export function deleteSelected() {
  if (selectedIndices.size === 0) return;
  saveHistory();
  const newItems = items.filter((_, i) => !selectedIndices.has(i));
  updateState(newItems);
  renderList();
}

export function undo() {
  if (history.length === 0) return;
  const previous = history.pop();
  updateState([...previous.items], new Set(previous.selected));
  renderList();
}
