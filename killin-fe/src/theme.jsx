import React, { useEffect, useState } from "react";
import App from "./app/App";
import Navbar from "./components/Navbar";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { dark, light } from "./services/utils";

const Theme = () => {
  if (localStorage.getItem("check") === null) {
    localStorage.setItem("check", false);
  }
  const [isDarkTheme, setIsDarkTheme] = useState(
    !Boolean(localStorage.getItem("check"))
  );

  useEffect(() => {
    if (localStorage.getItem("check") === "true" && isDarkTheme === false) {
      setIsDarkTheme(true);
    }
  }, [isDarkTheme]);

  const changeTheme = () => {
    setIsDarkTheme(!isDarkTheme);
    localStorage.setItem("check", !isDarkTheme);
  };

  return (
    <ThemeProvider theme={isDarkTheme ? createTheme(dark) : createTheme(light)}>
      <CssBaseline />
      <Navbar isDarkTheme={isDarkTheme} changeTheme={changeTheme} />
      <App />
    </ThemeProvider>
  );
};

export default Theme;