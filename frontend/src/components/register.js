import React, { useState } from "react";
import axios from "axios";
import classes from './register.module.css'
const Register = (props) => {
  let [usernameRegister, setUsernameRegister] = useState("");
  let [passwordRegister, setPasswordRegister] = useState("");
  const register = () => {
    axios
      .post("http://localhost:4000/register", {
        username: usernameRegister,
        password: passwordRegister,
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };
  return (
    <div>
      <div>
        <div className={classes.register}>
          <p>Register</p>
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
    </div>
  );
}

export default Register