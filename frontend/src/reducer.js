let initialState = {
  currentUser: {},
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
      };
    default:
      return state;
  }
};

export default reducer;
