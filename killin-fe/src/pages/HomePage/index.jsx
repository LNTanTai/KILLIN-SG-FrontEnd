import React from "react";
import { Footer, Navbar, SizeBar } from "../../services/constants/componentConstants";
import { Box } from "@mui/system";
import { CssBaseline, Toolbar } from "@mui/material";
import Banner from "./components";

const HomePage = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: 'column' }}>
      <CssBaseline />
      <Navbar/>
      <Banner />
      <Footer />
    </Box>
  );
};

export default HomePage;
