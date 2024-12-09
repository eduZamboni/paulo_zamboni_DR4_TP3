import React from "react";
import { NativeBaseProvider } from "native-base";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Index from "./Routes";
import "./styles/styles.scss";
import { GlobalProvider } from "./contexts/Context";

const App = () => {
  return (
    <NativeBaseProvider>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <GlobalProvider>
          <Index />
        </GlobalProvider>
      </LocalizationProvider>
    </NativeBaseProvider>
  );
};

export default App;
