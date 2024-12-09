import React from "react";
import { TextField } from "@mui/material";

interface DiaperProps {
  notes: string;
  onChange: (value: string) => void;
}

const Diaper: React.FC<DiaperProps> = ({ notes, onChange }) => {
  return (
    <div>
      <TextField
        label="Detalhes da Fralda"
        value={notes}
        onChange={(e) => onChange(e.target.value)}
        fullWidth
        margin="normal"
      />
    </div>
  );
};

export default Diaper;