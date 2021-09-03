import { storageService } from './storage.service';
import { v4 as uuidv4 } from 'uuid';
import _ from 'lodash';

export const todoService = { getTodos, create, remove, update };

let gTodos = _loadTodos() || [];

async function getTodos(filter) {
  const { status = 'all', text, id } = filter;
  const todos = _.cloneDeep(gTodos);
  return todos.filter(
    todo =>
      (status === 'all' || todo.status === status) &&
      (!text || todo.text.toLowerCase().includes(text.toLowerCase())) &&
      (!id || todo._id === id)
  );
}

async function create(todo) {
  const resTodo = _.cloneDeep(todo);
  resTodo._id = uuidv4();
  resTodo.status = 'active';
  gTodos.unshift(resTodo);
  _saveTodos();
  return resTodo;
}

async function remove(id) {
  const idx = gTodos.findIndex(todo => todo._id === id);
  gTodos.splice(idx, 1);
  _saveTodos();
  return gTodos;
}

async function update(id, data) {
  const idx = gTodos.findIndex(todo => todo._id === id);
  if (idx === -1) return null;
  gTodos[idx] = { ...gTodos[idx], ...data };
  _saveTodos();
  return gTodos;
}

function _loadTodos() {
  return storageService.loadFromStorage('todos');
}

function _saveTodos() {
  storageService.saveToStorage('todos', gTodos);
}
