import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#f2d8dd",
    },
    secondary: {
      main: "#f08da0",
    },
  },
  typography: {
    fontFamily: "Roboto, sans-serif",
  },
  background: {
    default: "#f2d8dd",
  },
});

export default theme;
