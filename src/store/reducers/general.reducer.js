import _ from 'lodash';

const initialState = {
  userMsg: { isOpen: false, type: 'success', msg: '' },
};

export function generalReducer(state = initialState, action) {
  const stateCopy = _.cloneDeep(state);
  switch (action.type) {
    case 'SHOW_USER_MSG':
      stateCopy.userMsg.isOpen = true;
      stateCopy.userMsg.msg = action.msg || state.userMsg;
      break;
    case 'HIDE_USER_MSG':
      stateCopy.userMsg.isOpen = false;
      break;
    default:
      break;
  }
  return stateCopy;
}
