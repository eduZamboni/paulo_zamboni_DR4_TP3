// src/components/FabButton.tsx
import React from "react";
import {
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
} from "@mui/material";
import {
  Add,
  Bedtime,
  BabyChangingStation,
  TaskAlt,
  Dashboard as DashboardIcon
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

interface FabButtonProps {
  onAddDiaperChange: () => void;
  onOpenSleepDialog: () => void;
  currentTab: number;
  markAllTasksComplete: () => void;
}

const FabButton: React.FC<FabButtonProps> = ({
  onAddDiaperChange,
  onOpenSleepDialog,
  currentTab,
  markAllTasksComplete,
}) => {
  const navigate = useNavigate();

  const actionsTab0 = [
    {
      icon: <Bedtime />,
      name: "Registrar Tempo de Sono",
      onClick: onOpenSleepDialog,
    },
    {
      icon: <BabyChangingStation />,
      name: "Registrar Troca de Fralda",
      onClick: onAddDiaperChange,
    },
    {
      icon: <DashboardIcon />,
      name: "Ir para o Dashboard",
      onClick: () => navigate("/dashboard"),
    }
  ];

  const actionsTab1 = [
    {
      icon: <TaskAlt />,
      name: "Marcar Todas como Concluídas",
      onClick: markAllTasksComplete,
    },
    {
      icon: <DashboardIcon />,
      name: "Ir para o Dashboard",
      onClick: () => navigate("/dashboard"),
    }
  ];

  const actions = currentTab === 0 ? actionsTab0 : actionsTab1;

  return (
    <SpeedDial
      ariaLabel="Ações"
      sx={{ position: "fixed", bottom: 16, right: 16 }}
      icon={<SpeedDialIcon openIcon={<Add />} />}
    >
      {actions.map((action) => (
        <SpeedDialAction
          key={action.name}
          icon={action.icon}
          tooltipTitle={action.name}
          onClick={action.onClick}
        />
      ))}
    </SpeedDial>
  );
};

export default FabButton;