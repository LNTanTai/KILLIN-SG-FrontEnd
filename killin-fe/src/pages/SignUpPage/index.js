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
  const [errors, setErrors] = useState({});
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const handleChange = (e) => {
    const { name, value } = e.target;
    setvalues({ ...values, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validateInputs();
    if (isValid) {
      const dob = selectDob ? selectDob.toISOString() : "";
      createUser(values, dob);
    }
    createUser(values, selectDob);
  };
  const validateInputs = () => {
    let newErrors = {};

    // Kiểm tra Họ và tên không được để trống
    if (!values.fullName) {
      newErrors.fullName = "Họ và tên không được để trống";
    }

    // Kiểm tra Email phải theo dạng email tiêu chuẩn
    if (!/\S+@\S+\.\S+/.test(values.email)) {
      newErrors.email = "Email không hợp lệ";
    }

    // Kiểm tra Địa chỉ không được trống
    if (!values.address) {
      newErrors.address = "Địa chỉ không được để trống";
    }

    // Kiểm tra Số điện thoại theo phải format tiêu chuẩn
    if (!/^(0\d{9})$/.test(values.userName)) {
      newErrors.userName = "Số điện thoại không hợp lệ";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
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
      role: "3",
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
        errorMessage={errors}
      />
    </Box>
  );
};

export default Index;
