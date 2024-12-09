import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  TextField,
  Button,
  Snackbar,
  IconButton,
} from "@mui/material";
import { Close } from "@mui/icons-material";

const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleSignup = () => {
    if (!name || !email || !password) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    localStorage.setItem("userName", name);
    localStorage.setItem("userEmail", email);
    localStorage.setItem("userPassword", password);
    setSnackbarOpen(true);

    setTimeout(() => {
      setSnackbarOpen(false);
      navigate("/signin");
    }, 1500);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Container maxWidth="sm" style={{ textAlign: "center", padding: "20px" }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Criar Conta
      </Typography>
      <TextField
        label="Nome"
        value={name}
        onChange={(e) => setName(e.target.value)}
        fullWidth
        margin="normal"
      />
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
        onClick={handleSignup}
        fullWidth
        style={{ marginTop: "20px" }}
      >
        Cadastrar
      </Button>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={1500}
        onClose={handleSnackbarClose}
        message="Conta criada com sucesso!"
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

export default SignUp;