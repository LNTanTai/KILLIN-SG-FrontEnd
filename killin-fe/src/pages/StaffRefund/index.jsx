import { Box, CssBaseline } from '@mui/material'
import React, { useEffect, useState } from 'react'
import StaffRefundDashboard from './components/StaffRefundDashboard'
import { StaffSidebar } from '../../services/constants/componentConstants'
import { axiosUrl } from '../../services/api/axios'
import { POST_GET_ALL_REFUND, POST_UPDATE_REFUND_STATUS } from '../../services/constants/apiConstants'

const Index = () => {
  const [refundList, setRefundList] = useState([]);
  const [temp, setTemp] = useState(0)

  useEffect(()=>{
    setInterval(()=>{
      setTemp((prevTemp)=>prevTemp+1)
    }, 2000)
  }, [])
  
  useEffect(()=>{
    fetchData()
  }, [temp])

  const fetchData = async () => {
    const params = {};
    try {
      const response = await axiosUrl.post(POST_GET_ALL_REFUND, params);
      const data = [...response.data];
      console.log(data);
      setRefundList(data);
    } catch (error) {
      console.error(`Error at fetchData: ${error}`);
    }
  };

  const handleFinish = async (id) => {
    const params = {
      refundId: id,
      status: "Accept",
    };
    try {
      const response = await axiosUrl.post(POST_UPDATE_REFUND_STATUS, params);
      // const data = [...response.data];
      console.log(response);
      fetchData();
    } catch (error) {
      console.error(`Error at handleFinish: ${error}`);
    }
  };

  const handleCancel = async (id) => {
    const params = {
      refundId: id,
      status: "Cancel",
    };
    try {
      const response = await axiosUrl.post(POST_UPDATE_REFUND_STATUS, params);
      // const data = [...response.data];
      console.log(response);
      fetchData();
    } catch (error) {
      console.error(`Error at handleCancel: ${error}`);
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <StaffSidebar />
      <StaffRefundDashboard handleCancel={handleCancel} handleFinish={handleFinish} refundList={refundList} />
    </Box>
  )
}

export default Index
