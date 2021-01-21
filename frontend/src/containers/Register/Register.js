import React, { useState } from "react";
import classes from "./Register.module.css";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
const Register = (props) => {
  const emailValidationRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  const passwordValidationRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm;
  let [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });
  let [feedback, setFeedback] = useState("");
  let [errorHandler, setErrorHandler] = useState(null);
  const register = () => {
    axios
      .post("/register", user)
      .then((res) => {
        if (res.data === "success") {
          setFeedback("success");
          setErrorHandler(null);
        } else {
          setFeedback("bad");
        }
      })
      .catch((err) => console.log(err));
  };
  const validatePassword = (password) => {
    if (passwordValidationRegex.test(password)) {
      register();
      console.log("authorized");
    } else {
      setErrorHandler("pass");
    }
  };
  const validateEmail = (email, password) => {
    if (emailValidationRegex.test(email)) {
      validatePassword(password);
    } else {
      setErrorHandler("email");
    }
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
      {errorHandler === "email" ? (
        <p style={{ color: "red" }}>Unvalid email format.</p>
      ) : null}
      <input
        placeholder="password"
        type="password"
        onChange={(e) => setUser({ ...user, password: e.target.value })}
      />
      {errorHandler === "pass" ? (
        <p
          style={{
            color: "red",
            wordBreak: "break-all",
            fontSize: "13px",
            textAlign: "center",
            padding: "10px",
          }}
        >
          Password should include lower case letter, upper case letter and a
          number
        </p>
      ) : null}
      {feedback === "success" ? <Redirect to="/login" /> : null}
      {feedback === "bad" ? (
        <p style={{ color: "red" }}>
          Email already registered, try another one
        </p>
      ) : null}
      <button onClick={() => validateEmail(user.email, user.password)}>
        Register
      </button>
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
