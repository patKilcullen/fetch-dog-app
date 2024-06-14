import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext.js";
import { useNavigate } from "react-router-dom";
import { Box, Typography, TextField, Button } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const Login = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const theme = useTheme();

  // SUBMIT LOGIN REQUEST: if success, navigate home, otherwith show error
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await login(name, email);
      if (response.data === "OK") {
        navigate("/");
      } else {
        setError(response.message);
      }
    } catch (error) {
      setError(error);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundColor: theme.palette.background.default,
        padding: 3,
      }}
    >
      <Typography variant="h4" gutterBottom>
        Log into Pooch Finder
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          width: "100%",
          maxWidth: 400,
          backgroundColor: "white",
          padding: 3,
          borderRadius: 1,
          boxShadow: 1,
        }}
      >
        <TextField
          label="Name"
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          fullWidth
        />
        <TextField
          label="Email"
          type="email"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          fullWidth
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Login
        </Button>
      </Box>
      {error && (
        <Typography variant="h6" sx={{ color: "red" }} gutterBottom>
          {error}
        </Typography>
      )}
    </Box>
  );
};

export default Login;
