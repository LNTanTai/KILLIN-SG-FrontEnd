import { Box, CssBaseline } from '@mui/material'
import React, { useEffect, useState } from 'react'
import UserRefundTable from './components/UserRefundTable'
import { UserSidebar } from '../../services/constants/componentConstants'
import jwtDecode from 'jwt-decode'
import { POST_GET_REFUND_BY_USER_ID } from '../../services/constants/apiConstants'
import { axiosUrl } from '../../services/api/axios'

const Index = () => {
  const [refundList, setRefundList] = useState([]);
  const loginInfo = JSON.parse(localStorage.getItem("loginInfo"));
  let token;
  if (loginInfo !== null) {
    token = jwtDecode(loginInfo);
  };

  const [temp, setTemp] = useState(0);

  useEffect(()=>{
    setInterval(()=>{
      setTemp((prevTemp)=>prevTemp+1)
    }, 2000)
  }, []);
  
  useEffect(()=>{
    fetchRefund();
  }, [temp]);

  const fetchRefund = async () => {
    const params = {
      userId: token.userId,
    };
    try {
      const response = await axiosUrl.post(POST_GET_REFUND_BY_USER_ID, params);
      const data = {...response.data};
      setRefundList(data.refundList);
      console.log(data.refundList);
    } catch (err) {
      console.error(`Error at fetchRefund: ${err.message}`);
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <UserSidebar/>
      <UserRefundTable refundList={refundList}/>
    </Box>
  )
}

export default Index
