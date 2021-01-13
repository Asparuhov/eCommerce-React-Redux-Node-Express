import React from "react";
import classes from "./Register.module.css";
import { Link } from "react-router-dom";
const Register = (props) => {
  return (
    <div className={classes.Register}>
      <h1>Register</h1>
      <input placeholder="nickname" type="text" />
      <input placeholder="email" type="email" />
      <input placeholder="password" type="password" />
      <button>Register</button>
      <p>
        Already registered? <Link to="/login">Login here</Link>
      </p>
    </div>
  );
};

export default Register;
