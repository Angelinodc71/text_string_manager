const list = document.getElementById('textList');
const modal = document.getElementById('modal');
const modalInput = document.getElementById('modalInput');
const modalAddBtn = document.getElementById('modalAddBtn');
const modalCancelBtn = document.getElementById('modalCancelBtn');
const openModalBtn = document.getElementById('openModalBtn');
const deleteBtn = document.getElementById('deleteBtn');
const undoBtn = document.getElementById('undoBtn');

let history = [];

const initialItems = ['Item 1', 'Item 2', 'Item 3', 'Item 4'];
let selectedIndices = new Set();

// === Render List ===
function renderList(items) {
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

// === Item Interaction ===
function toggleSelect(index) {
  if (selectedIndices.has(index)) {
    selectedIndices.delete(index);
  } else {
    selectedIndices.add(index);
  }
  renderList(items);
}

function handleDoubleClick(index) {
  saveHistory();
  items.splice(index, 1);
  selectedIndices = new Set([...selectedIndices].filter(i => i !== index));
  renderList(items);
}

// === Modal Functions ===
function openModal() {
  modal.style.display = 'flex';
  modalInput.value = '';
  modalInput.focus();
}

function closeModal() {
  modal.style.display = 'none';
}

function addItem(text) {
  if (!text.trim()) return;
  saveHistory();
  items.push(text);
  renderList(items);
  closeModal();
}

// === Undo and Delete ===
function deleteSelected() {
  if (selectedIndices.size === 0) return;
  saveHistory();
  items = items.filter((_, i) => !selectedIndices.has(i));
  selectedIndices.clear();
  renderList(items);
}

function undo() {
  if (history.length === 0) return;
  const previous = history.pop();
  items = [...previous.items];
  selectedIndices = new Set(previous.selected);
  renderList(items);
}

function saveHistory() {
  history.push({
    items: [...items],
    selected: [...selectedIndices],
  });
}

// === Events ===
modalAddBtn.addEventListener('click', () => addItem(modalInput.value));
modalCancelBtn.addEventListener('click', closeModal);
openModalBtn.addEventListener('click', openModal);
deleteBtn.addEventListener('click', deleteSelected);
undoBtn.addEventListener('click', undo);

// === Init ===
let items = [...initialItems];
renderList(items);
saveHistory();
