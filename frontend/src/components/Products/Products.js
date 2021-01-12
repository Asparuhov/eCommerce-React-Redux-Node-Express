import classes from "./Products.module.css";
import React from "react";
import Product from "./Product";
import image from "../../assets/shoes.png";
import { connect } from "react-redux";
const Products = (props) => {
  return (
    <>
      <div style={{ position: "relative" }}>
        <header>
          <img src={image} alt="default" className={classes.mainImage} />
          <p className={classes.Quote}>We have the best shoes on the market</p>
        </header>
      </div>
      <div className={classes.Products}>
        {props.items.map((item) => {
          return (
            <Product source={item.img} info={item.info} price={item.price} />
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
