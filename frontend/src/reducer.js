

let initialState = {
  currentUser: {},
  loggedIn: false,
  products: [],
  currentCart: [],
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
    default:
      return state;
  }
};

export default reducer;

/* export const loadToStore = () => async (dispatch, getState) => {
  let cart;
  await axios
    .get("http://localhost:4000/cart")
    .then((res) => (cart = res.data))
    .catch((err) => console.log(err));
  dispatch({ type: "SETCART", cart: cart });
};
 
 */
