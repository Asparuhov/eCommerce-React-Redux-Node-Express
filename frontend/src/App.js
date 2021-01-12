import React, { useState } from "react";
import classes from "./App.module.css";
import { Link, Route } from "react-router-dom";
import Products from "./components/Products/Products";
import { BrowserRouter } from "react-router-dom";
import AddItem from "./components/AddItem/AddItem";
const App = (props) => {
  return (
    <BrowserRouter>
      <div className={classes.App}>
        <header>
          <div className={classes.topnav}>
            <Link to="/">Home</Link>
            <Link to="/categories">Categories</Link>
            <Link to="/trending">Trending</Link>
            <Link to="/add">Add Item</Link>
            <div className={classes.topnavRight}>
              <Link to="/account">Account</Link>
              <Link to="/cart">Cart</Link>
            </div>
          </div>
        </header>
        <Route path="/" exact component={Products} />
        <Route path="/categories" exact render={() => <h1>Categories</h1>} />
        <Route path="/trending" exact render={() => <h1>trending</h1>} />
        <Route path="/account" exact render={() => <h1>Account</h1>} />
        <Route path="/cart" exact render={() => <h1>Cart</h1>} />
        <Route path="/add" exact component={AddItem} />
      </div>
    </BrowserRouter>
  );
};

export default App;
