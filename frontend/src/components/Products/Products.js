import classes from "./Products.module.css";
import React from "react";
import Product from "./Product";
export default function Products() {
  return (
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
  );
}
