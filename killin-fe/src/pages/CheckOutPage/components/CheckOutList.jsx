import { Box, Toolbar } from "@mui/material";
import moment from "moment";
import React from "react";

const CheckOutList = ({userData,checkOutList}) => {
  return (
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
      <Toolbar />
      <h1 style={{ paddingLeft: "40px" }}>CHECKOUT</h1>
      <div className="cart-container">
        <div style={{ display: 'flex', flexDirection: 'row' }}>
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
              <h2>Mã đơn hàng: {checkOutList.billId}</h2>
              <p>Thời gian tạo: {moment(checkOutList.timeCreate).format("DD/MM/YYYY hh:mm A")}</p>
              <p>Tổng thanh toán: {parseFloat(checkOutList.totalPrice).toLocaleString("en-US")} VND</p>
              <p>Phương thức thanh toán: {checkOutList.paymentStatus === "Unpaid"? "Thanh toán khi giao hàng": "Đã thanh toán bằng ZaloPay"}</p>
            </div>
          </div>
        </div>
        <div className="cart">
          {/* {cartList.map((list, index) => (
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
          ))} */}
        </div>
      </div>
    </Box>
  );
};

export default CheckOutList;
