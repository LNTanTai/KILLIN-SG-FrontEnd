import { CssBaseline, TableContainer, Typography } from '@mui/material'
import {
  CardMedia,
  Grid,
  IconButton,
  Toolbar,
} from "@mui/material";
import React, { useState, useEffect } from 'react'
import { Table, TableHead, TableBody, TableRow, TableCell, Button } from "@mui/material";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { axiosUrl } from '../../../services/api/axios';
import moment from 'moment';
import { Image } from '@mui/icons-material';
import { Box } from "@mui/material";
import { POST_BILL_BY_USERID } from '../../../services/constants/apiConstants';
const BillHistory = () => {
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
      console.log(response);
      console.log(data);
    } catch (err) {
      if (err.response && err.response.status === 404) {
        setError("Hệ thống này đang cập nhật");
      } else {
        console.error(`Error at fetchBill: ${err.message}`);
      }
    }
  }

  return (
    <Box sx={{ paddingTop: 20 }}>
      {orders.length === 0 && error === null ? (
        <Typography variant="h6">
          Lịch sử mua hàng trống
        </Typography>
      ) : (
        orders.map((bill) => (
          <Box sx={{ border: 'solid 1px', margin: ' 10px auto 20px auto', borderRadius: '10px', width: '90%', paddingBottom: '10px' }}>
            <div key={bill.billId} style={{ display: 'flex', flexDirection: 'column', padding: '15px' }}>
              <h1 style={{ paddingLeft: '10px' }}>{moment(bill.timeCreate).format("DD-MM-YYYY")}</h1>
              <TableContainer>


                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Product</TableCell>
                      <TableCell>Payment Status</TableCell>
                      <TableCell>Process Status</TableCell>
                      <TableCell>Total Price</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableCell>
                      {bill.itemList.map((item) => (
                        <img src={item.productImages[0]}
                          style={{
                            height: 100,
                            width: 80,
                            marginRight:10
                          }}
                        ></img>
                      ))}
                    </TableCell>
                    <TableCell>{bill.paymentStatus}</TableCell>
                    <TableCell>{bill.processStatus}</TableCell>
                    <TableCell>{bill.totalPrice}</TableCell>
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </Box>
        ))


      )}
    </Box>
  )
}

export default BillHistory;
