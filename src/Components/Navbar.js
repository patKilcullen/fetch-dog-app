import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button, Box, Grid } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const theme = useTheme();
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const logoutAndRedirectHome = () => {
    logout();
    navigate("/login");
  };

  return (
    <AppBar position="fixed" color="secondary">
      <Toolbar sx={{ flexDirection: "column", alignItems: "center" }}>
        <Typography
          variant="h3"
          component="div"
          sx={{
            flexGrow: 1,
            textAlign: "center",
            marginBottom: theme.spacing(1),
            fontWeight: "bold",
            color: "white",
            textDecoration: "underline",
          }}
        >
          Puppy Picker
        </Typography>
        <Grid container spacing={2} justifyContent="center">
          <Grid item>
            <Button
              color="inherit"
              component={Link}
              to="/"
              sx={{
                color: "white",
                fontWeight: "bold",
                border: "2px solid white",
              }}
            >
              Search
            </Button>
          </Grid>
          <Grid item>
            <Button
              color="inherit"
              component={Link}
              to="/favorites"
              sx={{
                color: "white",
                fontWeight: "bold",
                border: "2px solid white",
              }}
            >
              Favorites
            </Button>
          </Grid>
        </Grid>
        <Box sx={{ position:{ xs: "relative", sm: "absolute" },  right: {xs: null, sm: theme.spacing(2) }}}>
          <Button
            color="inherit"
            onClick={logoutAndRedirectHome}
            sx={{
              color: "white",
              fontWeight: "bold",
              border: "2px solid white",
            }}
          >
            Logout
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
