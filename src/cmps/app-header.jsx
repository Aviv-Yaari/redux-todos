import React, { Component } from 'react';
import { LinearProgress } from '@material-ui/core';
import '../css/app-header.css';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

class _AppHeader extends Component {
  calcTodosCompleted = todos => {
    const done = todos.filter(todo => todo.status === 'done').length;
    if (!done) return 0;
    return parseInt((done / todos.length) * 100);
  };

  render() {
    const { todos, user } = this.props;
    const completedPrc = this.calcTodosCompleted(todos);
    return (
      <header className="app-header">
        <NavLink className="logo" to="/">
          Todos
        </NavLink>
        <NavLink className="user" to="/user">
          {user.fullName}
        </NavLink>
        {
          <>
            <LinearProgress
              className="progress-bar"
              variant="determinate"
              value={completedPrc}
              color="secondary"
            />
            <div>{completedPrc}% Completed</div>
          </>
        }
      </header>
    );
  }
}

const mapStateToProps = state => {
  const { todos, user } = state;
  return { todos, user };
};

export const AppHeader = connect(mapStateToProps)(_AppHeader);
