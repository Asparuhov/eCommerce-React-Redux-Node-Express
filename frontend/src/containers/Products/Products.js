import classes from "./Products.module.css";
import React, { useState, useEffect } from "react";
import Product from "./Product";
import image from "../../assets/shoes.jpg";
import { connect } from "react-redux";
import axios from "axios";
import Spinner from "../../components/Spinner/Spinner";
import * as actions from "../../actions/actions";
//categories:
//electronics,
//men clothing,
//women clothing,
//jewelery
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

  const getProduct = (type) => {
    props.setProducts(null);
    axios
      .get("https://fakestoreapi.com/products/" + type)
      .then(function (response) {
        props.setProducts(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  };
//spa
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
                toWish={() => {
                  const index = props.wishlist.findIndex(
                    (x) => x.id === item.id
                  );
                  if (index === -1) {
                    props.toWish(item);
                  }
                }}
                added={() => {
                  if (props.cart.length === 0) {
                    props.addToCart({
                      info: item.title,
                      id: item.id,
                      price: item.price,
                      image: item.image,
                      count: 1,
                      totalPrice: item.price,
                    });
                  }
                  const index = props.cart.findIndex((x) => x.id === item.id);
                  if (index === -1 && props.cart.length > 0) {
                    props.addToCart({
                      info: item.title,
                      id: item.id,
                      price: item.price,
                      image: item.image,
                      count: 1,
                      totalPrice: item.price,
                    });
                  } else if (index >= 0) {
                    props.increaseCount(item.id);
                    props.clearCart();
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
    user: state.currentUser,
    wishlist: state.currentWishList,
  };
};
const toActions = (dispatch) => {
  return {
    setProducts: (products) => dispatch(actions.setProducts(products)),
    addToCart: (obj) =>
      dispatch({
        type: "ADDTOCART",
        obj,
      }),
    increaseCount: (id) =>
      dispatch(actions.increaseCount({ id: id, incdec: "increment" })),
    clearCart: () => dispatch(actions.cartClearing()),
    toWish: (product) => dispatch(actions.toWish(product)),
  };
};
export default connect(mapStateToProps, toActions)(Products);
