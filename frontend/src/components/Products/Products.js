import classes from "./Products.module.css";
import React, { useState, useEffect } from "react";
import Product from "./Product";
import image from "../../assets/shoes.png";
import { connect } from "react-redux";
import axios from "axios";
const Products = (props) => {
  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products/")
      .then(function (response) {
        props.setProducts(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, []);
  return (
    <>
      <div style={{ position: "relative" }}>
        <header>
          <img src={image} alt="default" className={classes.mainImage} />
          <p className={classes.Quote}>We have the best products on the market</p>
        </header>
      </div>
      <div className={classes.Products}>
        {props.products.map((item) => {
          return (
            <Product
              source={item.image}
              info={item.title}
              price={item.price}
              key={item}
            />
          );
        })}
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    products: state.products,
  };
};
const toActions = (dispatch) => {
  return {
    setProducts: (products) =>
      dispatch({ type: "SETPRODUCTS", products: products }),
  };
};
export default connect(mapStateToProps, toActions)(Products);
