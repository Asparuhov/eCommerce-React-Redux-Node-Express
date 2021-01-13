let initialState = {
  currentUser: {},
  loggedIn: false,
  items: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADDITEM":
      return {
        items: state.items.concat(action.payload),
      };
    case "SETCURRENTUSER":
      return {
        ...state,
        currentUser: action.user,
        loggedIn: true
      };
    default:
      return state;
  }
};

export default reducer;
