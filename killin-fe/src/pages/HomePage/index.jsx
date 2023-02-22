import React from "react";
import { Navbar, SizeBar } from "../../services/constants/componentConstants";
import { Box } from "@mui/system";
import { CssBaseline, Toolbar } from "@mui/material";

const HomePage = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Navbar />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
      <Toolbar />
      <h1>ok</h1>
      </Box>
    </Box>
  );
};

export default HomePage;
