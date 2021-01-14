import React from "react";
import { connect } from "react-redux";
import CartItem from "./CartItem.js";
const Cart = (props) => {
  return (
    <div>
      {props.cart ? (
        props.cart.map((item) => {
          console.log(typeof item);
          if (typeof item !== "number") {
            return (
              <CartItem
                info={item.info}
                count={item.count}
                totalPrice={item.price}
                image={item.image}
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
export default connect(mapStateToProps)(Cart);
