import classes from "./Products.module.css";
import React, { useState, useEffect } from "react";
import Product from "./Product";
import image from "../../assets/shoes.png";
import { connect } from "react-redux";
import axios from "axios";
import Spinner from "../Spinner/Spinner";
//categories:
//electronics,
//men clothing,
//women clothing,
//jewelery
const Products = (props) => {
  let [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    axios
      .get("https://fakestoreapi.com/products/")
      .then(function (response) {
        props.setProducts(response.data);
        console.log(response);
        setLoading(false);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, []);

  const getProduct = (type) => {
    props.setProducts(null);
    axios
      .get("https://fakestoreapi.com/products/" + type)
      .then(function (response) {
        props.setProducts(response.data);
        console.log(response);
      })
      .catch(function (error) {
        console.error(error);
      });
  };
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
        <button onClick={() => getProduct("")}>All</button>
        <button onClick={() => getProduct("/category/electronics")}>
          Electronics
        </button>
        <button onClick={() => getProduct("/category/men clothing")}>
          Men
        </button>
        <button onClick={() => getProduct("/category/women clothing")}>
          Women
        </button>
        <button onClick={() => getProduct("/category/jewelery")}>
          Jewelery
        </button>
      </div>
      <div className={classes.Products}>
        {loading ? <Spinner /> : null}
        {props.products ? (
          props.products.map((item) => {
            return (
              <Product
                source={item.image}
                info={item.title}
                price={item.price}
                key={item.id}
              />
            );
          })
        ) : (
          <Spinner />
        )}
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
