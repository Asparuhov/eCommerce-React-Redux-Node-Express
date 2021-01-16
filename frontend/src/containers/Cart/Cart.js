import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import CartItem from "./CartItem.js";
import classes from "./Cart.module.css";
import * as actions from "../../actions/actions";
const Cart = (props) => {
  let [show, setShow] = useState(false);
  let [accountShow, setAccountShow] = useState(false);
  return (
    <div>
      {accountShow ? (
        <div>
          <h1
            style={{ textAlign: "center", marginTop: "15px" }}
            className={classes.accepted}
          >
            Order accepted, check your account tab! Clearing cart...
          </h1>
        </div>
      ) : null}
      {props.cart.length > 0 && !accountShow
        ? props.cart.map((item) => {
            if (typeof item !== "number") {
              return (
                <CartItem
                  info={item.info}
                  count={item.count}
                  totalPrice={item.totalPrice.toFixed(2)}
                  image={item.image}
                  key={item.id}
                  increment={() => {
                    props.increaseCount(item.id, "increment");
                    props.clearCart();
                  }}
                  decrement={() => {
                    props.increaseCount(item.id, "decrement");
                    props.clearCart();
                  }}
                  remove={() => props.removeItem(item.id)}
                />
              );
            }
          })
        : null}
      {props.cart.length === 0 && !accountShow ? (
        <h1 className={classes.empty}>Your cart is empty, add some items!</h1>
      ) : null}
      {show ? (
        <div className={classes.orderForm}>
          <div className={classes.form}>
            <input type="text" placeholder="Full name" />
            <input type="text" placeholder="Email" />
            <input type="text" placeholder="Address" />
            <p>
              Total to pay: $
              {props.cart
                .reduce((a, b) => {
                  return a + b.totalPrice;
                }, 0)
                .toFixed(2)}
            </p>
            <button
              onClick={() => {
                setAccountShow(true);
                setShow(false);
                props.totalClear();
                setTimeout(() => {
                  setAccountShow(false);
                }, 6000);
              }}
            >
              Send order
            </button>
          </div>
        </div>
      ) : null}
      {props.cart.length > 0 && !show && !accountShow ? (
        <div className={classes.order}>
          <button
            onClick={() => {
              setShow(true);
            }}
          >
            Order now
          </button>
          <p>
            total price: $
            {props.cart
              .reduce((a, b) => {
                return a + b.totalPrice;
              }, 0)
              .toFixed(2)}
          </p>
        </div>
      ) : null}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    cart: state.currentCart,
  };
};
const toActions = (dispatch) => {
  return {
    increaseCount: (id, IncDec) =>
      dispatch(actions.increaseCount({ id: id, incdec: IncDec })),
    removeItem: (id) => dispatch(actions.removeItem({ id: id })),
    clearCart: () => dispatch(actions.cartClearing()),
    totalClear: () => dispatch(actions.totalClear()),
  };
};
export default connect(mapStateToProps, toActions)(Cart);
