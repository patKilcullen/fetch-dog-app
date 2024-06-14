import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#dc004e",
    },
  },
  typography: {
    fontFamily: "Roboto, sans-serif",
  },
  background: {
    default: "#f2d8dd", // Set your default background color here
    // paper: "#ffffff", // Set your paper background color here
  },
});

export default theme;
