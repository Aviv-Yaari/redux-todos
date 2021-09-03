import { Button, CircularProgress, IconButton, TextField } from '@material-ui/core';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { todoService } from '../services/todo.service';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

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
    const todos = await todoService.getTodos({ id });
    this.props.dispatch({ type: 'SET_TODOS', todos });
  };

  onToggleTodo = async () => {
    const todo = this.props.todos[0];
    const { _id } = todo;
    let status = 'done';
    if (todo.status === 'done') status = 'active';
    await todoService.update(_id, { status });
    this.props.dispatch({ type: 'UPDATE_TODO', id: _id, data: { status } });
    const activity = { text: 'Marked ' + todo.text + ' as ' + status, at: Date.now() };
    this.props.dispatch({ type: 'ADD_ACTIVITY', activity });
  };

  handleChange = ev => {
    const { name, value } = ev.target;
    const { _id } = this.props.todos[0];
    this.props.dispatch({ type: 'UPDATE_TODO', id: _id, data: { [name]: value } });
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
                <IconButton onClick={this.onToggleTodo} aria-label="mark as done">
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
  const { todos } = state;
  return { todos };
};

export const TodoDetails = connect(mapStateToProps)(_TodoDetails);
