import React, { Component } from 'react';
import { Button, InputBase } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import '../css/todo-filter.css';

export class TodoFilter extends Component {
  state = { filter: { text: '', status: 'all' } };

  handleChange = ev => {
    const { name, value } = ev.currentTarget;
    this.setState(
      prevState => ({ filter: { ...prevState.filter, [name]: value } }),
      () => this.props.onSetFilter(this.state.filter)
    );
  };

  render() {
    const { text, status } = this.state.filter;
    return (
      <section className="todo-filter">
        <Button
          name="status"
          value="all"
          onClick={this.handleChange}
          color={status === 'all' ? 'secondary' : 'default'}>
          All
        </Button>
        <Button
          name="status"
          value="active"
          onClick={this.handleChange}
          color={status === 'active' ? 'secondary' : 'default'}>
          Active
        </Button>
        <Button
          name="status"
          value="done"
          onClick={this.handleChange}
          color={status === 'done' ? 'secondary' : 'default'}>
          Done
        </Button>
        <div className="search">
          <SearchIcon />
          <InputBase
            onChange={this.handleChange}
            placeholder="Search…"
            name="text"
            value={text}
            fullWidth
          />
        </div>
      </section>
    );
  }
}
