import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import CartItem from "./CartItem.js";
import classes from "./Cart.module.css";
import * as actions from "../../actions/actions";
const Cart = (props) => {
  let [show, setShow] = useState(false);

  return (
    <div>
      {props.cart.length > 0 ? (
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
        <h1 className={classes.empty}>
          Your cart is empty! Start adding products!
        </h1>
      )}
      {show ? (
        <div className={classes.orderForm}>
          <form>
            <input type="text" placeholder="Full name" />
            <input type="text" placeholder="Email" />
            <input type="text" placeholder="Address" />
            <p>Total to pay: ${props.cart
              .reduce((a, b) => {
                return a + b.totalPrice;
              }, 0)
              .toFixed(2)}</p>
            <button>Send order</button>
          </form>
        </div>
      ) : null}
      {props.cart.length > 0 && !show ? (
        <div className={classes.order}>
          <button
            onClick={() => {
              setShow(true);
              window.scrollTo(0, document.body.scrollHeight);
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
  };
};
export default connect(mapStateToProps, toActions)(Cart);
