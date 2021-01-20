let initialState = {
  currentUser: {},
  loggedIn: false,
  products: [],
  currentCart: [],
  currentWishList: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "SETCURRENTUSER":
      return {
        ...state,
        currentUser: action.payload,
        loggedIn: true,
      };
    case "SETPRODUCTS":
      return {
        ...state,
        products: action.payload,
      };
    case "ADDTOCART":
      return {
        ...state,
        currentCart: state.currentCart.concat(action.obj),
      };
    case "INCREASECOUNT":
      const id = action.payload.id;
      const incdec = action.payload.incdec;
      const index = state.currentCart.findIndex((x) => x.id === id);
      const count = state.currentCart[index].count;
      if (incdec === "increment") {
        return {
          ...state,
          currentCart: [
            ...state.currentCart,
            (state.currentCart[index].count += 1),
            (state.currentCart[index].totalPrice =
              state.currentCart[index].price * state.currentCart[index].count),
          ],
        };
      }
      if (incdec === "decrement" && count > 1) {
        return {
          ...state,
          currentCart: [
            ...state.currentCart,
            (state.currentCart[index].count -= 1),
            (state.currentCart[index].totalPrice =
              state.currentCart[index].price * state.currentCart[index].count),
          ],
        };
      }
    case "REMOVEITEM":
      const indx = state.currentCart.findIndex(
        (x) => x.id === action.payload.id
      );
      return {
        ...state,
        currentCart: state.currentCart.filter((_, index) => index !== indx),
      };
    case "CLEARCART":
      const filteredArr = state.currentCart.filter(
        (x) => typeof x !== "number"
      );
      return {
        ...state,
        currentCart: filteredArr,
      };
    case "TOTALCLEAR":
      return {
        ...state,
        currentCart: [],
      };
    case "TOWISH":
      return {
        ...state,
        currentWishList: state.currentWishList.concat(action.payload),
      };
    case "REMOVEWISH":
      const indx2 = state.currentWishList.findIndex(
        (x) => x.id === action.payload.id
      );
      return {
        ...state,
        currentWishList: state.currentWishList.filter(
          (_, index) => index !== indx2
        ),
      };
    default:
      return state;
  }
};

export default reducer;
