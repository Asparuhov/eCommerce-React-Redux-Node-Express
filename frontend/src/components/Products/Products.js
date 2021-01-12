import classes from "./Products.module.css";
import React from "react";
import Product from "./Product";
import image from "../../assets/shoes.png";
export default function Products() {
  return (
    <>
      <div style={{ position: "relative" }}>
        <header>
          <img src={image} alt="default" className={classes.mainImage} />
          <p className={classes.Quote}>We have the best shoes on the market</p>
        </header>
      </div>
      <div className={classes.Products}>
        <Product
          source="http://images.amazon.com/images/P/0596004613.01._PE30_PI_SCMZZZZZZZ_.jpg"
          info="This book is awesome!"
          added={() => alert("added to cart")}
        />
        <Product
          source="http://images.amazon.com/images/P/0596004613.01._PE30_PI_SCMZZZZZZZ_.jpg"
          info="This book is awesome!"
          added={() => alert("added to cart")}
        />
        <Product
          source="http://images.amazon.com/images/P/0596004613.01._PE30_PI_SCMZZZZZZZ_.jpg"
          info="This book is awesome!"
          added={() => alert("added to cart")}
        />
        <Product
          source="http://images.amazon.com/images/P/0596004613.01._PE30_PI_SCMZZZZZZZ_.jpg"
          info="This book is awesome!"
          added={() => alert("added to cart")}
        />
        <Product
          source="http://images.amazon.com/images/P/0596004613.01._PE30_PI_SCMZZZZZZZ_.jpg"
          info="This book is awesome!"
          added={() => alert("added to cart")}
        />
      </div>
    </>
  );
}
