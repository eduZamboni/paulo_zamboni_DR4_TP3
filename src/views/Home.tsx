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
  MenuItem
} from "@mui/material";
import {
  Today,
  AssignmentTurnedIn,
  Close,
  Settings as SettingsIcon
} from "@mui/icons-material";
import { DateTimePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { useGlobalContext } from "../contexts/Context";
import { useTranslation } from "react-i18next";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { language, changeLanguage } = useGlobalContext();
  const { t } = useTranslation();

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
  const [sleepObs, setSleepObs] = useState("");

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const [userName, setUserName] = useState<string | null>(null);
  const [babyName, setBabyName] = useState("");
  const [babyWeight, setBabyWeight] = useState("");
  const [babyLength, setBabyLength] = useState("");

  const [openDiaperDialog, setOpenDiaperDialog] = useState(false);
  const [diaperStatus, setDiaperStatus] = useState('urina');
  const [diaperTime, setDiaperTime] = useState<Dayjs | null>(dayjs());
  const [diaperObs, setDiaperObs] = useState("");

  const [openFeedingDialog, setOpenFeedingDialog] = useState(false);
  const [feedingType, setFeedingType] = useState<'mamadeira' | 'seio'>('mamadeira');
  const [feedingStart, setFeedingStart] = useState<Dayjs | null>(dayjs());
  const [feedingEnd, setFeedingEnd] = useState<Dayjs | null>(dayjs());
  const [feedingQuantity, setFeedingQuantity] = useState("");
  const [feedingSide, setFeedingSide] = useState<'direito' | 'esquerdo' | 'ambos'>('ambos');
  const [feedingObs, setFeedingObs] = useState("");

  useEffect(() => {
    const savedSleepHours = localStorage.getItem("sleepHours");
    const savedDiaperChanges = localStorage.getItem("diaperChanges");
    const savedTasks = localStorage.getItem("dailyTasks");
    const storedUserName = localStorage.getItem("userName");
    const babyName = localStorage.getItem("babyName") || "";
    const babyWeight = localStorage.getItem("babyWeight") || "";
    const babyLength = localStorage.getItem("babyLength") || "";

    if (savedSleepHours) setSleepHours(parseFloat(savedSleepHours));
    if (savedDiaperChanges) setDiaperChanges(parseInt(savedDiaperChanges));
    if (savedTasks) setTasks(JSON.parse(savedTasks));
    if (storedUserName) setUserName(storedUserName);
    setBabyName(babyName);
    setBabyWeight(babyWeight);
    setBabyLength(babyLength);
  }, []);

  const handleOpenSleepDialog = () => {
    setSleepStartTime(null);
    setSleepEndTime(null);
    setSleepObs("");
    setOpenSleepDialog(true);
  };

  const handleCloseSleepDialog = () => {
    setOpenSleepDialog(false);
  };

  const handleSaveSleep = () => {
    if (sleepStartTime && sleepEndTime) {
      const duration = sleepEndTime.diff(sleepStartTime, "hour", true);
      if (duration > 0) {
        const totalSleepHours = sleepHours + duration;
        setSleepHours(totalSleepHours);
        localStorage.setItem("sleepHours", totalSleepHours.toString());
        setSnackbarOpen(true);
        setAlertMessage(t('saved_success'));

        // Armazena registro de sono com observação se quiser
        const stored = localStorage.getItem('sleepRecords');
        let records = stored ? JSON.parse(stored) : [];
        records.push({
          start: sleepStartTime.toISOString(),
          end: sleepEndTime.toISOString(),
          obs: sleepObs
        });
        localStorage.setItem('sleepRecords', JSON.stringify(records));
      } else {
        setAlertMessage(t('check_dates'));
      }
    } else {
      setAlertMessage(t('fill_both_dates'));
    }
    setOpenSleepDialog(false);
  };

  const incrementDiaperChanges = () => {
    const totalDiaperChanges = diaperChanges + 1;
    setDiaperChanges(totalDiaperChanges);
    localStorage.setItem("diaperChanges", totalDiaperChanges.toString());
    setSnackbarOpen(true);
    setAlertMessage(t('saved_success'));
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

  const taskNames: { [key: string]: string } = {
    limparMamadeira: t('limparMamadeira'),
    prepararPapinhas: t('prepararPapinhas'),
    verificarFraldas: t('verificarFraldas'),
    verificarBateriaBaba: t('verificarBateriaBaba')
  };

  const handleDiaperClick = () => {
    setOpenDiaperDialog(true);
    setDiaperStatus('urina');
    setDiaperTime(dayjs());
    setDiaperObs("");
  };

  const handleSaveDiaper = () => {
    const stored = localStorage.getItem('diaperRecords');
    let records = stored ? JSON.parse(stored) : [];
    records.push({
      status: diaperStatus,
      time: diaperTime?.toISOString(),
      observation: diaperObs
    });
    localStorage.setItem('diaperRecords', JSON.stringify(records));
    setOpenDiaperDialog(false);
    setSnackbarOpen(true);
    setAlertMessage(t('saved_success'));
  };

  const handleFeedingClick = () => {
    setOpenFeedingDialog(true);
    setFeedingType('mamadeira');
    setFeedingStart(dayjs());
    setFeedingEnd(dayjs());
    setFeedingQuantity("");
    setFeedingSide('ambos');
    setFeedingObs("");
  };

  const handleSaveFeeding = () => {
    const stored = localStorage.getItem('feedingRecords');
    let records = stored ? JSON.parse(stored) : [];
    records.push({
      type: feedingType,
      start: feedingStart?.toISOString(),
      end: feedingEnd?.toISOString(),
      quantity: feedingType === 'mamadeira' ? feedingQuantity : null,
      side: feedingType === 'seio' ? feedingSide : null,
      observation: feedingObs
    });
    localStorage.setItem('feedingRecords', JSON.stringify(records));
    setOpenFeedingDialog(false);
    setSnackbarOpen(true);
    setAlertMessage(t('saved_success'));
  };

  return (
    <main className="App">
      <Container className="header">
        <div>
          <Typography variant="h4" component="h1">
            {t('welcome')}
          </Typography>
          {babyName && (
            <Typography variant="h6">
              {`${babyName} - ${babyWeight} kg, ${babyLength} cm`}
            </Typography>
          )}
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <TextField
            select
            value={language}
            onChange={(e) => changeLanguage(e.target.value as 'en' | 'pt' | 'es')}
            variant="outlined"
            size="small"
            style={{ marginRight: '10px' }}
          >
            <MenuItem value="en">English</MenuItem>
            <MenuItem value="pt">Português</MenuItem>
            <MenuItem value="es">Español</MenuItem>
          </TextField>

          <IconButton onClick={() => navigate("/settings")}>
            <SettingsIcon />
          </IconButton>
          <IconButton onClick={() => navigate("/profile")}>
            <Avatar name={userName || t('Usuário')} size={40} />
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
          <Tab icon={<Today />} label={t('Resumo do Dia')} aria-label="Resumo do Dia" />
          <Tab icon={<AssignmentTurnedIn />} label={t('Atividades Diárias')} aria-label="Atividades Diárias" />
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
            <Grid item xs={12} sm={4}>
              <Card
                title={t('Tempo de Sono')}
                stats={[
                  {
                    title: t('Horas Dormidas'),
                    value: `${sleepHours.toFixed(2)}/${sleepGoal} ${t('horas')}`,
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
            <Grid item xs={12} sm={4}>
              <Card
                title={t('Fraldas Trocadas')}
                stats={[
                  {
                    title: t('Total'),
                    value: `${diaperChanges}/${diaperGoal} ${t('trocas')}`,
                  },
                ]}
                onClick={handleDiaperClick}
              >
                <LinearProgress
                  variant="determinate"
                  value={(diaperChanges / diaperGoal) * 100}
                  style={{ marginTop: "10px" }}
                />
              </Card>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Card
                title="Amamentação"
                stats={[]}
                onClick={handleFeedingClick}
              />
            </Grid>
          </Grid>
        )}
        {tabIndex === 1 && (
          <Card title={t('Atividades Diárias')} stats={[]}>
            <div className="checkbox-group">
              {Object.keys(tasks).map((taskKey) => (
                <Grid
                  container
                  alignItems="center"
                  key={taskKey}
                  style={{ marginBottom: "10px" }}
                >
                  <Grid item xs>
                    <Typography>{taskNames[taskKey]}</Typography>
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
        <DialogTitle>{t('Registrar Tempo de Sono')}</DialogTitle>
        <DialogContent>
          <DateTimePicker
            label={t('Hora de Dormir')}
            value={sleepStartTime}
            onChange={setSleepStartTime}
            format="DD/MM/YYYY HH:mm"
          />
          <DateTimePicker
            label={t('Hora de Acordar')}
            value={sleepEndTime}
            onChange={setSleepEndTime}
            format="DD/MM/YYYY HH:mm"
          />
          <TextField
            label="Observação"
            value={sleepObs}
            onChange={(e) => setSleepObs(e.target.value)}
            fullWidth
            margin="normal"
            multiline
            rows={2}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseSleepDialog}>{t('Cancelar')}</Button>
          <Button onClick={handleSaveSleep} variant="contained" color="primary">
            {t('Salvar')}
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openDiaperDialog} onClose={() => setOpenDiaperDialog(false)}>
        <DialogTitle>Registrar Troca de Fralda</DialogTitle>
        <DialogContent>
          <TextField
            select
            label="Estado da Fralda"
            value={diaperStatus}
            onChange={(e) => setDiaperStatus(e.target.value)}
            fullWidth
            margin="normal"
          >
            <MenuItem value="urina">Suja de Urina</MenuItem>
            <MenuItem value="fezes">Suja de Fezes</MenuItem>
            <MenuItem value="ambas">Ambas</MenuItem>
            <MenuItem value="limpa">Limpa</MenuItem>
          </TextField>
          <DateTimePicker
            label="Horário da Troca"
            value={diaperTime}
            onChange={setDiaperTime}
            format="DD/MM/YYYY HH:mm"
          />
          <TextField
            label="Observação"
            value={diaperObs}
            onChange={(e) => setDiaperObs(e.target.value)}
            fullWidth
            margin="normal"
            multiline
            rows={3}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDiaperDialog(false)}>Cancelar</Button>
          <Button onClick={handleSaveDiaper} variant="contained" color="primary">Salvar</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openFeedingDialog} onClose={() => setOpenFeedingDialog(false)}>
        <DialogTitle>Registrar Amamentação</DialogTitle>
        <DialogContent>
          <TextField
            select
            label="Tipo"
            value={feedingType}
            onChange={(e) => setFeedingType(e.target.value as 'mamadeira' | 'seio')}
            fullWidth
            margin="normal"
          >
            <MenuItem value="mamadeira">Mamadeira</MenuItem>
            <MenuItem value="seio">Seio</MenuItem>
          </TextField>
          <DateTimePicker
            label="Horário Início"
            value={feedingStart}
            onChange={setFeedingStart}
            format="DD/MM/YYYY HH:mm"
          />
          <DateTimePicker
            label="Horário Fim"
            value={feedingEnd}
            onChange={setFeedingEnd}
            format="DD/MM/YYYY HH:mm"
          />

          {feedingType === 'mamadeira' && (
            <TextField
              label="Quantidade (ml)"
              value={feedingQuantity}
              onChange={(e) => setFeedingQuantity(e.target.value)}
              fullWidth
              margin="normal"
            />
          )}
          {feedingType === 'seio' && (
            <TextField
              select
              label="Lado"
              value={feedingSide}
              onChange={(e) => setFeedingSide(e.target.value as 'direito' | 'esquerdo' | 'ambos')}
              fullWidth
              margin="normal"
            >
              <MenuItem value="direito">Direito</MenuItem>
              <MenuItem value="esquerdo">Esquerdo</MenuItem>
              <MenuItem value="ambos">Ambos</MenuItem>
            </TextField>
          )}
          <TextField
            label="Observação"
            value={feedingObs}
            onChange={(e) => setFeedingObs(e.target.value)}
            fullWidth
            margin="normal"
            multiline
            rows={2}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenFeedingDialog(false)}>Cancelar</Button>
          <Button onClick={handleSaveFeeding} variant="contained" color="primary">Salvar</Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        message={alertMessage}
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