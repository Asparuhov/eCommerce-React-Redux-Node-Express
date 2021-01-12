let initialState = {
  items: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
      case "ADDITEM":
      return {
        items: state.items.concat(action.payload),
      };
    default:
      return state;
  }
};

export default reducer;
