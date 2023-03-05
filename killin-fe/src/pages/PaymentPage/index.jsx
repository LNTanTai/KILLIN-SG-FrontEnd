import { Box, CssBaseline } from "@mui/material";
import React, { useEffect, useState } from "react";
import PaymentList from "./components/PaymentList";
import { useLocation } from "react-router-dom";
import jwtDecode from "jwt-decode";
import { axiosUrl } from "../../services/api/axios";
import { POST_CREATE_BILL } from "../../services/constants/apiConstants";

const Index = () => {
  const location = useLocation();
  const cartList = location.state;
  const loginInfo = JSON.parse(localStorage.getItem("loginInfo"));
  let token;
  if (loginInfo !== null) {
    token = jwtDecode(loginInfo);
  }

  useEffect(() => {
    // fetchData();
  }, []);

  const payment = async () => {
    let data = [];
    cartList.forEach((element1) => {
      element1.itemList.forEach((element) => {
        data.push({
          orderDetailId: element.id,
          quantity: element.quantity,
        },);
      });
    });
    const params = {
      userId: token.userId,
      orderDetailList: data,
    };
    console.log(params);
    try {
      const response = await axiosUrl.post(POST_CREATE_BILL, params);
      // const data = [...response.data];
      console.log(response.data);
      // console.log(data);
      localStorage.setItem("ko", response.data);
    } catch (error) {
      console.error(`Error at fetchData: ${error}`);
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <CssBaseline />
      {/* {console.log(orderDetailList)} */}
      
      <PaymentList payment={payment}/>
      {/* {console.log(orderDetailList1)} */}
    </Box>
  );
};

export default Index;
