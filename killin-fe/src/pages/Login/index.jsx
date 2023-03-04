import {
  Box,
  CssBaseline,
} from "@mui/material";
import React, { useState } from "react";
import LoginForm from "./components/LoginForm";
import { useNavigate } from "react-router-dom/dist";
import { axiosUrl } from "../../services/api/axios";
import { POST_LOGIN } from "../../services/constants/apiConstants";
import jwtDecode from "jwt-decode";
import {
  ADMIN_PATH,
  OWNER_PATH,
  STAFF_PATH,
  USER_PATH,
} from "../../services/constants/pathConstants";

const user = [];

const initialValues = {
  phoneNumber: "",
  password: "",
};

const Index = () => {
  const [openBackdrop, setOpenBackdrop] = useState(false);
  // const [userLogin, setUserLogin] = useState(user);
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
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <LoginForm
        handleChange={handleChange}
        openBackdrop={openBackdrop}
        handleSubmit={handleSubmit}
        values={values}
      />
    </Box>
  );
};

export default Index;
