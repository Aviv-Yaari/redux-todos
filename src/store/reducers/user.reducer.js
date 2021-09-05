import _ from 'lodash';

const initialState = {
  user: null,
};

export function userReducer(state = initialState, action) {
  const stateCopy = _.cloneDeep(state);
  switch (action.type) {
    case 'UPDATE_USER':
      stateCopy.user = action.user;
      break;
    case 'ADD_ACTIVITY':
      stateCopy.user.activities.unshift(action.activity);
      break;
    default:
      break;
  }
  return stateCopy;
}
