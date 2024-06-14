import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import AppContextProvider from "./context/AppContext.js";
import { BrowserRouter as Router } from "react-router-dom";



import theme from "./MuiTheme.js";
import { ThemeProvider } from "@mui/material/styles";


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <AppContextProvider>
        <Router>
          <App />
        </Router>
      </AppContextProvider>
    </ThemeProvider>
  </React.StrictMode>
);



