import React, { useState } from "react";
import classes from "./Register.module.css";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
const Register = (props) => {
  let [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });
  let [feedback, setFeedback] = useState("");
  const register = () => {
    axios
      .post("/register", user)
      .then((res) => {
        if (res.data === "success") {
          setFeedback("success");
          <Redirect to="/login" />;
        } else {
          setFeedback("bad");
        }
      })
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
      {feedback === "success" ? (
        <p style={{ color: "green" }}>You registered successfuly!</p>
      ) : null}
      {feedback === "bad" ? (
        <p style={{ color: "red" }}>
          Email already registered, try another one
        </p>
      ) : null}
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
