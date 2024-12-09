import React, { useState, useEffect } from "react";
import Avatar from "../components/Avatar";
import Card from "../components/Card";
import FabButton from "../components/FabButton";
import Container from "../components/Container";
import { useNavigate } from "react-router-dom";
import {
  Tabs,
  Tab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid,
  IconButton,
  Snackbar,
  Switch,
  Typography,
  Alert,
  LinearProgress,
} from "@mui/material";
import {
  Today,
  AssignmentTurnedIn,
  Close,
  Settings as SettingsIcon,
} from "@mui/icons-material";
import { DateTimePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";

const Home: React.FC = () => {
  const navigate = useNavigate();

  const [sleepHours, setSleepHours] = useState<number>(0);
  const [diaperChanges, setDiaperChanges] = useState<number>(0);
  const [sleepGoal] = useState<number>(12);
  const [diaperGoal] = useState<number>(10);
  const [tasks, setTasks] = useState({
    limparMamadeira: false,
    prepararPapinhas: false,
    verificarFraldas: false,
    verificarBateriaBaba: false,
  });

  const [tabIndex, setTabIndex] = useState(0);

  const [openSleepDialog, setOpenSleepDialog] = useState(false);
  const [sleepStartTime, setSleepStartTime] = useState<Dayjs | null>(null);
  const [sleepEndTime, setSleepEndTime] = useState<Dayjs | null>(null);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    const savedSleepHours = localStorage.getItem("sleepHours");
    const savedDiaperChanges = localStorage.getItem("diaperChanges");
    const savedTasks = localStorage.getItem("dailyTasks");
    const storedUserName = localStorage.getItem("userName");

    if (savedSleepHours) setSleepHours(parseFloat(savedSleepHours));
    if (savedDiaperChanges) setDiaperChanges(parseInt(savedDiaperChanges));
    if (savedTasks) setTasks(JSON.parse(savedTasks));
    if (storedUserName) setUserName(storedUserName);
  }, []);

  const handleOpenSleepDialog = () => {
    setSleepStartTime(null);
    setSleepEndTime(null);
    setOpenSleepDialog(true);
  };

  const handleCloseSleepDialog = () => {
    setOpenSleepDialog(false);
  };

  const handleSaveSleep = () => {
    if (sleepStartTime && sleepEndTime) {
      const duration = sleepEndTime.diff(sleepStartTime, "hour", true);
      if (duration > 0) {
        updateSleepHours(duration);
        setSnackbarOpen(true);
        setAlertMessage("");
      } else {
        setAlertMessage(`A hora de acordar deve ser após a hora de dormir.`);
      }
    } else {
      setAlertMessage(`Por favor, preencha ambas as datas.`);
    }
    setOpenSleepDialog(false);
  };

  const updateSleepHours = (hours: number) => {
    const totalSleepHours = sleepHours + hours;
    setSleepHours(totalSleepHours);
    localStorage.setItem("sleepHours", totalSleepHours.toString());

    if (totalSleepHours >= sleepGoal) {
      setAlertMessage(`Meta diária de sono atingida! ${totalSleepHours}/${sleepGoal} horas.`);
    }
  };

  const incrementDiaperChanges = () => {
    const totalDiaperChanges = diaperChanges + 1;
    setDiaperChanges(totalDiaperChanges);
    localStorage.setItem("diaperChanges", totalDiaperChanges.toString());
    setSnackbarOpen(true);

    if (totalDiaperChanges >= diaperGoal) {
      setAlertMessage(`Meta diária de fraldas atingida! ${totalDiaperChanges}/${diaperGoal} trocas.`);
    }
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  const handleTaskChange =
    (field: keyof typeof tasks) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const updatedTasks = { ...tasks, [field]: event.target.checked };
      setTasks(updatedTasks);
      localStorage.setItem("dailyTasks", JSON.stringify(updatedTasks));
    };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleAlertClose = () => {
    setAlertMessage("");
  };

  return (
    <main className="App">
      <Container className="header">
        <Typography variant="h4" component="h1">
          Baby Manager
        </Typography>
        <div>
          <IconButton onClick={() => navigate("/settings")}>
            <SettingsIcon />
          </IconButton>
          <IconButton onClick={() => navigate("/profile")}>
            <Avatar name={userName || "Usuário"} size={40} />
          </IconButton>
        </div>
      </Container>

      <Container className="tabs">
        <Tabs
          value={tabIndex}
          onChange={handleTabChange}
          variant="fullWidth"
          indicatorColor="primary"
          textColor="primary"
        >
          <Tab icon={<Today />} label="Resumo do Dia" aria-label="Resumo do Dia" />
          <Tab icon={<AssignmentTurnedIn />} label="Atividades Diárias" aria-label="Atividades Diárias" />
        </Tabs>
      </Container>

      <Container className="content">
        {alertMessage && (
          <Alert severity="success" onClose={handleAlertClose}>
            {alertMessage}
          </Alert>
        )}
        {tabIndex === 0 && (
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Card
                title="Tempo de Sono"
                stats={[
                  {
                    title: "Horas Dormidas",
                    value: `${sleepHours.toFixed(2)}/${sleepGoal} horas`,
                  },
                ]}
                onClick={handleOpenSleepDialog}
              >
                <LinearProgress
                  variant="determinate"
                  value={(sleepHours / sleepGoal) * 100}
                  style={{ marginTop: "10px" }}
                />
              </Card>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Card
                title="Fraldas Trocadas"
                stats={[
                  {
                    title: "Total",
                    value: `${diaperChanges}/${diaperGoal} trocas`,
                  },
                ]}
                onClick={incrementDiaperChanges}
              >
                <LinearProgress
                  variant="determinate"
                  value={(diaperChanges / diaperGoal) * 100}
                  style={{ marginTop: "10px" }}
                />
              </Card>
            </Grid>
          </Grid>
        )}
        {tabIndex === 1 && (
          <Card title="Atividades Diárias" stats={[]}>
            <div className="checkbox-group">
              {Object.keys(tasks).map((taskKey) => (
                <Grid
                  container
                  alignItems="center"
                  key={taskKey}
                  style={{ marginBottom: "10px" }}
                >
                  <Grid item xs>
                    <Typography>
                      {taskKey === "limparMamadeira"
                        ? "Limpar Mamadeira"
                        : taskKey === "prepararPapinhas"
                        ? "Preparar Papinhas"
                        : taskKey === "verificarFraldas"
                          ? "Verificar Estoque de Fraldas"
                          : "Verificar Bateria da Babá Eletrônica"}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Switch
                      checked={tasks[taskKey as keyof typeof tasks]}
                      onChange={handleTaskChange(taskKey as keyof typeof tasks)}
                      color="primary"
                    />
                  </Grid>
                </Grid>
              ))}
            </div>
          </Card>
        )}
      </Container>

      <Dialog open={openSleepDialog} onClose={handleCloseSleepDialog}>
        <DialogTitle>Registrar Tempo de Sono</DialogTitle>
        <DialogContent>
          <DateTimePicker
            label="Hora de Dormir"
            value={sleepStartTime}
            onChange={setSleepStartTime}
            format="DD/MM/YYYY HH:mm"
          />
          <DateTimePicker
            label="Hora de Acordar"
            value={sleepEndTime}
            onChange={setSleepEndTime}
            format="DD/MM/YYYY HH:mm"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseSleepDialog}>Cancelar</Button>
          <Button onClick={handleSaveSleep} variant="contained" color="primary">
            Salvar
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        message="Registro salvo com sucesso!"
        action={
          <IconButton size="small" aria-label="close" color="inherit" onClick={handleSnackbarClose}>
            <Close fontSize="small" />
          </IconButton>
        }
      />

      <FabButton
        onAddDiaperChange={incrementDiaperChanges}
        onOpenSleepDialog={handleOpenSleepDialog}
        currentTab={tabIndex}
        markAllTasksComplete={() => {
          const updatedTasks = Object.keys(tasks).reduce((acc, key) => {
            acc[key as keyof typeof tasks] = true;
            return acc;
          }, {} as typeof tasks);
          setTasks(updatedTasks);
          localStorage.setItem("dailyTasks", JSON.stringify(updatedTasks));
        }}
      />
    </main>
  );
};

export default Home;