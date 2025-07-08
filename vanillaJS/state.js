export let items = ['Item 1', 'Item 2', 'Item 3', 'Item 4'];
export let selectedIndices = new Set();
export let history = [];

export function saveHistory() {
  history.push({
    items: [...items],
    selected: [...selectedIndices],
  });
}

export function updateState(newItems, newSelected = new Set()) {
  items = newItems;
  selectedIndices = newSelected;
}
