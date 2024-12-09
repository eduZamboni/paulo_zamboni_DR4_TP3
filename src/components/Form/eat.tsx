import React from "react";
import { TextField } from "@mui/material";

interface EatProps {
  notes: string;
  onChange: (value: string) => void;
}

const Eat: React.FC<EatProps> = ({ notes, onChange }) => {
  return (
    <div>
      <TextField
        label="Detalhes da Alimentação"
        value={notes}
        onChange={(e) => onChange(e.target.value)}
        fullWidth
        margin="normal"
      />
    </div>
  );
};

export default Eat;