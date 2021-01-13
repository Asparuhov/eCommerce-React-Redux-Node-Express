import React, { useState } from "react";
import classes from "./Login.module.css";
import { Link } from "react-router-dom";
import axios from "axios";
const Login = (props) => {
  let [user, setUser] = useState({
    email: "",
    password: "",
  });

  const login = () => {
    axios
      .post("http://localhost:4000/login", user)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };
  return (
    <div className={classes.Login}>
      <h1>Login</h1>
      <input
        placeholder="email"
        type="email"
        onChange={(e) => setUser({ ...user, email: e.target.value })}
      />
      <input
        placeholder="password"
        type="password"
        onChange={(e) => setUser({ ...user, password: e.target.value })}
      />
      <button onClick={login}>Login</button>
      <p>
        Don't have an account?
        <Link className={classes.link} to="/register">
          Sign up here
        </Link>
      </p>
    </div>
  );
};

export default Login;
