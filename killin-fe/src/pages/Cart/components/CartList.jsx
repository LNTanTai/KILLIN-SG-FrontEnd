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
} from "@mui/material";
import React from "react";
import "./CartList.css";
import moment from "moment/moment";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";

const CartList = ({
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
      <h1 style={{ paddingLeft: "40px" }}>Your shopping cart</h1>
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
                        <TableCell>
                          <Button onClick={() => onAdd(row, index2, list )}>+</Button>
                          {row.quantity}
                          <Button onClick={() => onMinus()}>-</Button>
                        </TableCell>
                        <TableCell>
                          {parseFloat(row.quantity * row.price).toLocaleString(
                            "en-US"
                          )}{" "}
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

              {/* <div className="cart-1-button">
              <Button variant="contained" color="success">
                Update cart
              </Button>
            </div> */}
            </div>
          ))}
          <div className="cart-2">
            <div className="cart-table">
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
                  Check out
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </Box>
  );
};

export default CartList;
