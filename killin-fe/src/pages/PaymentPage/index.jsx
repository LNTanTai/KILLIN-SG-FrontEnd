import { Box, CssBaseline } from "@mui/material";
import React, { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import { axiosUrl } from "../../services/api/axios";
import {
  POST_CREATE_BILL,
  POST_GET_USER_BY_PHONENUMBER,
} from "../../services/constants/apiConstants";
import { useLocation, useNavigate } from "react-router-dom";

import { CHECKOUT_PATH } from "../../services/constants/pathConstants";
import Navbar from "../../components/Navbar";
import PaymentList from "./components/PaymentList";

const Index = () => {
  const [paymentMethod, setPaymentMethod] = useState("");
  const [userData, setUserData] = useState([]);
  const location = useLocation();
  const cartList = location.state;
  const [addressItem, setAddressItem] = useState("");
  const [totals, setTotals] = useState([]);
  const loginInfo = JSON.parse(localStorage.getItem("loginInfo"));
  let token;
  if (loginInfo !== null) {
    token = jwtDecode(loginInfo);
  }
  const navigate = useNavigate();
  const [newAdress, setNewAdress] = useState("");
  // useEffect(() => {
  //   // fetchData();
  //   console.log("user phonenumber: " + token.phoneNumber);
  // }, []);

  useEffect(() => {
    setTotals([]);
    cartList.forEach((element) => {
      const total = element.itemList.reduce(
        (previousScore, currentScore, index) =>
          previousScore +
          parseFloat(currentScore.quantity * currentScore.price),
        0
      );
      setTotals((totals) => [...totals, total]);
    });
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
      console.log(data);
      setUserData(data);
      // console.log("get API: " + response);
    } catch (error) {
      console.error(`Error at fetchUserByPhoneNumber: ${error}`);
    }
  };

  const totalPrice = totals.reduce(
    (previousScore, currentScore, index) => previousScore + currentScore,
    0
  );

  const totalQuantity = cartList.reduce(
    (previousScore, currentScore, index) =>
      previousScore + parseInt(currentScore.totalQuantity),
    0
  );

  const handlePayment = async () => {
    let data = [];
    cartList.forEach((element1) => {
      element1.itemList.forEach((element) => {
        data.push({
          orderDetailId: element.id,
          quantity: element.quantity,
        });
      });
    });
    const params = {
      userId: token.userId,
      orderDetailList: data,
      addressId: addressItem === "New"? "" : addressItem === ""? userData.addressList[0].addressId : addressItem,
      // addressId: "",
      newAddress: addressItem === "New"? newAdress: "",
    };
    console.log(params);
    try {
      const response = await axiosUrl.post(POST_CREATE_BILL, params);
      // const data = [...response.data];
      console.log(response.data);
      // console.log(data);
      // localStorage.setItem("ko", response.data);
      navigate(
        `/user/${CHECKOUT_PATH}`,
        { state: {checkOutList: response.data, notify: "Thanh toán thành công"}, replace: true },
      );
    } catch (error) {
      console.error(`Error at fetchData: ${error}`);
    }
  };

  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      {/* {console.log(totals)} */}
      <CssBaseline />
      {/* <Navbar /> */}
      <PaymentList
      setNewAdress={setNewAdress}
      newAddress={newAdress}
        setAddressItem={setAddressItem}
        addressItem={addressItem}
        totalQuantity={totalQuantity}
        totalPrice={totalPrice}
        handlePaymentMethodChange={handlePaymentMethodChange}
        paymentMethod={paymentMethod}
        userData={userData}
        totals={totals}
        cartList={cartList}
        handlePayment={handlePayment}
      />
    </Box>
  );
};

export default Index;
