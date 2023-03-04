import {
  Avatar,
  Box,
  Button,
  Grid,
  Paper,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { DatePicker, DesktopDatePicker } from "@mui/x-date-pickers";
import React from "react";

const SignUpDetail = ({ selectDob, setSelectDob, handleSubmit, values, handleChange }) => {
  const paperStyle = {
    padding: "30px 20px",
    width: "50%",
    margin: "20px auto",
  };
  const headerStyle = { margin: 0 };
  const avatarStyle = { backgroundColor: "#1bbd7e" };

  return (
    <Box component="main" sx={{ flex: 12, p: 3, pr: 12 }}>
      <Toolbar />
      <Grid>
        <Paper elevation={20} style={paperStyle}>
          <Grid align="center">
            <Avatar style={avatarStyle}>ok</Avatar>
            <h2 style={headerStyle}>Sign Up</h2>
            <Typography variant="caption" gutterBottom>
              Please fill this form to create an account !
            </Typography>
          </Grid>
          <Box
            component="form"
            sx={{
              display: "column",
            }}
            onSubmit={handleSubmit}
          >
            <TextField
              sx={{ pb: 2 }}
              fullWidth
              label="Name"
              id="fullName"
              name="fullName"
              placeholder="Enter your name"
              value={values.fullName}
              onChange={handleChange}
            />
            <DesktopDatePicker
              label="Ngày Sinh"
              inputFormat="DD/MM/YYYY"
              placeholder="DD/MM/YYYY"
              value={selectDob}
              onChange={(newValue) => {
                setSelectDob(newValue);
              }}
              renderInput={(params) => (
                <TextField sx={{ pb: 2 }} fullWidth {...params} />
              )}
            />
            <TextField
              fullWidth
              sx={{ pb: 2 }}
              label="Email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={values.email}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              sx={{ pb: 2 }}
              label="Adress"
              id="address"
              name="address"
              placeholder="Enter your adress"
              value={values.address}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              sx={{ pb: 2 }}
              label="Phone Number"
              id="userName"
              name="userName"
              placeholder="Enter your phone number"
              value={values.userName}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              sx={{ pb: 2 }}
              label="Password"
              id="password"
              name="password"
              placeholder="Enter your password"
              value={values.password}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              sx={{ pb: 2 }}
              label="Confirm Password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Confirm your password"
              value={values.confirmPassword}
              onChange={handleChange}
            />
            <Box
              sx={{
                flexGrow: 1,
                justifyContent: "center",
                display: "flex",
              }}
            >
              <Button
                size="large"
                type="submit"
                variant="contained"
                color="primary"
              >
                Sign up
              </Button>
            </Box>
          </Box>
        </Paper>
      </Grid>
    </Box>
  );
};

export default SignUpDetail;
