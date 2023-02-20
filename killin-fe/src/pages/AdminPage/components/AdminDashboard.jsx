import { Box, Toolbar } from "@mui/material";
import React from "react";

const AdminDashboard = () => {
  return (
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
      <Toolbar />
      <h1>Admin Page</h1>
    </Box>
  );
};

export default AdminDashboard;
