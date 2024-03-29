import { Box, CssBaseline } from "@mui/material";
import React, { useState } from "react";
import LoginForm from "./components/LoginForm";
import { useLocation, useNavigate } from "react-router-dom/dist";
import { axiosUrl } from "../../services/api/axios";
import { POST_LOGIN } from "../../services/constants/apiConstants";
import jwtDecode from "jwt-decode";
import {
  ADMIN_PATH,
  OWNER_PATH,
  STAFF_PATH,
  USER_PATH,
} from "../../services/constants/pathConstants";

const initialValues = {
  phoneNumber: "",
  password: "",
};

const Index = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [openBackdrop, setOpenBackdrop] = useState(false);
  const [values, setvalues] = useState(initialValues);
  const navigate = useNavigate();
  const location = useLocation();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [messageSnackbar, setMessageSnackbar] = useState("");

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackbar(false);
  };
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
          navigate(OWNER_PATH, {
            replace: true,
            state: { notify: "Đăng nhập thành công" },
          });
        } else if (token.role === "2") {
          navigate(STAFF_PATH, {
            replace: true,
            state: { notify: "Đăng nhập thành công" },
          });
        } else if (token.role === "3") {
          if (location.state?.previousUrl !== "/") {
            navigate(`/user${location.state.previousUrl}`, {
              replace: true,
              state: { notify: "Đăng nhập thành công" },
            });
          } else {
            navigate(USER_PATH, {
              replace: true,
              state: { notify: "Đăng nhập thành công" },
            });
          }
        } else if (token.role === "4") {
          navigate(ADMIN_PATH, {
            replace: true,
            state: { notify: "Đăng nhập thành công" },
          });
        }
      }
      // console.log(token);
    } catch (e) {
      setErrorMessage("Tài khoản hoặc mật khẩu không đúng");
      setOpenBackdrop(false);
      setMessageSnackbar("Tài khoản hoặc mật khẩu không đúng");
      setOpenSnackbar(true);
    }
  };
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <LoginForm
        openSnackbar={openSnackbar}
        messageSnackbar={messageSnackbar}
        handleCloseSnackbar={handleCloseSnackbar}
        handleChange={handleChange}
        openBackdrop={openBackdrop}
        handleSubmit={handleSubmit}
        values={values}
        errorMessage={errorMessage}
      />
    </Box>
  );
};

export default Index;
