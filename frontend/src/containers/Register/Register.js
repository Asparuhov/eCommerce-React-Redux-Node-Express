import React, { useState } from "react";
import classes from "./Register.module.css";
import { Link } from "react-router-dom";
import axios from "axios";
const Register = (props) => {
  let [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });

  const register = () => {
    axios
      .post("/register", user)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };
  return (
    <div className={classes.Register}>
      <h1>Register</h1>
      <input
        placeholder="nickname"
        type="text"
        onChange={(e) => setUser({ ...user, username: e.target.value })}
      />
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
      <button onClick={() => register()}>Register</button>
      <p>
        Already registered?
        <Link className={classes.link} to="/login">
          Login here
        </Link>
      </p>
    </div>
  );
};

export default Register;
