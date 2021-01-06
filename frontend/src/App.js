import React, { useState } from "react";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import classes from "./App.module.css";
import axios from "axios";
import Register from "./components/register";
import Login from "./components/login";
const App = (props) => {
  
  return (
    <Router>
      <div className={classes.App}>
        <nav>
          <ul>
            <li>
              <Link className={classes.Link} to="/">
                Login
              </Link>
            </li>
            <li>
              <Link className={classes.Link} to="/register">
                Register
              </Link>
            </li>
          </ul>
        </nav>
        <Route path="/user" exact render={() => <h1>hey</h1>} />
        <Route path="/register" exact component={Register} />
        <Route path="/" exact component={Login} />
      </div>
    </Router>
  );
};

export default App;
