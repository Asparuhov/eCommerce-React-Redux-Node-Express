import React, { useEffect } from "react";
import { connect } from "react-redux";
import CartItem from "./CartItem.js";
import classes from './Cart.module.css';
import * as actions from "../../actions/actions";
const Cart = (props) => {
  return (
    <div>
      {props.cart ? (
        props.cart.map((item) => {
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
      ) : (
        <h1 style={{ margin: "0 auto", marginTop: "30px" }}>
          Start adding items to your cart!
        </h1>
      )}
      {props.cart.length > 0 ? (
        <div className={classes.order}>
          <button>Order now!</button>
          <p>
            total price: $
            {props.cart.reduce((a, b) => {
              return a + b.totalPrice;
            }, 0)}
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
  };
};
export default connect(mapStateToProps, toActions)(Cart);
