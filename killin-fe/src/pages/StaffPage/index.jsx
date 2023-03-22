import { Box, CssBaseline } from '@mui/material'
import React, { useEffect, useState }  from 'react'
import Navbar from '../../components/Navbar'
import { axiosUrl } from "../../services/api/axios";
import {
  POST_GET_LIST_BILL_BY_DATE,
  POST_UPDATE_BILL_STATUS,
} from "../../services/constants/apiConstants";
import jwtDecode from "jwt-decode";
import StaffDashboard from './components/StaffDashboard';
import dayjs from 'dayjs';
import { StaffSidebar } from '../../services/constants/componentConstants';

const bill = [];

const Index = () => {
  const [open, setOpen] = useState(-1);
  const [billData, setBillData] = useState(bill);
  const current = new Date();
  const date = `${current.getFullYear()}-${(current.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${current.getDate().toString().padStart(2, "0")}`;

  const [selectDate, setSelectDate] = useState(date);
  const loginInfo = JSON.parse(localStorage.getItem("loginInfo"));
  let token;
  if (loginInfo !== null) {
    token = jwtDecode(loginInfo);
  }
  const [temp, setTemp] = useState(0)

  useEffect(()=>{
    setInterval(()=>{
      setTemp((prevTemp)=>prevTemp+1)
    }, 2000)
  }, [])
  
  useEffect(()=>{
    fetchData(selectDate)
  }, [temp])

  // useEffect(() => {
  //   fetchData(date);
  // }, []);

  const handleSearchByDate = () => {
    if (selectDate === null) {
      setBillData(bill);
    } else {
      fetchData(selectDate);
    }
  }

  const fetchData = async (date) => {
    const params = {
      date: dayjs(dayjs(date, "DD/MM/YYYY")).format('YYYY-MM-DD') ===
      "Invalid Date"
        ? date
        : dayjs(dayjs(date, "DD/MM/YYYY")).format('YYYY-MM-DD'),
    };
    try {
      const response = await axiosUrl.post(POST_GET_LIST_BILL_BY_DATE, params);
      const data = [...response.data];
      console.log(data);
      setBillData(data);
    } catch (error) {
      setBillData(bill);
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
      fetchData(selectDate);
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
      fetchData(selectDate);
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
      fetchData(selectDate);
    } catch (error) {
      console.error(`Error at handleCancel: ${error}`);
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      {/* <Navbar /> */}
      <StaffSidebar />
      <StaffDashboard
      handleConfirm={handleConfirm}
      billData={billData}
      open={open}
      setOpen={setOpen}
      handleFinish={handleFinish}
      handleCancel={handleCancel}
      selectDate={selectDate}
      setSelectDate={setSelectDate}
      handleSearchByDate={handleSearchByDate}
      />
    </Box>
  )
}

export default Index
