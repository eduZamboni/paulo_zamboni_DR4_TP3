import React, { useState } from "react";
import { Switch, Typography, Container, Grid, Button, TextField, MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../contexts/Context";

const Settings: React.FC = () => {
  const navigate = useNavigate();
  const { language, changeLanguage } = useGlobalContext();

  const [notificationsEnabled, setNotificationsEnabled] = useState<boolean>(
    localStorage.getItem("notificationsEnabled") === "true"
  );

  const handleNotificationsChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNotificationsEnabled(event.target.checked);
    localStorage.setItem(
      "notificationsEnabled",
      event.target.checked.toString()
    );
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

      <Button
        variant="outlined"
        onClick={() => navigate("/")}
        style={{ marginTop: "20px" }}
      >
        Voltar para Home
      </Button>
    </Container>
  );
};

export default Settings;