import { Box, CssBaseline } from "@mui/material";
import React, { useState } from "react";
import SignUpDetail from "./components/SignUpDetail";
import dayjs from "dayjs";
import { axiosUrl } from "../../services/api/axios";
import { POST_REGISTER } from "../../services/constants/apiConstants";
import { useNavigate } from "react-router-dom";
import { LOGIN_PATH } from "../../services/constants/pathConstants";

const initialValues = {
  fullName: "",
  userName: "",
  password: "",
  dob: null,
  address: "",
  email: "",
  confirmPassword: "",
};

const Index = () => {
  const [values, setvalues] = useState(initialValues);
  const [selectDob, setSelectDob] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setvalues({ ...values, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    createUser(values, selectDob);
  };

  const createUser = async (newValues, dob) => {
    // setIsLoading(true);
    const params = {
      fullName: newValues.fullName,
      userName: newValues.userName,
      password: newValues.password,
      dob: dayjs(dayjs(dob, "DD/MM/YYYY")).format("YYYY-MM-DD"),
      address: newValues.address,
      email: newValues.email,
    };
    try {
      await axiosUrl.post(POST_REGISTER, params);
      setvalues(initialValues);
      setSelectDob(null);
      navigate(`/${LOGIN_PATH}`)
    } catch (error) {
      console.error(`Error at createUser: ${error}`);
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <SignUpDetail
        selectDob={selectDob}
        setSelectDob={setSelectDob}
        handleSubmit={handleSubmit}
        values={values}
        handleChange={handleChange}
      />
    </Box>
  );
};

export default Index;
