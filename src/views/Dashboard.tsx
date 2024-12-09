import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, Button, List, ListItem, ListItemText, IconButton, Paper } from '@mui/material';
import { Edit } from '@mui/icons-material';

interface Item {
  id: number;
  title: string;
  notes: string;
}

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState<Item[]>([]);
  const [sleepHours, setSleepHours] = useState<number>(0);
  const [diaperChanges, setDiaperChanges] = useState<number>(0);

  useEffect(() => {
    const storedItems = localStorage.getItem('items');
    if (storedItems) {
      setItems(JSON.parse(storedItems));
    }

    const savedSleepHours = localStorage.getItem("sleepHours");
    const savedDiaperChanges = localStorage.getItem("diaperChanges");
    if (savedSleepHours) setSleepHours(parseFloat(savedSleepHours));
    if (savedDiaperChanges) setDiaperChanges(parseInt(savedDiaperChanges));
  }, []);

  const handleCreate = () => {
    navigate('/form');
  };

  const handleBack = () => {
    navigate('/');
  };

  const handleEdit = (id: number) => {
    navigate(`/form/${id}`);
  };

  return (
    <Container style={{ padding: '20px', textAlign: 'center' }} maxWidth="sm">
      <Typography variant="h4" gutterBottom>Dashboard</Typography>

      {/* Botão voltar para a home */}
      <Button variant="outlined" onClick={handleBack} style={{ marginBottom: '20px' }}>
        Voltar para Home
      </Button>

      <Paper style={{ padding: '20px', marginBottom: '20px' }}>
        <Typography variant="h6">Resumo do Dia</Typography>
        <Typography>Horas Dormidas: {sleepHours.toFixed(2)}</Typography>
        <Typography>Fraldas Trocadas: {diaperChanges}</Typography>
      </Paper>

      <Button variant="contained" color="primary" onClick={handleCreate} style={{ marginBottom: '20px' }}>
        Criar Novo Item
      </Button>
      {items.length === 0 ? (
        <Typography>Não há itens cadastrados.</Typography>
      ) : (
        <List>
          {items.map((item) => (
            <ListItem
              key={item.id}
              secondaryAction={
                <IconButton edge="end" onClick={() => handleEdit(item.id)}>
                  <Edit />
                </IconButton>
              }
            >
              <ListItemText primary={item.title} secondary={item.notes} />
            </ListItem>
          ))}
        </List>
      )}
    </Container>
  );
};

export default Dashboard;