const initialState = {
  user: null,
};

export function userReducer(state = initialState, action) {
  switch (action.type) {
    case 'UPDATE_USER':
      return { ...state, user: action.user };
    case 'ADD_ACTIVITY':
      return {
        ...state,
        user: { ...state.user, activities: [action.activity, ...state.user.activities] },
      };
    default:
      return state;
  }
}
