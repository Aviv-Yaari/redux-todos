import { CircularProgress } from '@material-ui/core';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { AppHeader } from './cmps/app-header';
import { TodoApp } from './pages/todo-app';
import { TodoDetails } from './pages/todo-details';
import { UserProfile } from './pages/user-profile';
import { userService } from './services/user.service';

class _App extends Component {
  componentDidMount() {
    this.loadUser();
  }

  loadUser = async () => {
    const user = await userService.getUser();
    this.props.dispatch({ type: 'UPDATE_USER', user });
  };

  render() {
    if (!this.props.user) return <CircularProgress />;
    const { color, bgColor } = this.props.user.prefs;
    return (
      <>
        <Router>
          <AppHeader />
          <main className="app-main" style={{ color, backgroundColor: bgColor }}>
            <Switch>
              <Route path="/todo/:id/edit" component={TodoDetails} />
              <Route path="/todo/:id" component={TodoDetails} />
              <Route path="/user" component={UserProfile} />
              <Route path="/" component={TodoApp} />
            </Switch>
          </main>
          <footer></footer>
        </Router>
      </>
    );
  }
}

const mapStateToProps = state => {
  const { user } = state;
  return { user };
};

export const App = connect(mapStateToProps)(_App);
