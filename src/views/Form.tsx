import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Typography, TextField, Button, Snackbar, IconButton, MenuItem } from "@mui/material";
import { Close } from "@mui/icons-material";
import dayjs, { Dayjs } from "dayjs";
import Diaper from "../components/Form/diaper";
import Sleep from "../components/Form/sleep";
import Eat from "../components/Form/eat";
import CustomAppBar from "../components/AppBar";

interface Item {
  id: number;
  title: string;
  notes: string;
  type: "diaper" | "sleep" | "eat";
}

const Form: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id?: string }>();

  const [title, setTitle] = useState("");
  const [notes, setNotes] = useState("");
  const [type, setType] = useState<"diaper" | "sleep" | "eat">("diaper");
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    if (id) {
      const storedItems = localStorage.getItem("items");
      if (storedItems) {
        const parsedItems: Item[] = JSON.parse(storedItems);
        const item = parsedItems.find((i) => i.id === Number(id));
        if (item) {
          setTitle(item.title);
          setNotes(item.notes);
          setType(item.type);
        }
      }
    }
  }, [id]);

  const handleSave = () => {
    if (!title) {
      alert("O título é obrigatório.");
      return;
    }

    const storedItems = localStorage.getItem("items");
    let items: Item[] = storedItems ? JSON.parse(storedItems) : [];

    if (id) {
      // Editar item existente
      const index = items.findIndex((i) => i.id === Number(id));
      if (index !== -1) {
        items[index] = { ...items[index], title, notes, type };
      }
    } else {
      // Criar novo item
      const newItem: Item = {
        id: Date.now(),
        title,
        notes,
        type
      };
      items.push(newItem);
    }

    localStorage.setItem("items", JSON.stringify(items));
    setSnackbarOpen(true);
    setTimeout(() => {
      setSnackbarOpen(false);
      navigate("/dashboard");
    }, 1500);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleDelete = () => {
    if (!id) return;
    const storedItems = localStorage.getItem("items");
    if (!storedItems) return;
    let items: Item[] = JSON.parse(storedItems);
    items = items.filter((i) => i.id !== Number(id));
    localStorage.setItem("items", JSON.stringify(items));
    navigate("/dashboard");
  };

  return (
    <>
      <CustomAppBar
        title={id ? "Editar Item" : "Criar Item"}
        showDelete={!!id}
        onDelete={id ? handleDelete : undefined}
        backPath="/dashboard"
      />
      <Container maxWidth="sm" style={{ textAlign: "center", padding: "20px" }}>
        <TextField
          label="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
          margin="normal"
        />

        {!id && (
          <TextField
            select
            label="Tipo de Item"
            value={type}
            onChange={(e) => setType(e.target.value as "diaper" | "sleep" | "eat")}
            fullWidth
            margin="normal"
          >
            <MenuItem value="diaper">Fralda</MenuItem>
            <MenuItem value="sleep">Sono</MenuItem>
            <MenuItem value="eat">Alimentação</MenuItem>
          </TextField>
        )}

        {type === "diaper" && <Diaper notes={notes} onChange={setNotes} />}
        {type === "sleep" && <Sleep notes={notes} onChange={setNotes} />}
        {type === "eat" && <Eat notes={notes} onChange={setNotes} />}

        <Button variant="contained" color="primary" onClick={handleSave} fullWidth style={{ marginTop: "20px" }}>
          Salvar
        </Button>

        <Snackbar
          open={snackbarOpen}
          autoHideDuration={1500}
          onClose={handleSnackbarClose}
          message={id ? "Item atualizado com sucesso!" : "Item criado com sucesso!"}
          action={
            <IconButton size="small" aria-label="close" color="inherit" onClick={handleSnackbarClose}>
              <Close fontSize="small" />
            </IconButton>
          }
        />
      </Container>
    </>
  );
};

export default Form;