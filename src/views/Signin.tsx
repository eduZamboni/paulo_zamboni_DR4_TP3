import React, { useState } from "react";
import {
  Button,
  TextField,
  Typography,
  Container,
  Snackbar,
  IconButton,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Close } from "@mui/icons-material";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogin = () => {
    const storedEmail = localStorage.getItem("userEmail");
    const storedPassword = localStorage.getItem("userPassword");

    if (email && password) {
      if (storedEmail === email && storedPassword === password) {
        localStorage.setItem("token", "FakeLogin");
        setSnackbarOpen(true);
        navigate("/");
      } else {
        alert("Email ou senha incorretos. Verifique suas credenciais.");
      }
    } else {
      alert("Por favor, insira o e-mail e a senha.");
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Container maxWidth="sm" style={{ textAlign: "center", padding: "20px" }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Login
      </Typography>
      <TextField
        label="E-mail"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Senha"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleLogin}
        fullWidth
        style={{ marginTop: "20px" }}
      >
        Entrar
      </Button>

      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate("/signup")}
        fullWidth
        style={{ marginTop: "10px" }}
      >
        Criar Conta
      </Button>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        message="Login realizado com sucesso!"
        action={
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleSnackbarClose}
          >
            <Close fontSize="small" />
          </IconButton>
        }
      />
    </Container>
  );
};

export default SignIn;