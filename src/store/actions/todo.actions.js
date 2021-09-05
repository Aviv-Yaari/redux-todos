import { todoService } from '../../services/todo.service';
import { initialState } from '../reducers/todo.reducer';

export const loadTodos = (filter = initialState.filter) => {
  return async dispatch => {
    const todos = await todoService.getTodos(filter);
    dispatch({ type: 'SET_TODOS', todos });
  };
};

export const addTodo = inputTodo => {
  return async dispatch => {
    const todo = await todoService.create(inputTodo);
    dispatch({ type: 'ADD_TODO', todo });
  };
};

export const removeTodo = todo => {
  return async dispatch => {
    await todoService.remove(todo._id);
    dispatch({ type: 'REMOVE_TODO', id: todo._id });
  };
};

export const updateTodo = (todo, data) => {
  return async dispatch => {
    await todoService.update(todo._id, data);
    dispatch({ type: 'UPDATE_TODO', id: todo._id, data });
  };
};

export const setFilter = filter => {
  return dispatch => {
    dispatch({ type: 'SET_FILTER', filter });
  };
};
