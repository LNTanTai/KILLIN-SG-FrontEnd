
import { CssBaseline, Box } from '@mui/material'
import { Footer } from '../../services/constants/componentConstants'
import React, { useEffect, useState } from 'react'
import BillHistory from './component/BillHistory'
import jwtDecode from 'jwt-decode';
import { axiosUrl } from '../../services/api/axios';
import { POST_GET_LIST_BILL_BY_USERID } from '../../services/constants/apiConstants';

const Index = () => {
  const loginInfo = JSON.parse(localStorage.getItem("loginInfo"));
  let token;
  if (loginInfo !== null) {
    token = jwtDecode(loginInfo);
  }

  // useEffect(() => {
  //   fetchData();
  // }, []);

  // const fetchData = async () => {
  //   const params = {
  //     userId: token.userId,
  //   };
  //   try {
  //     const response = await axiosUrl.post(POST_GET_LIST_BILL_BY_USERID, params);
  //     const data = [...response.data];
  //     console.log(data);
  //   } catch (error) {
  //     console.error(`Error at fetchData: ${error}`);
  //   }
  // };
  
  return (
    <Box>
      <CssBaseline />
      <BillHistory></BillHistory>
      <Footer></Footer>
    </Box>
  );
}

export default Index