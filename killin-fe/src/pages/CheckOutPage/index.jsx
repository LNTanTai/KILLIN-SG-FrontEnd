import { Box, CssBaseline } from "@mui/material";
import React, { useState, useEffect } from "react";
import CheckOutList from "./components/CheckOutList";
import { axiosUrl } from "../../services/api/axios";
import { POST_GET_USER_BY_PHONENUMBER } from "../../services/constants/apiConstants";
import jwtDecode from "jwt-decode";
import { useLocation } from "react-router-dom";

const Index = () => {
  const [userData, setUserData] = useState([]);
  const location = useLocation();
  const checkOutList = location.state;
  console.log(checkOutList)
  const loginInfo = JSON.parse(localStorage.getItem("loginInfo"));
  let token;
  if (loginInfo !== null) {
    token = jwtDecode(loginInfo);
  }

  useEffect(() => {
    const body = document.querySelector("#root");

    body.scrollIntoView(
      {
        behavior: "auto",
      },
      500
    );
  }, []);

  useEffect(() => {
    console.log(checkOutList.itemList);
    fetchUserByPhoneNumber();
  }, []);

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
      console.log("get API: " + response);
    } catch (error) {
      console.error(`Error at fetchUserByPhoneNumber: ${error}`);
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <CssBaseline />
      <CheckOutList userData={userData} checkOutList={checkOutList} />
    </Box>
  );
};

export default Index;
