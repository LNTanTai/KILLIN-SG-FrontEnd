
import { CssBaseline, Box } from '@mui/material'
import { Footer } from '../../services/constants/componentConstants'
import React, { useEffect, useState } from 'react'
import BillHistory from './component/BillHistory'
import jwtDecode from 'jwt-decode';
import { axiosUrl } from '../../services/api/axios';
import { POST_BILL_BY_USERID, POST_UPDATE_BILL_STATUS } from '../../services/constants/apiConstants';

const Index = () => {
  const [open, setOpen] = useState(-1);
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);
  const loginInfo = JSON.parse(localStorage.getItem("loginInfo"));
  let token;
  if (loginInfo !== null) {
    token = jwtDecode(loginInfo);
  }
  useEffect(() => {
    fetchBill();
  }, []);

  const fetchBill = async () => {
    const params = {
      userId: token.userId,
    };
    try {
      const response = await axiosUrl.post(POST_BILL_BY_USERID, params);
      const data = [...response.data];
      setOrders(data);
      console.log(data);
    } catch (err) {
      if (err.response && err.response.status === 404) {
        setError("Hệ thống này đang cập nhật");
      } else {
        console.error(`Error at fetchBill: ${err.message}`);
      }
    }
  }

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
      fetchBill();
    } catch (error) {
      console.error(`Error at handleCancel: ${error}`);
    }
  };

  
  return (
    <Box>
      <CssBaseline />
      <BillHistory userName={token.fullName} handleCancel={handleCancel} open={open} setOpen={setOpen} error={error} orders={orders} />
      <Footer></Footer>
    </Box>
  );
}

export default Index