import { Box, CssBaseline } from "@mui/material";
import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import AdminDashboard from "./components/AdminDashboard";
import { axiosUrl } from "../../services/api/axios";
import { GET_ACCOUNT } from "../../services/constants/apiConstants";

const account = [];

const Index = () => {
  const [accountList, setAccountList] = useState(account);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const params = {};
    try {
      const response = await axiosUrl.post(GET_ACCOUNT, params);
      const data = [...response.data];
      console.log(data);
      setAccountList(data);
    } catch (error) {
      console.error(`Error at fetchData: ${error}`);
    }
  };
  
  return (
    <Box sx={{ display: "flex" , flexDirection: "column"}}>
      <CssBaseline />
      {/* <Navbar /> */}
      <AdminDashboard
      />
    </Box>
  );
};

export default Index;
