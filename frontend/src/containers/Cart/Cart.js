import React from "react";
import { connect } from "react-redux";
import CartItem from "./CartItem.js";
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
                increment={() => props.increaseCount(item.id, "increment")}
                decrement={() => props.increaseCount(item.id, "decrement")}
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
      dispatch({ type: "INCREASECOUNT", id: id, incdec: IncDec }),
    removeItem: (id) => dispatch({ type: "REMOVEITEM", id: id }),
  };
};
export default connect(mapStateToProps, toActions)(Cart);
