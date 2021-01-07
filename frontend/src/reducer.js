const initialState = {
  currentUser: ''
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SETUSER':
      return {
        ...state,
        currentUser: action.user
      }
    default:
      return state;
  }
};

export default reducer;
