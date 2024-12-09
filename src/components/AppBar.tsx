import React from "react";
import { AppBar, Toolbar, IconButton, Typography } from "@mui/material";
import { ArrowBack, Delete } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

interface CustomAppBarProps {
  title: string;
  showDelete?: boolean;
  onDelete?: () => void;
  backPath: string;
}

const CustomAppBar: React.FC<CustomAppBarProps> = ({ title, showDelete = false, onDelete, backPath }) => {
  const navigate = useNavigate();

  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <IconButton edge="start" color="inherit" onClick={() => navigate(backPath)}>
          <ArrowBack />
        </IconButton>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          {title}
        </Typography>
        {showDelete && (
          <IconButton color="inherit" onClick={onDelete}>
            <Delete />
          </IconButton>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default CustomAppBar;