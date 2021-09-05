export const showUserMsg = msg => {
  return dispatch => {
    dispatch({ type: 'SHOW_USER_MSG', msg });
  };
};

export const hideUserMsg = () => {
  return dispatch => {
    dispatch({ type: 'HIDE_USER_MSG' });
  };
};
