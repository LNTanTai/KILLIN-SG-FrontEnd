import React from "react";
import { Footer, Navbar, SizeBar } from "../../services/constants/componentConstants";
import { Box } from "@mui/system";
import { CssBaseline, Toolbar } from "@mui/material";

const HomePage = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: 'column' }}>
      <CssBaseline />
      {/* <Navbar /> */}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <h1>ok</h1>
      </Box>
      <Footer/>
    </Box>
  );
};

export default HomePage;
