import { Card as MuiCard, CardContent, Typography } from "@mui/material";
import Box from "./Box";

interface CardProps {
  title: string;
  stats: { title: string; value: number | string; unit?: string }[];
  children?: React.ReactNode;
  onClick?: () => void;
}

const Card: React.FC<CardProps> = ({
  title,
  stats,
  children,
  onClick,
}) => {
  return (
    <MuiCard
      className="card"
      onClick={onClick}
      style={{ cursor: onClick ? "pointer" : "default" }}
    >
      <CardContent>
        <Typography variant="h5" gutterBottom>
          {title}
        </Typography>
        {stats.map((stat, index) => (
          <Box
            key={index}
            title={stat.title}
            value={stat.value}
            unit={stat.unit}
          />
        ))}
        {children && <div className="card-children">{children}</div>}
      </CardContent>
    </MuiCard>
  );
};

export default Card;