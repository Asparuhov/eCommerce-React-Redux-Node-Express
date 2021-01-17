import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import axios from "axios";
import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import reducer from "./reducer";
import thunk from "redux-thunk";
axios.defaults.baseURL = "https://chris-mern-shop.herokuapp.com/";
axios.defaults.headers.common["Authorization"] =
  "Bearer " + localStorage.getItem("token");
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
