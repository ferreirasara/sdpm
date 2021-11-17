import React from "react";
import ReactDOM from "react-dom";
import reportWebVitals from "./reportWebVitals";
import SDPMRootPage from "./pages/Root/SDPMRootPage";
import { Spin } from "antd";
require("dotenv").config();

ReactDOM.render(
  <React.Suspense
    fallback={
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '75vh' }}>
        <Spin tip='Carregando página...' />
      </div>}>
    <SDPMRootPage />
  </React.Suspense>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
