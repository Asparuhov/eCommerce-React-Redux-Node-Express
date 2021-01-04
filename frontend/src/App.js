import React, { useState } from "react";
import "./App.css";
import axios from "axios";
export default function App() {
  let [usernameRegister, setUsernameRegister] = useState("");
  let [passwordRegister, setPasswordRegister] = useState("");
  let [usernameLogin, setUsernameLogin] = useState("");
  let [passwordLogin, setPasswordLogin] = useState("");
  let [currentUser, setCurrentUser] = useState();
  const register = () => {
    axios
      .post("http://localhost:4000/register", {
        username: usernameRegister,
        password: passwordRegister,
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };
  const login = () => {
    axios
      .post("http://localhost:4000/login", {
        username: usernameLogin,
        password: passwordLogin,
      })
      .then((res) => getUser)
      .catch((err) => console.log(err));
  };

  const getUser = () => {
    axios
      .get("http://localhost:4000/login")
      .then((res) => {
        setCurrentUser(res.data);
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="app">
      <div>
        <div className="register">
          <input
            type="text"
            onChange={(e) => setUsernameRegister(e.target.value)}
            placeholder="username"
          />
          <input
            type="password"
            onChange={(e) => setPasswordRegister(e.target.value)}
            placeholder="password"
          />
          <button onClick={register}>Register</button>
        </div>
      </div>
      <div className="login">
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
        <p>current user: {currentUser}</p>
      </div>
    </div>
  );
}
