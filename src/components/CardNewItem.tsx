import React from "react";
import { Card, CardContent, Typography, Button } from "@mui/material";

interface Action {
  label: string;
  onClick: () => void;
}

interface CardNewItemProps {
  actions: Action[];
  title: string;
}

const CardNewItem: React.FC<CardNewItemProps> = ({ actions, title }) => {
  return (
    <Card style={{ margin: "20px auto", padding: "10px", maxWidth: "400px" }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>{title}</Typography>
        {actions.map((action, index) => (
          <Button
            key={index}
            variant="contained"
            color="primary"
            onClick={action.onClick}
            style={{ margin: "10px" }}
          >
            {action.label}
          </Button>
        ))}
      </CardContent>
    </Card>
  );
};

export default CardNewItem;