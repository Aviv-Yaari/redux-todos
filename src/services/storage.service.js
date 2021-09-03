export const storageService = { loadFromStorage, saveToStorage };

function loadFromStorage(key) {
  const data = localStorage.getItem(key);
  if (data) return JSON.parse(data);
  return null;
}

function saveToStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
