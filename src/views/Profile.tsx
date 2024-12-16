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
import { DatePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";

const Profile: React.FC = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState(localStorage.getItem("userEmail") || "");
  const [birthDate, setBirthDate] = useState<Dayjs | null>(
    localStorage.getItem("birthDate") ? dayjs(localStorage.getItem("birthDate")) : null
  );
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleSaveProfile = () => {
    if (!email) {
      alert("E-mail é obrigatório.");
      return;
    }

    localStorage.setItem("userEmail", email);
    if (birthDate) {
      localStorage.setItem("birthDate", birthDate.toISOString());
    }

    setSnackbarOpen(true);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Container className="profile-page" maxWidth="sm">
      <Typography variant="h4" component="h1" gutterBottom>
        Perfil
      </Typography>
      <TextField
        label="E-mail"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
        margin="normal"
      />
      <DatePicker
        label="Data de Nascimento do Bebê"
        value={birthDate}
        onChange={(newValue) => setBirthDate(newValue)}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleSaveProfile}
        style={{ marginRight: "10px", marginTop: "20px" }}
      >
        Salvar
      </Button>
      <Button variant="outlined" onClick={() => navigate("/")}>
        Voltar para Home
      </Button>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        message="Perfil salvo com sucesso!"
        action={
          <IconButton size="small" aria-label="close" color="inherit" onClick={handleSnackbarClose}>
            <Close fontSize="small" />
          </IconButton>
        }
      />
    </Container>
  );
};

export default Profile;