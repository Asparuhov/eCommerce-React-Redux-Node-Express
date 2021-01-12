import classes from "./AddItem.module.css";
import React, { useState } from "react";
import { connect } from "react-redux";
const AddItem = (props) => {
  let [info, setInfo] = useState({
    img: "",
    price: "",
    info: "",
  });

  return (
    <div className={classes.form}>
      <input
        placeholder="Image URL"
        type="text"
        onChange={(e) => setInfo({ ...info, img: e.target.value })}
      />
      <input
        placeholder="Price"
        type="text"
        onChange={(e) => setInfo({ ...info, price: e.target.value })}
      />
      <input
        placeholder="Info"
        type="text"
        onChange={(e) => setInfo({ ...info, info: e.target.value })}
      />
      <button
        className={classes.button}
        onClick={() => props.addItem(info.img, info.price, info.info)}
      >
        Add Product
      </button>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    items: state.items,
  };
};

const toAction = (dispatch) => {
  return {
    addItem: (img, price, info) =>
      dispatch({
        type: "ADDITEM",
        payload: { img: img, price: price, info: info },
      }),
  };
};
export default connect(mapStateToProps, toAction)(AddItem);
