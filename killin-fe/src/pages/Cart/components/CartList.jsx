import {
  Box,
  Button,
  CardMedia,
  Grid,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Toolbar,
  TextField,
} from "@mui/material";
import React from "react";
import "./CartList.css";
import moment from "moment/moment";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";

const CartList = ({
  setCartListOrder,
  setCartList,
  setIsChange,
  cartList,
  totals,
  totalPrice,
  totalQuantity,
  handlePayment,
  handleDelete,
  onAdd,
  onMinus,
}) => {
  return (
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
      <Toolbar />
      <h1 data-aos="fade-right" style={{ paddingLeft: "40px" }}>Giỏ hàng của bạn</h1>
      <div data-aos="fade-up" className="cart-container">
        <div className="cart">
          {cartList.length === 0 ? (
            <h2 style={{ margin: "auto%" }}>Chưa có hàng cần thanh toán</h2>
          ) : (
            cartList.map((list, index) => (
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
                        Tổng hóa đơn trong ngày: {totals[index].toLocaleString("en-US")} VND
                      </h2>
                    </Grid>
                  </Grid>
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
                        <TableCell></TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {list.itemList.map((row, index2) => (
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
                          <TableCell xs={12}>
                            <Button onClick={() => onMinus(row, list)}>
                              -
                            </Button>
                            <TextField
                              required
                              id="quantity"
                              name="quantity"
                              value={row.quantity}
                              sx={{ width: 50 }}
                              onFocus={(e) => e.target.select()}
                              onChange={(e) => {
                                if (
                                  e.target.value <=
                                    parseInt(row.availableQuantity) &&
                                  e.target.value > 0
                                ) {
                                  const exist = cartList.find(
                                    (x) => x.orderId === list.orderId
                                  );
                                  setCartListOrder(list);
                                  setCartList(
                                    cartList.map((child) => {
                                      return child.orderId === list.orderId
                                        ? {
                                            ...exist,
                                            itemList: child.itemList.map(
                                              (children) =>
                                                children.id === row.id
                                                  ? {
                                                      ...children,
                                                      quantity: `${e.target.value}`,
                                                    }
                                                  : children
                                            ),
                                            totalQuantity:
                                              parseInt(row.quantity) >
                                              parseInt(e.target.value)
                                                ? `${
                                                    parseInt(
                                                      child.totalQuantity
                                                    ) -
                                                    (parseInt(row.quantity) -
                                                      parseInt(e.target.value))
                                                  }`
                                                : `${
                                                    parseInt(
                                                      child.totalQuantity
                                                    ) +
                                                    (parseInt(e.target.value) -
                                                      parseInt(row.quantity))
                                                  }`,
                                          }
                                        : child;
                                    })
                                  );
                                  setIsChange(true);
                                }
                              }}
                              inputProps={{ maxLength: 2 }}
                            />
                            <Button onClick={() => onAdd(row, list)}>+</Button>
                          </TableCell>
                          <TableCell>
                            {parseFloat(
                              row.quantity * row.price
                            ).toLocaleString("en-US")}{" "}
                            VND
                          </TableCell>
                          <TableCell>
                            <IconButton
                              size="large"
                              color="error"
                              onClick={() => {
                                handleDelete(row.id, list.orderId);
                              }}
                            >
                              <DeleteOutlinedIcon />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            ))
          )}
          {cartList.length === 0 ? (
            <></>
          ) : (
            <div className="cart-2">
              <div className="cart-table">
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell>Tổng số hàng mua: </TableCell>
                      <TableCell>{totalQuantity}</TableCell>
                    </TableRow>
                  </TableBody>
                  <TableBody>
                    <TableRow>
                      <TableCell>Tổng hóa đơn: </TableCell>
                      <TableCell>
                        {parseFloat(totalPrice).toLocaleString("en-US")} VND
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  marginTop: 12,
                }}
              >
                {/* {console.log(cartList.length)} */}
                {cartList.length === 0 ? (
                  <></>
                ) : (
                  <Button
                    onClick={() => handlePayment()}
                    variant="contained"
                    style={{ width: "170px" }}
                  >
                    Đặt hàng
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </Box>
  );
};

export default CartList;
