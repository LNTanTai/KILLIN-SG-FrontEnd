import { Box, CssBaseline, Toolbar } from "@mui/material";
import React, { useEffect, useState } from "react";
import PaymentList from "./components/PaymentList";
import jwtDecode from "jwt-decode";
import { axiosUrl } from "../../services/api/axios";
import { POST_CREATE_BILL, POST_GET_USER_BY_PHONENUMBER } from "../../services/constants/apiConstants";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom";
import {
  Button,
  CardMedia,
  Grid,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { CHECKOUT_PATH, PAYMENT_PATH } from "../../services/constants/pathConstants";
import { POST_ORDER_USER } from "../../services/constants/apiConstants";
import moment from "moment/moment";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";

const Index = () => {
  const [paymentMethod, setPaymentMethod] = useState("");
  const [userData, setUserData] = useState([]);
  // const cartList = location.state;
  const [cartList, setCartList] = useState([]);
  const [totals, setTotals] = useState([]);
  const loginInfo = JSON.parse(localStorage.getItem("loginInfo"));
  let token;
  if (loginInfo !== null) {
    token = jwtDecode(loginInfo);
  }
  const navigate = useNavigate();
  useEffect(() => {
    fetchData();
    console.log("user phonenumber: " + token.phoneNumber);
  }, []);

  useEffect(() => {
    fetchUserByPhoneNumber();
  },[]);
  const fetchUserByPhoneNumber = async () => {
    const params = {
      phoneNumber: token.phoneNumber,
    };
    try {
      const response = await axiosUrl.post(POST_GET_USER_BY_PHONENUMBER, params);
      const data = {...response.data};
      setUserData(data);
      console.log("get API: " + response);
    } catch (error) {
      console.error(`Error at fetchUserByPhoneNumber: ${error}`);
    }
  }

  const fetchData = async () => {
    const params = {
      userId: token.userId,
    };
    try {
      const response = await axiosUrl.post(POST_ORDER_USER, params);
      const data = [...response.data];
      setCartList(data);
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
    navigate(`/user/${CHECKOUT_PATH}`, { state: cartList });
  }

  const payment = async () => {
    let data = [];
    cartList.forEach((element1) => {
      element1.itemList.forEach((element) => {
        data.push({
          orderDetailId: element1.orderId,
          quantity: element.quantity,
        },);
      });
    });
    const params = {
      userId: token.userId,
      orderDetailList: data,
    };
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
  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  return (
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
      <Toolbar />
      <h1 style={{ paddingLeft: "40px" }}>PAYMENT</h1>
      <div className="cart-container">
        <div className="cart">
          {cartList.map((list, index) => (
            <div key={list.orderId} className="cart-1">
              <div>
                <Grid
                  sx={{ flexGrow: 1 }}
                  container
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                  spacing={2}
                >
                  <Grid item xs={6}>
                    <h2 style={{ marginLeft: 15, flexGrow: 1 }}>
                      Date: {moment(list.timeCreated).format("DD-MM-YYYY")}
                    </h2>
                  </Grid>
                  <Grid item xs={6}>
                    <h2
                      style={{
                        flexGrow: 1,
                        textAlign: "right",
                        marginRight: 20,
                      }}
                    >
                      Total Price: {totals[index].toLocaleString("en-US")} VND
                    </h2>
                  </Grid>
                </Grid>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell style={{ width: "190px" }} align="center">
                        Image
                      </TableCell>
                      <TableCell style={{ width: "400px" }}>Item</TableCell>
                      <TableCell>Price</TableCell>
                      <TableCell>Quantity</TableCell>
                      <TableCell>Total</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {list.itemList.map((row) => (
                      <TableRow key={row.id}>
                        <TableCell>
                          <CardMedia
                            component="img"
                            alt="ok"
                            image={row.image}
                            title="ok"
                            sx={{ width: "200px" }}
                          ></CardMedia>
                        </TableCell>
                        <TableCell style={{ width: "400px" }}>
                          {row.productName}
                        </TableCell>
                        <TableCell>
                          {parseFloat(row.price).toLocaleString("en-US")} VND
                        </TableCell>
                        <TableCell>{row.quantity}</TableCell>
                        <TableCell>
                          {parseFloat(row.quantity * row.price).toLocaleString(
                            "en-US"
                          )}{" "}
                          VND
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          ))}
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <div className="cart-3-pay">
              <div className="cart-table">
                <h1>Thông tin người nhận: </h1>
                {console.log(userData)}
                <p>Tên người dùng : {userData.fullName}</p>
                <p>Ngày sinh: {userData.dob}</p>
                <p>Số điện thoại: {userData.phoneNumber}</p>
                <p>Địa chỉ : {userData.address}</p>
              </div>
            </div>
            <div className="cart-2-pay">
              <div className="cart-table">
                <h2>Choose method payment: </h2>
                <form>
                  <FormControl margin="normal" required>
                    <Select
                      value={paymentMethod}
                      onChange={handlePaymentMethodChange}
                      displayEmpty
                    >
                      <MenuItem value="" disabled>
                        Select payment method
                      </MenuItem>
                      <MenuItem value="cod">Delivery</MenuItem>
                      <MenuItem value="zalopay">ZaloPay</MenuItem>
                    </Select>
                  </FormControl>
                </form>
              </div>
              <div
                style={{
                  paddingRight: "125px",
                  marginTop: 15,
                }}
              >
                <Button onClick={() => handlePayment()} variant="contained" style={{ width: "170px" }}>
                  Pay
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Box>

  );
};

export default Index;
