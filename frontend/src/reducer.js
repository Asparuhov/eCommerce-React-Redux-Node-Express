import axios from "axios";

let initialState = {
  currentUser: {},
  loggedIn: false,
  products: [],
  currentCart: [],
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
    case "ADDTOCART":
      return {
        ...state,
        currentCart: state.currentCart.concat(action.obj),
      };
    case "INCREASECOUNT":
      const index = state.currentCart.findIndex((x) => x.id === action.id);
      const count = state.currentCart[index].count;
      if (action.incdec === "increment") {
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
      if (action.incdec === "decrement" && count > 1) {
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
    default:
      return state;
  }
};

export default reducer;

/* export const saveToDB = () => async (dispatch, getState) => {
  const cart = getState.cart;
  const currentUser = getState.currentUser;
  await axios
    .post("http://localhost:4000/cart", {
      cart: cart,
      email: currentUser.email,
    })
    .then(() => console.log("Updated cart"))
    .catch((err) => console.log(err));
};
export const loadToStore = () => async (dispatch, getState) => {
  let cart;
  await axios
    .get("http://localhost:4000/cart")
    .then((res) => (cart = res.data))
    .catch((err) => console.log(err));
  dispatch({ type: "SETCART", cart: cart });
};
 */
