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
import React, { useEffect } from "react";
import AOS from "aos"
import 'aos/dist/aos.css'

const SignUpDetail = ({ selectDob, setSelectDob, handleSubmit, values, handleChange, errorMessage }) => {
  const paperStyle = {
    padding: "30px 20px",
    width: "50%",
    margin: "20px auto",
  };
  const headerStyle = { margin: 0 };
  const avatarStyle = { backgroundColor: "#1bbd7e" };
  useEffect(() => {
    AOS.init({ duration: 1000 })
  }, []);
  return (
    <Box component="main" sx={{ flex: 12, p: 3, pr: 12 }} data-aos="flip-right">
      <Toolbar />
      <Grid>
        <Paper elevation={20} style={paperStyle}>
          <Grid align="center">
            <Avatar style={avatarStyle}>ok</Avatar>
            <h2 style={headerStyle}>Sign Up</h2>
            <Typography variant="caption" gutterBottom>
              Vui lòng điền những thông tin dưới đây
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
              label="Họ và tên"
              id="fullName"
              name="fullName"
              placeholder="Enter your name"
              value={values.fullName}
              onChange={handleChange}
              error={errorMessage.fullName ? true : false}
              helperText={errorMessage.fullName}
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
              error={errorMessage.email ? true : false}
              helperText={errorMessage.email}
            />
            <TextField
              fullWidth
              sx={{ pb: 2 }}
              label="Địa chỉ"
              id="address"
              name="address"
              placeholder="Nhập địa chỉ của bạn"
              value={values.address}
              onChange={handleChange}
              error={errorMessage.address ? true : false}
              helperText={errorMessage.address}
            />
            <TextField
              fullWidth
              sx={{ pb: 2 }}
              label="Số điện thoại"
              id="userName"
              name="userName"
              placeholder="Nhập số điện thoại của bạn"
              value={values.userName}
              onChange={handleChange}
              error={errorMessage.userName ? true : false}
              helperText={errorMessage.userName}
            />
            <TextField
              fullWidth
              sx={{ pb: 2 }}
              label="Mật khẩu"
              id="password"
              name="password"
              placeholder="Nhập mật khẩu"
              value={values.password}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              sx={{ pb: 2 }}
              label="Xác nhận mật khẩu"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Xác nhận lại mật khẩu"
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
                Đăng kí
              </Button>
            </Box>
          </Box>
        </Paper>
      </Grid>
    </Box>
  );
};

export default SignUpDetail;
