let initialState = {
  currentUser: {},
  loggedIn: false,
  products: [],
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
        loggedIn: true,
      };
    case "SETPRODUCTS":
      return {
        ...state,
        products: action.products,
      };
    default:
      return state;
  }
};

export default reducer;
