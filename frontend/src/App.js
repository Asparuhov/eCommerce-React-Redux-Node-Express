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
          <div className={classes.navbar}>
            <Link to="/">Home</Link>
            <Link to="/trending">Trending</Link>
            <div className={classes.dropdown}>
              <button className={classes.dropbtn}>
                Dropdown
              </button>
              <div className={classes.dropdownContent}>
                <Link to="#">Clothes</Link>
                <Link href="#">Link 2</Link>
                <Link href="#">Link 3</Link>
              </div>
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
