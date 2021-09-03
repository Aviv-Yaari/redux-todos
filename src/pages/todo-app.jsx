import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TodoAdd } from '../cmps/todo-add';
import { TodoFilter } from '../cmps/todo-filter';
import { TodoList } from '../cmps/todo-list';
import '../css/todo-app.css';
import { todoService } from '../services/todo.service';
import { userService } from '../services/user.service';

class _TodoApp extends Component {
  componentDidMount() {
    this.loadTodos();
  }

  loadTodos = async filter => {
    const todos = await todoService.getTodos(filter || this.props.filter);
    this.props.dispatch({ type: 'SET_TODOS', todos });
  };

  onAddTodo = async inputTodo => {
    const activity = { text: 'Added ' + inputTodo.text, at: Date.now() };
    const todo = await todoService.create(inputTodo);
    this.props.dispatch({ type: 'ADD_TODO', todo });
    this.props.dispatch({ type: 'ADD_ACTIVITY', activity });
    await userService.createActivity(activity);
  };

  onRemoveTodo = async todo => {
    const { _id } = todo;
    const activity = { text: 'Removed ' + todo.text, at: Date.now() };
    await todoService.remove(_id);
    this.props.dispatch({ type: 'REMOVE_TODO', id: _id });
    this.props.dispatch({ type: 'ADD_ACTIVITY', activity });
    await userService.createActivity(activity);
  };

  onToggleTodo = async todo => {
    const { _id } = todo;
    let status = 'done';
    if (todo.status === 'done') status = 'active';
    await todoService.update(_id, { status });
    this.props.dispatch({ type: 'UPDATE_TODO', id: _id, data: { status } });
    const activity = { text: 'Marked ' + todo.text + ' as ' + status, at: Date.now() };
    this.props.dispatch({ type: 'ADD_ACTIVITY', activity });
  };

  onTodoClick = id => {
    this.props.history.push('/todo/' + id);
  };

  //

  onSetFilter = filter => {
    this.props.dispatch({ type: 'SET_FILTER', filter });
    this.loadTodos(filter);
    // this.setState({ filter }, this.loadTodos);
  };

  render() {
    const { todos } = this.props;
    return (
      <main className="todo-app">
        <TodoAdd onAddTodo={this.onAddTodo} />
        <TodoFilter onSetFilter={this.onSetFilter} />
        <TodoList
          todos={todos}
          onRemoveTodo={this.onRemoveTodo}
          onToggleTodo={this.onToggleTodo}
          onTodoClick={this.onTodoClick}
        />
      </main>
    );
  }
}

const mapStateToProps = state => {
  const { todos, filter } = state;
  return { todos, filter };
};

export const TodoApp = connect(mapStateToProps)(_TodoApp);
