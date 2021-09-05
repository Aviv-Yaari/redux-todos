export const initialState = {
  todos: null,
  filter: { status: 'all', text: '' },
};

export function todoReducer(state = initialState, action) {
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
    default:
      return state;
  }
}
