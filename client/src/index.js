import React from "react";
import ReactDOM from "react-dom/client";
import { CookiesProvider } from "react-cookie";
import App from "./App";
import { Provider } from "react-redux";
import store from "./redux/store";
import { ThemeProvider, createTheme } from "@mui/material";
const theme = createTheme({
  palette: {
    primary: { main: "#48e5c2" },
    secondary: { main: "#333333" },
    typography: {
      button: {
        textTransform: "none",
      },
    },
  },
});
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <CookiesProvider>
        <App />
      </CookiesProvider>
    </ThemeProvider>
  </Provider>
);
