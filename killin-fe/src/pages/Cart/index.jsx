import { Box, CssBaseline } from "@mui/material";
import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import CartList from "./components/CartList";
import { axiosUrl } from "../../services/api/axios";
import {
  POST_DELETE_CART,
  POST_ORDER_USER,
} from "../../services/constants/apiConstants";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { PAYMENT_PATH } from "../../services/constants/pathConstants";

const Index = () => {
  const [cartList, setCartList] = useState([]);
  const [totals, setTotals] = useState([]);

  const loginInfo = JSON.parse(localStorage.getItem("loginInfo"));
  let token;
  if (loginInfo !== null) {
    token = jwtDecode(loginInfo);
  }
  const navigate = useNavigate();

  // const cartStorage = JSON.parse(localStorage.getItem("ok"))

  useEffect(() => {
    fetchData();
  }, []);

  const onAdd = async (data, index2, list) => {
    const exist = cartList.find(
      (x) => x.itemList[index2].id === list.itemList[index2].id
    );

    if (exist) {
      setCartList(
        cartList.map((child) => {
          return child.itemList[index2].id === list.itemList[index2].id
            ? {
                ...exist,
                itemList: child.itemList.map((children) =>
                  children.id === data.id
                    ? {
                        ...children,
                        quantity: `${parseInt(data.quantity) + 1}`,
                      }
                    : children
                ),
              }
            : child;
        })
      );
    }
  };

  const onMinus = () => {};

  const handleDelete = async (orderDetailId, orderIdd) => {
    const params = {
      orderDetailId: orderDetailId,
      orderId: orderIdd,
    };
    console.log(params);
    try {
      const response = await axiosUrl.post(POST_DELETE_CART, params);
      // const data = [...response.data];
      // setCartList(data);
      // localStorage.setItem("ok", JSON.stringify(data));
      console.log(response);

      fetchData();
    } catch (error) {
      console.error(`Error at fetchData: ${error}`);
    }
  };

  const fetchData = async () => {
    const params = {
      userId: token.userId,
    };
    try {
      const response = await axiosUrl.post(POST_ORDER_USER, params);
      const data = [...response.data];
      setCartList(data);
      // localStorage.setItem("ok", JSON.stringify(data));
      // console.log(cartStorage)
      setTotals([]);
      data.forEach((element) => {
        const total = element.itemList.reduce(
          (previousScore, currentScore, index) =>
            previousScore +
            parseFloat(currentScore.quantity * currentScore.price),
          0
        );
        setTotals((totals) => [...totals, total]);
      });
    } catch (error) {
      console.error(`Error at fetchData: ${error}`);
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

  const handlePayment = () => {
    navigate(`/user/${PAYMENT_PATH}`, { state: cartList });
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <CssBaseline />
      {/* {console.log(cartList)} */}
      <CartList
        cartList={cartList}
        totals={totals}
        totalPrice={totalPrice}
        totalQuantity={totalQuantity}
        handlePayment={handlePayment}
        handleDelete={handleDelete}
        onAdd={onAdd}
        onMinus={onMinus}
      />
    </Box>
  );
};

export default Index;
