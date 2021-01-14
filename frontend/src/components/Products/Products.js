import classes from "./Products.module.css";
import React, { useState, useEffect } from "react";
import Product from "./Product";
import image from "../../assets/shoes.png";
import { connect } from "react-redux";
import axios from "axios";
const Products = (props) => {
  let [products, setProducts] = useState([]);
  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products/")
      .then(function (response) {
        setProducts(response.data);
        console.log(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  });
  return (
    <>
      <div style={{ position: "relative" }}>
        <header>
          <img src={image} alt="default" className={classes.mainImage} />
          <p className={classes.Quote}>We have the best shoes on the market</p>
        </header>
      </div>
      <div className={classes.Products}>
        {products.map((item) => {
          return (
            <Product
              source={item.image}
              info={item.title}
              price={item.price}
            />
          );
        })}
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    items: state.items,
  };
};

export default connect(mapStateToProps)(Products);
