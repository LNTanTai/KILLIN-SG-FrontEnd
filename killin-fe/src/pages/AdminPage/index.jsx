import { Box, CssBaseline } from "@mui/material";
import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import AdminDashboard from "./components/AdminDashboard";
import { axiosUrl } from "../../services/api/axios";
import {
  POST_GET_LIST_BILL_BY_DATE,
  POST_GET_USER_BY_PHONENUMBER,
  POST_UPDATE_BILL_STATUS,
} from "../../services/constants/apiConstants";
import jwtDecode from "jwt-decode";

const bill = [];

const Index = () => {
  const [open, setOpen] = useState(-1);
  const [billData, setBillData] = useState(bill);
  const [userData, setUserData] = useState();

  const current = new Date();
  const date = `${current.getFullYear()}-${(current.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${current.getDate().toString().padStart(2, "0")}`;

  const loginInfo = JSON.parse(localStorage.getItem("loginInfo"));
  let token;
  if (loginInfo !== null) {
    token = jwtDecode(loginInfo);
  }

  useEffect(() => {
    fetchUserByPhoneNumber();
    fetchData(date);
  }, []);

  const fetchData = async (date) => {
    const params = {
      date: date,
    };
    try {
      const response = await axiosUrl.post(POST_GET_LIST_BILL_BY_DATE, params);
      const data = [...response.data];
      console.log(data);
      setBillData(data);
    } catch (error) {
      console.error(`Error at fetchData: ${error}`);
    }
  };

  const handleConfirm = async (id) => {
    const params = {
      billId: id,
      billStatus: "",
      processStatus: "Đang giao hàng",
      staffUserId: token.userId,
    };
    try {
      const response = await axiosUrl.post(POST_UPDATE_BILL_STATUS, params);
      // const data = [...response.data];
      console.log(response);
      fetchData(date);
    } catch (error) {
      console.error(`Error at handleConfirm: ${error}`);
    }
  };

  const handleFinish = async (id) => {
    const params = {
      billId: id,
      billStatus: "paid",
      processStatus: "Đã giao hàng",
      staffUserId: token.userId,
    };
    try {
      const response = await axiosUrl.post(POST_UPDATE_BILL_STATUS, params);
      // const data = [...response.data];
      console.log(response);
      fetchData(date);
    } catch (error) {
      console.error(`Error at handleFinish: ${error}`);
    }
  };

  const handleCancel = async (id) => {
    const params = {
      billId: id,
      billStatus: "",
      processStatus: "Cancel",
      staffUserId: token.userId,
    };
    try {
      const response = await axiosUrl.post(POST_UPDATE_BILL_STATUS, params);
      // const data = [...response.data];
      console.log(response);
      fetchData(date);
    } catch (error) {
      console.error(`Error at handleCancel: ${error}`);
    }
  };

  const fetchUserByPhoneNumber = async () => {
    const params = {
      phoneNumber: token.phoneNumber,
    };
    try {
      const response = await axiosUrl.post(
        POST_GET_USER_BY_PHONENUMBER,
        params
      );
      const data = { ...response.data };
      setUserData(data);
    } catch (error) {
      console.error(`Error at fetchUserByPhoneNumber: ${error}`);
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <CssBaseline />
      {/* <Navbar /> */}
      <AdminDashboard
      handleConfirm={handleConfirm}
        userData={userData}
        billData={billData}
        open={open}
        setOpen={setOpen}
        handleFinish={handleFinish}
        handleCancel={handleCancel}
      />
    </Box>
  );
};

export default Index;
