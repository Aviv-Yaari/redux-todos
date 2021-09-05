import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TodoAdd } from '../cmps/todo-add';
import { TodoFilter } from '../cmps/todo-filter';
import { TodoList } from '../cmps/todo-list';
import '../css/todo-app.css';
import {
  loadTodos,
  addTodo,
  removeTodo,
  updateTodo,
  setFilter,
} from '../store/actions/todo.actions';
import { addActivity } from '../store/actions/user.actions';
import { showUserMsg } from '../store/actions/general.actions';

class _TodoApp extends Component {
  async componentDidMount() {
    await new Promise(resolve => setTimeout(resolve, 500));
    this.props.loadTodos();
  }

  onAddTodo = async todo => {
    this.props.addTodo(todo);
    this.props.addActivity('Added', todo);
    this.props.toggleUserMsg('Todo added');
  };

  onRemoveTodo = async todo => {
    this.props.removeTodo(todo);
    this.props.addActivity('Removed', todo);
    this.props.toggleUserMsg('Todo removed');
  };

  onToggleTodo = async todo => {
    let status = todo.status === 'done' ? 'active' : 'done';
    this.props.updateTodo(todo, { status });
    this.props.addActivity('Updated', todo);
    this.props.toggleUserMsg('Todo marked as ' + status);
  };

  onTodoClick = id => {
    this.props.history.push('/todo/' + id);
  };

  onSetFilter = filter => {
    this.props.setFilter();
    this.props.loadTodos(filter);
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
  const { todos, filter } = state.todoModule;
  return { todos, filter };
};

const mapDispatchToProps = {
  loadTodos,
  addTodo,
  removeTodo,
  addActivity,
  updateTodo,
  setFilter,
  toggleUserMsg: showUserMsg,
};

export const TodoApp = connect(mapStateToProps, mapDispatchToProps)(_TodoApp);
