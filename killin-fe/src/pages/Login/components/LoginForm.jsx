import {
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import React from "react";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { LoadingBackdrop } from "../../../services/constants/componentConstants";
import { SIGN_UP_PATH } from "../../../services/constants/pathConstants";
import { Link } from "react-router-dom";
const LoginForm = ({
  handleSubmit,
  values,
  handleChange,
  openBackdrop,
  errorMessage
}) => {

  return (
    <>
      <Box component="main" sx={{ flex: 12, p: 3, pr: 12 }}>
        <Toolbar />
          <Container maxWidth="xs">
            <CssBaseline />
            <Box
              sx={{
                marginTop: 8,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Đăng nhập
              </Typography>
              <Box
                component="form"
                onSubmit={handleSubmit}
                noValidate
                sx={{ mt: 1 }}
              >
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="phoneNumber"
                  label="Phone Number"
                  name="phoneNumber"
                  autoComplete="phoneNumber"
                  value={values.phoneNumber}
                  onChange={handleChange}
                  autoFocus
                />
              {errorMessage && (
                <Typography variant="caption" color="error">
                  {errorMessage}
                </Typography>
              )}
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  value={values.password}
                  autoComplete="current-password"
                  onChange={handleChange}
                />
              {errorMessage && (
                <Typography variant="caption" color="error">
                  {errorMessage}
                </Typography>
              )}
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Đăng nhập
                </Button>
                <Grid container>
                  <Grid item xs>
                    {/* <Link href="#" variant="body2"> */}
                      Quên mật khẩu?
                    {/* </Link> */}
                  </Grid>
                  <Grid item>
                    <Link to={`/${SIGN_UP_PATH}`} style={{ textDecoration: "none" }}>
                      {"Không có tài khoản ? Đăng ký tại đây"}
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Container>
      </Box>
      <LoadingBackdrop open={openBackdrop} />
    </>
  );
};

export default LoginForm;
