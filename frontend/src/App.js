import React, { useEffect } from "react";
import classes from "./App.module.css";
import { BrowserRouter, Link, Route, Redirect } from "react-router-dom";
import Products from "./components/Products/Products";
import Login from "./containers/Login/Login";
import Register from "./containers/Register/Register";
import axios from "axios";
import { connect } from "react-redux";
import Account from "./components/Account/Account";
import Cart from "./containers/Cart/Cart";
import * as actions from "./actions/actions";
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
            {props.currentUser.username ? (
              <>
                <Link style={{ float: "right" }} to="/account">
                  Account
                </Link>
                <Link
                  style={{ float: "right" }}
                  className={classes.cart}
                  to="/cart"
                >
                  {props.cart.length > 0 ? (
                    <div className={classes.redDot}>{props.cart.length}</div>
                  ) : null}
                  Cart
                </Link>
              </>
            ) : (
              <Link style={{ float: "right" }} to="/login">
                Login
              </Link>
            )}
          </div>
        </header>

        <Route exact path="/" component={Products} />

        <Route path="/login" exact>
          {props.loggedIn === false ? <Login /> : <Redirect to="/" />}
        </Route>
        <Route path="/register" exact component={Register} />
        <Route path="/account" exact>
          {props.loggedIn ? <Account /> : <Redirect to="/login" />}
        </Route>
        <Route path="/cart" exact component={Cart} />
      </div>
    </BrowserRouter>
  );
};

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser,
    loggedIn: state.loggedIn,
    cart: state.currentCart,
  };
};
const toActions = (dispatch) => {
  return {
    setCurrentUser: (user) => dispatch(actions.setCurrentUser(user)),
  };
};
export default connect(mapStateToProps, toActions)(App);
