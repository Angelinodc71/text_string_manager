import { list } from './domRefs.js';
import { items, selectedIndices } from './state.js';
import { toggleSelect, handleDoubleClick } from './actions.js';

export function renderList() {
  list.innerHTML = '';
  items.forEach((text, index) => {
    const li = document.createElement('li');
    li.textContent = text;
    li.setAttribute('role', 'option');
    if (selectedIndices.has(index)) {
      li.classList.add('selected');
    }
    li.addEventListener('click', () => toggleSelect(index));
    li.addEventListener('dblclick', () => handleDoubleClick(index));
    list.appendChild(li);
  });
}
