import { Typography } from "@mui/material";

interface BoxProps {
  title: string;
  value: string | number;
  unit?: string;
  onClick?: () => void;
}

const Box: React.FC<BoxProps> = ({ title, value, unit, onClick }) => {
  return (
    <div
      className="box-container"
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      <Typography variant="subtitle1" className="box-title">
        {title}
      </Typography>
      <Typography variant="h6" className="box-value">
        {value} {unit && <span className="box-unit">{unit}</span>}
      </Typography>
    </div>
  );
};

export default Box;