import React, { Component } from 'react';
import { Button, TextField } from '@material-ui/core';
import '../css/todo-add.css';

export class TodoAdd extends Component {
  state = { todo: { text: '' } };

  handleChange = ev => {
    const { name, value } = ev.target;
    this.setState(prevState => ({ todo: { ...prevState.todo, [name]: value } }));
  };

  onAddTodo = async ev => {
    ev.preventDefault();
    await this.props.onAddTodo(this.state.todo);
    this.setState({ todo: { text: '' } });
  };

  render() {
    const { text } = this.state.todo;
    return (
      <section className="todo-add">
        <h2>Add Todo!</h2>
        <form onSubmit={this.onAddTodo}>
          <TextField
            name="text"
            onChange={this.handleChange}
            value={text}
            placeholder="Type your task here"
          />
          <Button type="submit">Add</Button>
        </form>
      </section>
    );
  }
}
