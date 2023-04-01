import {
  Box,
  CardMedia,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Toolbar,
} from "@mui/material";
import moment from "moment";
import React from "react";

const CheckOutList = ({ userData, checkOutList }) => {
  return (
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
      <Toolbar />
      <h1 data-aos="fade-right" style={{ paddingLeft: "40px" }}>HÓA ĐƠN THANH TOÁN</h1>
      <div className="cart-container">
        <div style={{ display: "flex", flexDirection: "row" }}>
          <div data-aos="fade-right" className="cart-3-pay">
            <div className="cart-table">
              <h1>Thông tin người nhận: </h1>
              <p>Tên người dùng : {userData.fullName}</p>
              <p>Ngày sinh: {userData.dob}</p>
              <p>Số điện thoại: {userData.phoneNumber}</p>
              <p>Địa chỉ : {checkOutList.address}</p>
            </div>
          </div>
          <div data-aos="fade-left" className="cart-2-pay">
            <div className="cart-table">
              <h2>Mã đơn hàng: {checkOutList.billId}</h2>
              <p>
                Thời gian tạo:{" "}
                {moment(checkOutList.timeCreate).format("DD/MM/YYYY hh:mm A")}
              </p>
              <p>
                Phí giao hàng: 15,000 VND
              </p>
              <p>
                Phí thanh toán:{" "}
                {(parseFloat(checkOutList.totalPrice) + 15000).toLocaleString("en-US")}{" "}
                VND
              </p>
              <p>
                Phương thức thanh toán:{" "}
                {checkOutList.paymentStatus === "Unpaid"
                  ? "Thanh toán khi giao hàng"
                  : "Đã thanh toán bằng ZaloPay"}
              </p>
            </div>
          </div>
        </div>
        <div className="cart">
          <div data-aos="fade-up" className="cart-1">
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell style={{ width: "190px" }} align="center">
                    Hình ảnh
                  </TableCell>
                  <TableCell style={{ width: "400px" }}>Item</TableCell>
                  <TableCell>Giá</TableCell>
                  <TableCell>Số lượng</TableCell>
                  <TableCell>Tổng</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {checkOutList.itemList.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>
                      <CardMedia
                        component="img"
                        alt="ok"
                        image={row.productImages[0]}
                        title="ok"
                        sx={{ width: "200px" }}
                      ></CardMedia>
                    </TableCell>
                    <TableCell style={{ width: "400px" }}>
                      {row.productName}
                    </TableCell>
                    <TableCell>
                      {parseFloat(row.currentPrice).toLocaleString("en-US")} VND
                    </TableCell>
                    <TableCell>{row.quantity}</TableCell>
                    <TableCell>
                      {parseFloat(row.quantity * row.currentPrice).toLocaleString(
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
      </div>
    </Box>
  );
};

export default CheckOutList;
