import { createStore } from 'redux';

const initialState = {
  todos: [],
  filter: { status: 'all', text: '' },
  user: null,
};

function myReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_TODOS':
      return { ...state, todos: action.todos };
    case 'ADD_TODO':
      return {
        ...state,
        todos: [action.todo, ...state.todos],
      };
    case 'REMOVE_TODO':
      return {
        ...state,
        todos: state.todos.filter(todo => todo._id !== action.id),
      };
    case 'UPDATE_TODO':
      // prettier-ignore
      const todos = state.todos.map(todo => todo._id === action.id ? {...todo, ...action.data} : todo)
      return { ...state, todos };
    // filter:
    case 'SET_FILTER':
      return { ...state, filter: action.filter };
    // user:
    case 'UPDATE_USER':
      return { ...state, user: action.user };
    case 'ADD_ACTIVITY':
      return {
        ...state,
        user: { ...state.user, activities: [action.activity, ...state.user.activities] },
      };
    default:
      return state;
  }
}

export const store = createStore(
  myReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
