import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import axios from "axios";
import { Provider } from "react-redux";
import { store } from "./redux/store";

axios.defaults.baseURL = "https://backreduxfull.onrender.com";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);
