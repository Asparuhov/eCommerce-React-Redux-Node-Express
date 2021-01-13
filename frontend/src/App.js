import React, { useState } from "react";
import classes from "./App.module.css";
import { Link, Route } from "react-router-dom";
import Products from "./components/Products/Products";
import { BrowserRouter } from "react-router-dom";
import Login from "./containers/Login/Login";
import AddItem from "./components/AddItem/AddItem";
import Register from "./containers/Register/Register";
const App = (props) => {
  return (
    <BrowserRouter>
      <div className={classes.App}>
        <header>
          <div className={classes.navbar}>
            <Link to="/">Home</Link>
            <div className={classes.dropdown}>
              <button className={classes.dropbtn}>Dropdown</button>
              <div className={classes.dropdownContent}>
                <Link to="/products/clothes">Clothes</Link>
                <Link to="/products/shoes">Shoes</Link>
                <Link to="/products/hats">Hats</Link>
              </div>
            </div>
            <Link to="/login">Login</Link>
            <div className={classes.rightNav}>
              <Link to="/account">Account</Link>
              <Link to="/cart">Cart</Link>
            </div>
          </div>
        </header>
        <Route path="/" exact component={Products} />
        <Route path="/categories" exact render={() => <h1>Categories</h1>} />
        <Route path="/login" exact component={Login} />
        <Route path="/register" exact component={Register} />
        <Route path="/account" exact render={() => <h1>Account</h1>} />
        <Route path="/cart" exact render={() => <h1>Cart</h1>} />
        <Route path="/add" exact component={AddItem} />
        <Route path="/products/clothes" exact render={() => <h1>cloth</h1>} />
        <Route path="/products/shoes" exact render={() => <h1>shoes</h1>} />
        <Route path="/products/hats" exact render={() => <h1>hats</h1>} />
      </div>
    </BrowserRouter>
  );
};

export default App;
