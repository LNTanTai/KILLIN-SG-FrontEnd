import {
  Box,
  Button,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Toolbar,
} from "@mui/material";
import React from "react";
import "./CartList.css";

const CartList = () => {
  return (
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
      <Toolbar />
      <h1 style={{ paddingLeft: "40px" }}>Your shopping cart</h1>
      <div className="cart-container">
        <div className="cart">
          <div className="cart-1">
            <div>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell><Checkbox /></TableCell>
                    <TableCell style={{ width: "400px" }}>Item</TableCell>
                    <TableCell>Price</TableCell>
                    <TableCell>Quantity</TableCell>
                    <TableCell>Total</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                  <TableCell><Checkbox /></TableCell>
                    <TableCell style={{ width: "400px" }}>
                      Sản phẩm abc
                    </TableCell>
                    <TableCell>10$</TableCell>
                    <TableCell>10</TableCell>
                    <TableCell>100$</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
            <div className="cart-1-button">
              <Button variant="contained" color="success">
                Update cart
              </Button>
            </div>
          </div>
          <div className="cart-2">
            <div className="cart-table">
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell>Total Items: </TableCell>
                    <TableCell>10$ </TableCell>
                  </TableRow>
                </TableBody>
                <TableBody>
                  <TableRow>
                    <TableCell>Tax total: </TableCell>
                    <TableCell>1$ </TableCell>
                  </TableRow>
                </TableBody>
                <TableBody>
                  <TableRow>
                    <TableCell>Total Bill: </TableCell>
                    <TableCell>1000$</TableCell>
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
              <Button variant="contained" style={{ width: "170px" }}>
                Check out
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Box>
  );
};

export default CartList;
