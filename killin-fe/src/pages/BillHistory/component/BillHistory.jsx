import { Button, Collapse, CssBaseline, TableContainer, Typography } from "@mui/material";
import { CardMedia, Grid, IconButton, Toolbar } from "@mui/material";
import React, { useState, useEffect } from "react";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";
import moment from "moment";
import { Box } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

const BillHistory = ({userName, handleCancel, open, setOpen, error, orders }) => {
  return (
    <Box sx={{ paddingTop: 10 }}>
      <h1 style={{ paddingLeft: "80px" }}>Lịch sử mua hàng</h1>
      {orders.length === 0 && error === null ? (
        <Typography variant="h6">Lịch sử mua hàng trống</Typography>
      ) : (
        orders.map((bill, index) => (
          <Box
            sx={{
              border: "solid 1px",
              margin: " 10px auto 20px auto",
              borderRadius: "10px",
              width: "90%",
              paddingBottom: "10px",
            }}
            key={index}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                padding: "15px",
              }}
            >
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
                    Ngày: {moment(bill.timeCreate).format("DD-MM-YYYY")} -{" "}
                    {moment(bill.timeCreate).format("hh:mm A")}
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
                    {bill.processStatus === "Đã giao hàng" ||
                    bill.processStatus === "Cancel" ? (
                      <></>
                    ) : (
                      <Button
                        variant="contained"
                        sx={{ width: "120px", height: "35px" }}
                        onClick={() => {
                          handleCancel(bill.billId);
                        }}
                      >
                        Hủy
                      </Button>
                    )}
                  </h2>
                </Grid>
              </Grid>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell align="center"></TableCell>
                      <TableCell align="left">Mã đơn hàng</TableCell>
                      <TableCell align="left">Trạng thái thanh toán</TableCell>
                      <TableCell align="left">Trạng thái đơn hàng</TableCell>
                      <TableCell align="left">Tổng thanh toán</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell>
                        <IconButton
                          onClick={() => setOpen(open === index ? -1 : index)}
                        >
                          {open === index ? (
                            <KeyboardArrowUpIcon />
                          ) : (
                            <KeyboardArrowDownIcon />
                          )}
                        </IconButton>
                      </TableCell>
                      <TableCell>{bill.billId}</TableCell>
                      <TableCell>{bill.paymentStatus}</TableCell>
                      <TableCell>{bill.processStatus}</TableCell>
                      <TableCell>{parseFloat(bill.totalPrice).toLocaleString("en-US")} VND</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell colSpan={10} sx={{ pb: 0, pt: 0, b: 0 }}>
                        <Collapse
                          in={open === index}
                          timeout="auto"
                          unmountOnExit
                        >
                          {bill.updatedList.length === 0? <></> : (<h2>Thông tin giao hàng:</h2>)}
                          {bill.updatedList.length === 0? <></> : (
                              <Table size="medium">
                            <TableHead>
                              <TableRow>
                                <TableCell align="left">Người cập nhật</TableCell>
                                <TableCell align="left">Ngày cập nhật</TableCell>
                                <TableCell align="left">Thời gian cập nhật</TableCell>
                                <TableCell align="left">Trạng thái cập nhật</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                            {bill.updatedList.map((staff, index2) => (
                              <TableRow key={index2}>
                                <TableCell align="left">
                                {staff.staffName} {staff.staffName === userName? "(Khách hàng)": "(Nhân viên)"}
                                </TableCell>
                                <TableCell align="left">
                                {moment(staff.updatedAt).format("DD/MM/YYYY")}
                                </TableCell>
                                <TableCell align="left">
                                {moment(staff.updatedAt).format("hh:mm A")}
                                </TableCell>
                                <TableCell align="left">
                                  {staff.processAfter}
                                </TableCell>
                              </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                            
                          )}
                          <br/>
                          <h2>Thông tin sản phẩm:</h2>
                          <Table size="medium" aria-label="purchases">
                            <TableHead>
                              <TableRow>
                                <TableCell align="left">Ảnh</TableCell>
                                <TableCell align="left">Tên sản phẩm</TableCell>
                                <TableCell align="left">Số lượng</TableCell>
                                <TableCell align="left">Đơn giá</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {bill.itemList.map((child , index2) => (
                                <TableRow key={index2}>
                                  <TableCell align="left">
                                  <CardMedia
                                      component="img"
                                      alt="productImages"
                                      image={child.productImages[0]}
                                      title="productImages"
                                      sx={{ width: "50px" }}
                                    ></CardMedia>
                                  </TableCell>
                                  <TableCell align="left">
                                  {child.productName}
                                  </TableCell>
                                  <TableCell align="left">
                                    {child.quantity}
                                  </TableCell>
                                  <TableCell align="left">
                                    {parseFloat(child.currentPrice).toLocaleString("en-US")} VND
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </Collapse>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </Box>
        ))
      )}
    </Box>
  );
};

export default BillHistory;
