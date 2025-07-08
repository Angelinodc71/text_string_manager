import { renderList } from './list.js';
import { saveHistory } from './state.js';
import { setupEventListeners } from './events.js';

renderList();
saveHistory();
setupEventListeners();