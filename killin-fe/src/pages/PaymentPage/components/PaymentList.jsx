import {
  Box,
  Button,
  CardMedia,
  FormControl,
  Grid,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Toolbar,
} from "@mui/material";
import moment from "moment/moment";
import React from "react";

const PaymentList = ({
  totalQuantity,
  totalPrice,
  paymentMethod,
  handlePaymentMethodChange,
  userData,
  totals,
  cartList,
  handlePayment,
}) => {
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
                      Total Price: {parseFloat(totals[index]).toLocaleString("en-US")} VND
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
          <div style={{ marginTop: "2%" ,borderRadius: "10px" , backgroundColor: "white"}}>
          <div style={{padding: "20px"}}>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell>Total Items: </TableCell>
                  <TableCell>{totalQuantity}</TableCell>
                </TableRow>
              </TableBody>
              <TableBody>
                <TableRow>
                  <TableCell>Total Bill: </TableCell>
                  <TableCell>
                    {parseFloat(totalPrice).toLocaleString("en-US")} VND
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <div className="cart-3-pay">
              <div className="cart-table">
                <h1>Thông tin người nhận: </h1>
                {/* {console.log(userData)} */}
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
                <Button
                  onClick={() => handlePayment()}
                  variant="contained"
                  style={{ width: "170px" }}
                >
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

export default PaymentList;
