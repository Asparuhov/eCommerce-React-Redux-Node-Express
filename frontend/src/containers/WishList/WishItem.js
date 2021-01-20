import React from "react";
import classes from "./WishItem.module.css";
export default function WishItem(props) {
  return (
    <div className={classes.WishItem}>
      <div className={classes.x} onClick={props.remove}></div>
      <img className={classes.image} src={props.source} alt="default" />
      <p className={classes.info}>{props.info}</p>
      <p className={classes.price}>${props.price}</p>
      <button className={classes.button} onClick={props.added}>
        Add to cart
      </button>
    </div>
  );
}
