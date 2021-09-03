import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, TextField } from '@material-ui/core';
import { CircularProgress } from '@material-ui/core';
import { UserActivities } from '../cmps/user-activities';
import '../css/user-profile.css';

class _UserProfile extends Component {
  state = {
    formData: {
      fullName: this.props.user.fullName,
      color: this.props.user.prefs.color,
      bgColor: this.props.user.prefs.bgColor,
    },
  };

  handleChange = ev => {
    const { name, value } = ev.target;
    this.setState(prevState => ({ formData: { ...prevState.formData, [name]: value } }));
  };

  onFormSubmit = ev => {
    ev.preventDefault();
    let { fullName, color, bgColor } = this.state.formData;
    const prefs = { color, bgColor };
    this.props.dispatch({ type: 'UPDATE_USER', user: { ...this.props.user, fullName, prefs } });
  };

  render() {
    const { user } = this.props;
    const { formData } = this.state;
    if (!user) return <CircularProgress />;
    return (
      <main className="user-profile">
        <h1>User Profile - {user.fullName}</h1>
        <UserActivities activities={user.activities} />
        <form className="prefs" onSubmit={this.onFormSubmit}>
          <TextField
            name="fullName"
            label="Full Name"
            value={formData.fullName}
            onChange={this.handleChange}
            fullWidth
          />
          <label htmlFor="color">Preffered Color:</label>
          <input
            type="color"
            name="color"
            id="color"
            value={formData.color}
            onChange={this.handleChange}
          />
          <label htmlFor="color">Preffered Background Color:</label>
          <input
            type="color"
            name="bgColor"
            id="bgColor"
            value={formData.bgColor}
            onChange={this.handleChange}
          />
          <Button type="submit">Update Settings</Button>
        </form>
      </main>
    );
  }
}

const mapStateToProps = state => {
  const { todos, user } = state;
  return { todos, user };
};

export const UserProfile = connect(mapStateToProps)(_UserProfile);
