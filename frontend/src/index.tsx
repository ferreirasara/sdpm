import React from "react";
import ReactDOM from "react-dom";
import reportWebVitals from "./reportWebVitals";
import SDPMRootPage from "./pages/Root/SDPMRootPage";
import FallbackSpin from "./components/FallbackSpin";
import ErrorBoundary from "./components/ErrorBoundary";
import { ConfigProvider, theme } from "antd";
require("dotenv").config();

document.body.style.margin = "0";
ReactDOM.render(
  <ConfigProvider
    theme={{
      algorithm: theme.darkAlgorithm,
      token: {
        colorPrimary: '#00b96b',
      },
    }}
  >
    <ErrorBoundary>
      <React.Suspense fallback={<FallbackSpin tip='Carregando página...' />}>
        <SDPMRootPage />
      </React.Suspense>
    </ErrorBoundary>
  </ConfigProvider>,
  document.getElementById("root"),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
