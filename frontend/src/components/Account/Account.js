import React from "react";
import { connect } from "react-redux";
import Login from "../../containers/Login/Login";
import classes from "./Account.module.css";
import userLogo from '../../assets/logo.png'
const Account = (props) => {
  return (
    <div className={classes.Account}>
      <img src={userLogo} alt='default' className={classes.logo}/>
      <h1>Account info</h1>
      <p>ID: {props.user._id}</p>
      <p>Email: {props.user.email}</p>
      <p>Username: {props.user.username}</p>
      <button
        onClick={() => {
          localStorage.clear();
          window.location.reload();
        }}
      >
        Logout
      </button>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.currentUser,
  };
};
export default connect(mapStateToProps)(Account);
