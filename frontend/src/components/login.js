import React, { useState } from "react";
import axios from "axios";
import classes from "./login.module.css";
import { connect } from "react-redux";
const Login = (props) => {
  let [usernameLogin, setUsernameLogin] = useState("");
  let [passwordLogin, setPasswordLogin] = useState("");
  const login = () => {
    axios
      .post("http://localhost:4000/login", {
        username: usernameLogin,
        password: passwordLogin,
      })
      .then((res) => {
        console.log(res.data[0].username);
        props.setCurrentUser(res.data[0].username);
      })
      .catch((err) => console.log(err));
  };
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
          <p>Current user: {props.currentUser}</p>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser,
  };
};
const toActions = (dispatch) => {
  return {
    setCurrentUser: (user) => dispatch({ type: "SETUSER", user: user }),
  };
};

export default connect(mapStateToProps, toActions)(Login);
