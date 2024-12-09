import { Checkbox as MuiCheckbox, FormControlLabel } from '@mui/material';

interface CheckboxProps {
  label: string;
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Checkbox: React.FC<CheckboxProps> = ({ label, checked, onChange }) => {
  return (
    <FormControlLabel
      control={
        <MuiCheckbox
          checked={checked}
          onChange={onChange}
          sx={{
            color: '#4caf50',
            '&.Mui-checked': {
              color: '#4caf50',
            },
          }}
        />
      }
      label={label}
    />
  );
};

export default Checkbox;