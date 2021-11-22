import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import reportWebVitals from "./reportWebVitals";
import RawRouter from "./components/RawRouter";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme copy";
import "./translation/i18n";
import "./translation/en/translation.json";
import "./translation/ko/translation.json";

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Suspense fallback="...is loading">
        <RawRouter />
      </Suspense>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
