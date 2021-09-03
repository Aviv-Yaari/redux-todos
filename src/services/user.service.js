import { storageService } from './storage.service';

export const userService = { getUser, createActivity };

let gUser = _loadUser() || {
  fullName: 'Puki Ben David',
  activities: [{ text: 'Added a Todo', at: 1523873242735 }],
  prefs: { color: '#000000', bgColor: '#ffffff' },
};

async function getUser() {
  return gUser;
}

async function createActivity(activity) {
  gUser.activities.unshift(activity);
  _saveUser();
}

function _loadUser() {
  return storageService.loadFromStorage('user');
}

function _saveUser() {
  storageService.saveToStorage('user', gUser);
}
