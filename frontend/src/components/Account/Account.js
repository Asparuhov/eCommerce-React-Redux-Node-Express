import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import classes from "./Account.module.css";
import userLogo from "../../assets/logo.png";
const Account = (props) => {
  const [currentClicked, setCurrentClicked] = useState("");
  useEffect(() => {
    setCurrentClicked("details");
  }, []);
  return (
    <div className={classes.Account}>
      <div className={classes.navbar}>
        <button onClick={() => setCurrentClicked("details")}>Details</button>
        <button onClick={() => setCurrentClicked("orders")}>Orders</button>
        <button
          onClick={() => {
            localStorage.clear();
            window.location.reload();
          }}
        >
          Logout
        </button>
        {currentClicked === "details" ? (
          <div className={classes.details}>
            <img src={userLogo} alt="default" />
            <p>ID: {props.user._id}</p>
            <p>Email: {props.user.email}</p>
            <p>Nickname: {props.user.username}</p>
          </div>
        ) : null}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.currentUser,
  };
};
export default connect(mapStateToProps)(Account);

/* <img src={userLogo} alt='default' className={classes.logo}/>
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
      </button> */
