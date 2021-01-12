import classes from "./AddItem.module.css";
import React from "react";

export default function AddItem(props) {
  return (
    <div className={classes.form}>
      <input placeholder="Image URL" type="text" />
      <input placeholder="Price" type="text" />
      <input placeholder="Info" type="text" />
      <button className={classes.button}>Add Product</button>
    </div>
  );
}
