import classes from "./Products.module.css";
import React, { useState, useEffect } from "react";
import Product from "./Product";
import image from "../../assets/shoes.png";
import { connect } from "react-redux";
import axios from "axios";
//categories:
//electronics,
//men clothing,
//women clothing,
//jewelery
const Products = (props) => {
  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products/category/women clothing")
      .then(function (response) {
        props.setProducts(response.data);
        console.log(response);
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
          <p className={classes.Quote}>
            We have the best products on the market
          </p>
        </header>
      </div>
      <div className={classes.filterOptions}>
        <button>All</button>
        <button>Electronics</button>
        <button>Men</button>
        <button>Women</button>
        <button>Jewelery</button>
      </div>
      <div className={classes.Products}>
        {props.products.map((item) => {
          return (
            <Product
              source={item.image}
              info={item.title}
              price={item.price}
              key={item.id}
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
