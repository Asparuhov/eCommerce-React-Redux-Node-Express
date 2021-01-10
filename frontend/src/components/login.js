import React, { useState, useEffect } from "react";
import axios from "axios";
import classes from "./login.module.css";
import { connect } from "react-redux";
const Login = (props) => {
  let [usernameLogin, setUsernameLogin] = useState("");
  let [passwordLogin, setPasswordLogin] = useState("");
  let [loginRes, setLoginRes] = useState("");
  let [currentUser, setCurrentUser] = useState("");
  const login = () => {
    axios
      .post("http://localhost:4000/login", {
        username: usernameLogin,
        password: passwordLogin,
      })
      .then((res) => {
        console.log(res.data);
        if (res.data.length === 1) {
          if (res.data[0] === "wrong pass") {
            setLoginRes("wrong pass");
            setCurrentUser("");
          } else if (res.data[0] === "not registered") {
            setLoginRes("not registered");
            setCurrentUser("");
          }
        }
        if (res.data.length === 2) {
          setCurrentUser(res.data[1]);
        }
      })
      .catch((err) => console.log(err));
  };
  let display;
  if (loginRes !== "") {
    if (loginRes === "wrong pass") {
      display = <p>Wrong password!</p>;
    } else if (loginRes === "not registered") {
      display = <p>User doesn't exist</p>;
    }
  }
  if (currentUser !== "") {
    display = <p>{currentUser}</p>;
  }
  return (
    <div>
      <div>
        <div className={classes.login}>
          <p>Login</p>
          <input
            type="text"
            onChange={(e) => setUsernameLogin(e.target.value)}
            placeholder="username"
          />
          <input
            type="password"
            onChange={(e) => setPasswordLogin(e.target.value)}
            placeholder="password"
          />
          <button onClick={login}>Login</button>
          {display}
        </div>
      </div>
    </div>
  );
};

export default Login;
