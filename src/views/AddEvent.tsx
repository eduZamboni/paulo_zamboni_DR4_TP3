import React from 'react';
import { useLocation } from 'react-router-dom';
import { Button, TextField } from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';

const AddEvent: React.FC = () => {
  const location = useLocation();
  const eventType = location.state?.eventType || 'event';

  const [dateTime, setDateTime] = React.useState<Dayjs | null>(dayjs());
  const [notes, setNotes] = React.useState('');

  const handleDateTimeChange = (newValue: Dayjs | null) => {
    setDateTime(newValue);
  };

  const handleSave = () => {
  };

  return (
    <div className="add-event-container">
      <h2>Adicionar {eventType === 'diaperChange' ? 'Troca de Fralda' : eventType === 'sleepTime' ? 'Tempo de Sono' : 'Alimentação'}</h2>
      <DateTimePicker
        label="Data e Hora"
        value={dateTime}
        onChange={handleDateTimeChange}
        format="DD/MM/YYYY HH:mm"
      />
      <TextField
        label="Notas"
        multiline
        rows={4}
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        variant="outlined"
        fullWidth
        margin="normal"
      />
      <Button variant="contained" color="primary" onClick={handleSave}>
        Salvar
      </Button>
    </div>
  );
};

export default AddEvent;