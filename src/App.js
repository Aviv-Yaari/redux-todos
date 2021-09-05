import { CircularProgress, Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { AppHeader } from './cmps/app-header';
import { TodoApp } from './pages/todo-app';
import { TodoDetails } from './pages/todo-details';
import { UserProfile } from './pages/user-profile';
import { loadUser } from './store/actions/user.actions';
import { hideUserMsg } from './store/actions/general.actions';

class _App extends Component {
  componentDidMount() {
    this.props.loadUser();
  }

  render() {
    if (!this.props.user) return <CircularProgress />;
    const { color, bgColor } = this.props.user.prefs;
    const { user, todos, userMsg } = this.props;
    return (
      <>
        <Router>
          <Snackbar
            open={userMsg.isOpen}
            autoHideDuration={6000}
            onClose={() => this.props.hideUserMsg()}>
            <MuiAlert
              elevation={6}
              variant="filled"
              onClose={() => this.props.hideUserMsg()}
              severity={userMsg.type}>
              {userMsg.msg}
            </MuiAlert>
          </Snackbar>
          <AppHeader user={user} todos={todos} />
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
  const { user } = state.userModule;
  const { todos } = state.todoModule;
  const { userMsg } = state.generalModule;
  return { user, todos, userMsg };
};

const mapDispatchToProps = {
  loadUser,
  hideUserMsg,
};

export const App = connect(mapStateToProps, mapDispatchToProps)(_App);
