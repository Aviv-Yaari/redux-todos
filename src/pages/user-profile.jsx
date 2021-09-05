import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, TextField } from '@material-ui/core';
import { CircularProgress } from '@material-ui/core';
import { UserActivities } from '../cmps/user-activities';
import { updateUser } from '../store/actions/user.actions';
import '../css/user-profile.css';
import { showUserMsg } from '../store/actions/general.actions';
import { userService } from '../services/user.service';

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

  onFormSubmit = async ev => {
    ev.preventDefault();
    let { fullName, color, bgColor } = this.state.formData;
    const prefs = { color, bgColor };
    await userService.updateUser(fullName, prefs);
    this.props.updateUser(this.props.user, fullName, prefs);
    this.props.showUserMsg('Updated profile');
  };

  render() {
    const { user } = this.props;
    const { formData } = this.state;
    if (!user) return <CircularProgress />;
    return (
      <main className="user-profile">
        <form className="prefs" onSubmit={this.onFormSubmit}>
          <h2>User Profile - {user.fullName}</h2>
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
        <UserActivities activities={user.activities} />
      </main>
    );
  }
}

const mapStateToProps = state => {
  const { user } = state.userModule;
  const { todos } = state.todoModule;
  return { todos, user };
};

const mapDispatchToProps = {
  updateUser,
  showUserMsg,
};

export const UserProfile = connect(mapStateToProps, mapDispatchToProps)(_UserProfile);
