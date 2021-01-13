import React from "react";
import classes from "./Login.module.css";
import { Link } from "react-router-dom";
const Login = (props) => {
  return (
    <div className={classes.Login}>
      <h1>Login</h1>
      <input placeholder="email" type="email" />
      <input placeholder="password" type="password" />
      <button>Login</button>
      <p>
              Don't have an account?<Link className={classes.link}to="/register">Sign up here</Link>
      </p>
    </div>
  );
};

export default Login;
