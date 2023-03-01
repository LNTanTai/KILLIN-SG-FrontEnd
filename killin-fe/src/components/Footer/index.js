import { Box, Container, Paper, Toolbar, Typography } from "@mui/material";
import React from "react";

const index = () => {
  return (
    <Box sx={{ marginTop: "calc(5% + 60px)", width: "100%", bottom: 0 }}>
      <Toolbar />
      <Paper
        sx={{
          marginTop: "calc(10% + 60px)",
          width: "100%",
          bottom: 0,
        }}
        component="footer"
        square
        variant="outlined"
      >
        <Container maxWidth="lg">
          <Box
            sx={{
              flexGrow: 1,
              justifyContent: "center",
              display: "flex",
              my: 1,
            }}
          >
            <div>
              <h1>Hello</h1>
            </div>
          </Box>

          <Box
            sx={{
              flexGrow: 1,
              justifyContent: "center",
              display: "flex",
              mb: 2,
            }}
          >
            <Typography variant="caption">
              Copyright ©2022. [] Limited
            </Typography>
          </Box>
        </Container>
      </Paper>
    </Box>
  );
};

export default index;
