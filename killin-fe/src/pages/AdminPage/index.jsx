import { Box, CssBaseline } from "@mui/material";
import React from "react";
import Navbar from "../../components/Navbar";
import AdminDashboard from "./components/AdminDashboard";

const category = [];

const Index = () => {
  
  return (
    <Box sx={{ display: "flex" , flexDirection: "column"}}>
      <CssBaseline />
      <Navbar />
      <AdminDashboard
      />
    </Box>
  );
};

export default Index;
