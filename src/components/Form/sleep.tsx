import React from "react";
import { TextField } from "@mui/material";

interface SleepProps {
  notes: string;
  onChange: (value: string) => void;
}

const Sleep: React.FC<SleepProps> = ({ notes, onChange }) => {
  return (
    <div>
      <TextField
        label="Observações do Sono"
        value={notes}
        onChange={(e) => onChange(e.target.value)}
        fullWidth
        margin="normal"
      />
    </div>
  );
};

export default Sleep;