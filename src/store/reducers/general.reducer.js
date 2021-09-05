const initialState = {
  userMsg: { isOpen: false, type: 'success', msg: '' },
};

export function generalReducer(state = initialState, action) {
  switch (action.type) {
    case 'SHOW_USER_MSG':
      return {
        ...state,
        userMsg: { ...state.userMsg, isOpen: true, msg: action.msg || state.userMsg.msg },
      };
    case 'HIDE_USER_MSG':
      return {
        ...state,
        userMsg: { ...state.userMsg, isOpen: false },
      };
    default:
      return state;
  }
}
