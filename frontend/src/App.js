import React, { useState, useEffect } from "react";
import classes from "./App.module.css";
import { BrowserRouter, Link, Route, Redirect } from "react-router-dom";
import Products from "./components/Products/Products";

import Login from "./containers/Login/Login";
import AddItem from "./components/AddItem/AddItem";
import Register from "./containers/Register/Register";
import axios from "axios";
import { connect } from "react-redux";
import Account from "./components/Account/Account";
const App = (props) => {
  useEffect(() => {
    axios
      .get("user")
      .then((res) => {
        props.setCurrentUser(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
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

            {props.currentUser.username ? (
              <Link style={{ float: "right" }} to="/account">
                Account
              </Link>
            ) : (
              <Link style={{ float: "right" }} to="/login">
                Login
              </Link>
            )}
          </div>
        </header>

        <Route exact path="/">
          {props.loggedIn ? <Products /> : <Redirect to="/login" />}
        </Route>
        <Route path="/categories" exact render={() => <h1>Categories</h1>} />
        <Route path="/login" exact component={Login} />
        <Route path="/register" exact component={Register} />
        <Route path="/account" exact>
          {" "}
          {props.loggedIn ? <Account /> : <Redirect to="/login" />}
        </Route>
        <Route path="/cart" exact render={() => <h1>Cart</h1>} />
        <Route path="/add" exact component={AddItem} />
        <Route path="/products/clothes" exact render={() => <h1>cloth</h1>} />
        <Route path="/products/shoes" exact render={() => <h1>shoes</h1>} />
        <Route path="/products/hats" exact render={() => <h1>hats</h1>} />
      </div>
    </BrowserRouter>
  );
};

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser,
    loggedIn: state.loggedIn,
  };
};
const toActions = (dispatch) => {
  return {
    setCurrentUser: (user) => dispatch({ type: "SETCURRENTUSER", user: user }),
  };
};
export default connect(mapStateToProps, toActions)(App);
