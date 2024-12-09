import { Alert as MuiAlert, AlertColor } from '@mui/material';

interface AlertProps {
  message: string;
  severity: AlertColor;
}

const Alert: React.FC<AlertProps> = ({ message, severity }) => {
  return (
    <MuiAlert severity={severity} style={{ marginBottom: '20px' }}>
      {message}
    </MuiAlert>
  );
};

export default Alert;