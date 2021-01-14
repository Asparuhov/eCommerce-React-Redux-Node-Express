import React from "react";
import classes from "./CartItem.module.css";
export default function CartItem(props) {
  return (
    <div className={classes.CartItem}>
      <img src={props.image} alt="error" />
      <div className={classes.about}>
        <p>{props.info}</p>
        <p style={{ color: "green" }}>In Stock</p>
      </div>
      <div className={classes.count}>
        <button onClick={props.decrement}>-</button> <p>{props.count} </p>
        <button onClick={props.increment}>+</button>
      </div>
      <div className={classes.price}>
        <p style={{ marginBottom: "1px" }}>total price:</p>
        <p style={{ marginTop: "1px" }}>${props.totalPrice}</p>
      </div>
    </div>
  );
}
