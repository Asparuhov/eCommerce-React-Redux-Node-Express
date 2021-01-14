import React from "react";
import classes from "./Product.module.css";

export default function Product(props) {
  return (
    <div className={classes.product}>
      <img className={classes.image} src={props.source} alt="default" />
      <p className={classes.info}>{props.info}</p>
      <p className={classes.price}>${props.price}</p>
      <button className={classes.button} onClick={props.added}>
        Add to cart
      </button>
    </div>
  );
}
