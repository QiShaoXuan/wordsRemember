import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import isMobile from "is-mobile";
const root = ReactDOM.createRoot(document.getElementById("root"));

const Entry = () => {
  return isMobile() ? <App /> : <p>Open this page on your phone</p>;
};

root.render(
  <React.StrictMode>
    <Entry />
  </React.StrictMode>
);
