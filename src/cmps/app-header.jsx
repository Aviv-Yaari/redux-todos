import React, { Component } from 'react';
import { LinearProgress } from '@material-ui/core';
import '../css/app-header.css';
import { NavLink } from 'react-router-dom';

export class AppHeader extends Component {
  calcTodosCompleted = () => {
    const { todos } = this.props;
    if (!todos) return 0;
    const done = todos.filter(todo => todo.status === 'done').length;
    if (!done) return 0;
    return parseInt((done / todos.length) * 100);
  };

  render() {
    const { todos, user } = this.props;
    const completedPrc = this.calcTodosCompleted();
    return (
      <header className="app-header app-main">
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
