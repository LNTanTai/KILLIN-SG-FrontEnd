import {
  Box,
  Button,
  CardMedia,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Toolbar,
} from "@mui/material";
import moment from "moment/moment";
import React from "react";

const PaymentList = ({
  setNewAdress,
  newAdress,
  setAddressItem,
  addressItem,
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
      <h1 style={{ paddingLeft: "40px" }}>PHƯƠNG THỨC THANH TOÁN</h1>
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
                      Ngày: {moment(list.timeCreated).format("DD-MM-YYYY")}
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
                      Tổng giá:{" "}
                      {parseFloat(totals[index]).toLocaleString("en-US")} VND
                    </h2>
                  </Grid>
                </Grid>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell style={{ width: "190px" }} align="center">
                        Hình ảnh
                      </TableCell>
                      <TableCell style={{ width: "400px" }}>Món hàng</TableCell>
                      <TableCell>Giá</TableCell>
                      <TableCell>Giá</TableCell>
                      <TableCell>Tổng tiền</TableCell>
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
          <div
            style={{
              marginTop: "2%",
              borderRadius: "10px",
              backgroundColor: "white",
            }}
          >
            <div style={{ padding: "20px" }}>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell>Tổng hàng mua: </TableCell>
                    <TableCell>{totalQuantity}</TableCell>
                  </TableRow>
                </TableBody>
                <TableBody>
                  <TableRow>
                    <TableCell>Phí giao hàng: </TableCell>
                    <TableCell>15,000 VND</TableCell>
                  </TableRow>
                </TableBody>
                <TableBody>
                  <TableRow>
                    <TableCell>Tổng hóa đơn: </TableCell>
                    <TableCell>
                      {(parseFloat(totalPrice) + 15000).toLocaleString("en-US")}{" "}
                      VND
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
                <p>Tên người dùng : {userData.fullName}</p>
                <p>Ngày sinh: {userData.dob}</p>
                <p>Số điện thoại: {userData.phoneNumber}</p>
              </div>
              <div className="cart-table">
                <br/>
                <br/>
                <p>
                  Địa chỉ :{" "}
                  {addressItem === ""
                    ? userData.address
                    : addressItem === "New"
                    ? "Tạo địa chỉ mới"
                    : userData.addressList[userData.addressList.findIndex(obj => obj.addressId === addressItem)].address}{" "}
                </p>
                {addressItem === "New" && (
                  <TextField
                    fullWidth
                    sx={{ pb: 2, pr: 2 }}
                    label="Tạo địa chỉ mới*"
                    id="newAdress"
                    name="newAdress"
                    value={newAdress}
                    onChange={(e) => setNewAdress(e.target.value)}
                  />
                )}
                <FormControl variant="standard" sx={{ width: 160 }} required>
                  <InputLabel id="address-select-label">
                    Chọn địa chỉ
                  </InputLabel>
                  <Select
                    labelId="address-select-label"
                    id="addressItem"
                    value={addressItem}
                    onChange={(event) => {
                      setNewAdress("");
                      setAddressItem(event.target.value);}}
                  >
                    <MenuItem value={"New"}>Tạo mới</MenuItem>
                    {userData.addressList !== undefined &&
                      userData.addressList.map((data, index) => (
                        <MenuItem key={index} value={data.addressId}>
                          Địa chỉ {index + 1}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
              </div>
            </div>
            <div className="cart-2-pay">
              <div className="cart-table">
                <h2>Chọn phương thức thanh toán: </h2>
                <form>
                  <FormControl margin="normal" required>
                    <Select
                      value={paymentMethod}
                      onChange={handlePaymentMethodChange}
                      displayEmpty
                    >
                      <MenuItem value="" disabled>
                        Chọn phương thức
                      </MenuItem>
                      <MenuItem value="cod">Giao hàng tận nơi</MenuItem>
                      <MenuItem value="zalopay">ZaloPay (Đang phát triển)</MenuItem>
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
                  Thanh toán
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
