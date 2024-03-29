//actions
const ADDITEM = "ADDITEM";
const SETCURRENTUSER = "SETCURRENTUSER";
const SETPRODUCTS = "SETPRODUCTS";
const INCREASECOUNT = "INCREASECOUNT";
const REMOVEITEM = "REMOVEITEM";
const CLEARCART = "CLEARCART";
const TOTALCLEAR = "TOTALCLEAR";
const TOWISH = "TOWISH";
const REMOVEWISH = "REMOVEWISH";

//actionCreators
export const addItem = (payload) => ({ type: ADDITEM, payload: payload });
export const setProducts = (payload) => ({
  type: SETPRODUCTS,
  payload: payload,
});
export const setCurrentUser = (payload) => ({ type: SETCURRENTUSER, payload });
export const increaseCount = (payload) => ({
  type: INCREASECOUNT,
  payload: payload,
});
export const removeItem = (payload) => ({ type: REMOVEITEM, payload });
export const clearCart = () => ({ type: CLEARCART });

export const cartClearing = () => {
  return (dispatch) => {
    dispatch(clearCart());
  };
};

export const totalClear = () => ({ type: TOTALCLEAR });
export const toWish = (payload) => ({ type: TOWISH, payload });
export const removeWish = (payload) => ({ type: REMOVEWISH, payload });
