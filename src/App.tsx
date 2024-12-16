import React, { useEffect } from "react";
import { NativeBaseProvider } from "native-base";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Index from "./Routes";
import "./styles/styles.scss";
import { GlobalProvider, useGlobalContext } from "./contexts/Context";

const AppContent = () => {
  const { theme } = useGlobalContext();

  useEffect(() => {
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    document.body.classList.remove('theme-light', 'theme-dark');
    if (theme === 'system') {
      if (systemPrefersDark) {
        document.body.classList.add('theme-dark');
      } else {
        document.body.classList.add('theme-light');
      }
    } else {
      document.body.classList.add(`theme-${theme}`);
    }
  }, [theme]);

  return <Index />;
};

const App = () => {
  return (
    <NativeBaseProvider>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <GlobalProvider>
          <AppContent />
        </GlobalProvider>
      </LocalizationProvider>
    </NativeBaseProvider>
  );
};

export default App;