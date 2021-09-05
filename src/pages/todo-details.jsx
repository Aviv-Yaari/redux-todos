import { Button, CircularProgress, IconButton, TextField } from '@material-ui/core';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { loadTodos, updateTodo } from '../store/actions/todo.actions';
import { addActivity } from '../store/actions/user.actions';

class _TodoDetails extends Component {
  state = { isEditMode: false };

  componentDidMount() {
    this.loadTodo();
    this.loadEditMode();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.match.path !== this.props.match.path) this.loadEditMode();
  }

  loadEditMode = () => {
    const isEditMode = this.props.match.path.split('/')[3] === 'edit';
    this.setState({ isEditMode });
  };

  loadTodo = async () => {
    const { id } = this.props.match.params;
    this.props.loadTodos(id);
  };

  onToggleTodo = async todo => {
    let status = todo.status === 'done' ? 'active' : 'done';
    this.props.updateTodo(todo, { status });
    this.props.addActivity('Updated', todo);
  };

  handleChange = ev => {
    const { name, value } = ev.target;
    const todo = this.props.todos[0];
    this.props.updateTodo(todo, { [name]: value });
  };

  render() {
    if (!this.props.todos || !this.props.todos.length) return <CircularProgress />;
    const todo = this.props.todos[0];
    const { text, status, _id } = todo;
    const { isEditMode } = this.state;
    return (
      <main className="todo-details" style={{ padding: '0 8px', maxWidth: '300px' }}>
        {!isEditMode && (
          <>
            <h1>{text}</h1>
            <h2>
              <span>Status: {status} </span>
              <CheckCircleIcon style={{ color: status === 'done' ? 'green' : 'unset' }} />
            </h2>
            <Link to={`/todo/${_id}/edit`}>
              <Button>Edit</Button>
            </Link>
            <Link to="/todo">
              <Button>Back</Button>
            </Link>
          </>
        )}

        {isEditMode && (
          <>
            <div>
              <div>
                <TextField
                  name="text"
                  label="Todo"
                  value={text}
                  onChange={this.handleChange}
                  fullWidth
                />
              </div>
              <div>
                <label>Status:</label>
                <IconButton onClick={() => this.onToggleTodo(todo)} aria-label="mark as done">
                  <CheckCircleIcon style={{ color: status === 'done' ? 'green' : 'unset' }} />
                </IconButton>
              </div>
            </div>
            <Link to={`/todo/${_id}`}>
              <Button>Back</Button>
            </Link>
          </>
        )}
      </main>
    );
  }
}

const mapStateToProps = state => {
  const { todos } = state.todoModule;
  return { todos };
};

const mapDispatchToProps = {
  loadTodos,
  addActivity,
  updateTodo,
};

export const TodoDetails = connect(mapStateToProps, mapDispatchToProps)(_TodoDetails);
