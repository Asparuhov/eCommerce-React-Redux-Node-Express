import axios from "axios";
//actions
export const ADDITEM = "ADDITEM";
export const SETCURRENTUSER = "SETCURRENTUSER";
export const SETPRODUCTS = "SETPRODUCTS";
export const ADDTOCART = "ADDTOCART";
export const INCREASECOUNT = "INCREASECOUNT";
export const REMOVEITEM = "REMOVEITEM";
export const SAVETODB = "SAVETODB";
export const CLEARCART = "CLEARCART";

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
