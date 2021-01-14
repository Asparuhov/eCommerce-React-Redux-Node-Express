import classes from "./Products.module.css";
import React, { useState, useEffect } from "react";
import Product from "./Product";
import image from "../../assets/shoes.jpg";
import { connect } from "react-redux";
import axios from "axios";
import Spinner from "../Spinner/Spinner";
import { saveToDB } from "../../reducer";
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
        {props.products ? (
          props.products.map((item) => {
            return (
              <Product
                source={item.image}
                info={item.title}
                price={item.price}
                key={item.id}
                added={() => {
                  if (props.cart.length === 0) {
                    props.addToCart({
                      info: item.title,
                      id: item.id,
                      price: item.price,
                      image: item.image,
                      count: 1,
                    });
                  }
                  const index = props.cart.findIndex((x) => x.id === item.id);
                  console.log(index);
                  if (index === -1 && props.cart.length > 0) {
                    props.addToCart({
                      info: item.title,
                      id: item.id,
                      price: item.price,
                      image: item.image,
                      count: 1,
                    });
                  } else if (index >= 0) {
                    props.increaseCount(item.id);
                  }
                }}
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
    cart: state.currentCart,
  };
};
const toActions = (dispatch) => {
  return {
    setProducts: (products) =>
      dispatch({ type: "SETPRODUCTS", products: products }),
    addToCart: (info, id, price, image) =>
      dispatch({
        type: "ADDTOCART",
        payload: { info: info, id: id, price: price, image: image },
      }),
    increaseCount: (id) => dispatch({ type: "INCREASECOUNT", id: id }),
  };
};
export default connect(mapStateToProps, toActions)(Products);
