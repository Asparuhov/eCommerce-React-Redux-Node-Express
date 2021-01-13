import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import axios from 'axios';
import { createStore } from "redux";
import { Provider } from "react-redux";
import reducer from "./reducer";
axios.defaults.baseURL = 'http://localhost:4000/';
axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');
const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
