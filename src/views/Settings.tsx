import React, { useState } from "react";
import { Switch, Typography, Container, Grid, Button, TextField, MenuItem, Snackbar, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../contexts/Context";
import { Close } from "@mui/icons-material";

const Settings: React.FC = () => {
  const navigate = useNavigate();
  const { language, changeLanguage, theme, setThemeMode } = useGlobalContext();

  const [notificationsEnabled, setNotificationsEnabled] = useState<boolean>(
    localStorage.getItem("notificationsEnabled") === "true"
  );

  const [babyName, setBabyName] = useState(localStorage.getItem("babyName") || "");
  const [babyWeight, setBabyWeight] = useState(localStorage.getItem("babyWeight") || "");
  const [babyLength, setBabyLength] = useState(localStorage.getItem("babyLength") || "");

  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleNotificationsChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNotificationsEnabled(event.target.checked);
    localStorage.setItem(
      "notificationsEnabled",
      event.target.checked.toString()
    );
  };

  const handleSaveBabyInfo = () => {
    localStorage.setItem("babyName", babyName);
    localStorage.setItem("babyWeight", babyWeight);
    localStorage.setItem("babyLength", babyLength);
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleLogOff = () => {
    localStorage.removeItem("token");
    navigate("/signin");
  };

  return (
    <Container maxWidth="sm" style={{ padding: "20px" }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Configurações
      </Typography>
      <Grid container alignItems="center" spacing={1} style={{ marginBottom: "20px" }}>
        <Grid item xs>
          <Typography>Notificações</Typography>
        </Grid>
        <Grid item>
          <Switch
            checked={notificationsEnabled}
            onChange={handleNotificationsChange}
            color="primary"
          />
        </Grid>
      </Grid>

      <TextField
        select
        label="Idioma"
        value={language}
        onChange={(e) => changeLanguage(e.target.value as 'en' | 'pt' | 'es')}
        fullWidth
        margin="normal"
      >
        <MenuItem value="en">English</MenuItem>
        <MenuItem value="pt">Português</MenuItem>
        <MenuItem value="es">Español</MenuItem>
      </TextField>

      <TextField
        select
        label="Tema"
        value={theme}
        onChange={(e) => setThemeMode(e.target.value as 'light' | 'dark' | 'system')}
        fullWidth
        margin="normal"
      >
        <MenuItem value="system">Sistema</MenuItem>
        <MenuItem value="light">Claro</MenuItem>
        <MenuItem value="dark">Escuro</MenuItem>
      </TextField>

      <Typography variant="h5" style={{ marginTop: "20px" }}>Informações do Bebê</Typography>
      <TextField
        label="Nome do Bebê"
        value={babyName}
        onChange={(e) => setBabyName(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Peso do Bebê (kg)"
        value={babyWeight}
        onChange={(e) => setBabyWeight(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Comprimento do Bebê (cm)"
        value={babyLength}
        onChange={(e) => setBabyLength(e.target.value)}
        fullWidth
        margin="normal"
      />

      <Button
        variant="contained"
        color="primary"
        onClick={handleSaveBabyInfo}
        style={{ marginTop: "20px", marginRight: "10px" }}
      >
        Salvar Informações do Bebê
      </Button>

      <Button
        variant="contained"
        color="secondary"
        onClick={handleLogOff}
        style={{ marginTop: "20px" }}
      >
        LogOff
      </Button>

      <Button
        variant="outlined"
        onClick={() => navigate("/")}
        style={{ marginTop: "20px", marginLeft: "10px" }}
      >
        Voltar para Home
      </Button>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={1500}
        onClose={handleSnackbarClose}
        message="Informações salvas com sucesso!"
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

export default Settings;