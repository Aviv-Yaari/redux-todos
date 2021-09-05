import _ from 'lodash';

export const initialState = {
  todos: null,
  filter: { status: 'all', text: '' },
};

export function todoReducer(state = initialState, action) {
  const stateCopy = _.cloneDeep(state);
  let idx;
  switch (action.type) {
    case 'SET_TODOS':
      stateCopy.todos = action.todos;
      break;
    case 'ADD_TODO':
      stateCopy.todos.push(action.todo);
      break;
    case 'REMOVE_TODO':
      idx = stateCopy.todos.findIndex(todo => todo._id === action.id);
      if (idx !== -1) stateCopy.todos.splice(idx, 1);
      break;
    case 'UPDATE_TODO':
      idx = stateCopy.todos.findIndex(todo => todo._id === action.id);
      if (idx !== -1) stateCopy.todos[idx] = { ...stateCopy.todos[idx], ...action.data };
      break;
    case 'SET_FILTER':
      stateCopy.filter = action.filter;
      break;
    default:
      break;
  }
  return stateCopy;
}
