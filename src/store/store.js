import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { generalReducer } from './reducers/general.reducer';
import { todoReducer } from './reducers/todo.reducer';
import { userReducer } from './reducers/user.reducer';

const rootReducer = combineReducers({
  todoModule: todoReducer,
  userModule: userReducer,
  generalModule: generalReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));
