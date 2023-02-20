import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Container,
  CssBaseline,
  FormControlLabel,
  Grid,
  Link,
  TextField,
  ThemeProvider,
  Toolbar,
  Typography,
  createTheme,
} from "@mui/material";
import React, { useState } from "react";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { axiosUrl } from "../../../services/api/axios";
import { POST_LOGIN } from "../../../services/constants/apiConstants";
import { useNavigate } from "react-router-dom";
import {
  ADMIN_PATH,
  HOMEPAGE_PATH,
  OWNER_PATH,
  STAFF_PATH,
  USER_PATH,
} from "../../../services/constants/pathConstants";
import { LoadingBackdrop } from "../../../services/constants/componentConstants";
import jwtDecode from "jwt-decode";

const theme = createTheme();

const user = [];

const initialValues = {
  phoneNumber: "",
  password: "",
};

const LoginForm = () => {
  const [openBackdrop, setOpenBackdrop] = useState(false);
  const [userLogin, setUserLogin] = useState(user);
  const [values, setvalues] = useState(initialValues);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setvalues({ ...values, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin(values);
  };

  const handleLogin = async (value) => {
    const params = {
      username: value.phoneNumber,
      password: value.password,
    };
    try {
      setOpenBackdrop(true);
      const response = await axiosUrl.post(POST_LOGIN, params);
      const data = { ...response.data };
      const token = jwtDecode(data.token);
      setOpenBackdrop(false);
      if (data.message === "Logged In") {
        localStorage.setItem("loginInfo", JSON.stringify(data.token));
        if (token.role === "1") {
          navigate(OWNER_PATH, { replace: true });
        } else if (token.role === "2") {
          navigate(STAFF_PATH, { replace: true });
        } else if (token.role === "3") {
          navigate(USER_PATH, { replace: true });
        } else if (token.role === "4") {
          navigate(ADMIN_PATH, { replace: true });
        }
      }
    } catch (e) {
      console.error(`Error at handleLogin: ${e}`);
      setOpenBackdrop(false);
    }
  };

  return (
    <>
      <Box component="main" sx={{ flex: 12, p: 3, pr: 12 }}>
        <Toolbar />
        <ThemeProvider theme={theme}>
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
                Sign in
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
                {/* <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              /> */}
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign In
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link href="#" variant="body2">
                      Forgot password?
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link href="#" variant="body2">
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Container>
        </ThemeProvider>
      </Box>
      <LoadingBackdrop open={openBackdrop} />
    </>
  );
};

export default LoginForm;
