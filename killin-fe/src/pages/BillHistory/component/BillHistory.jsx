import {
  Button,
  Collapse,
  CssBaseline,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TableContainer,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { CardMedia, Grid, IconButton } from "@mui/material";
import React from "react";
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
import CloseIcon from "@mui/icons-material/Close";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Footer } from "../../../services/constants/componentConstants";
import DeliveryDiningRoundedIcon from "@mui/icons-material/DeliveryDiningRounded";

const BillHistory = ({
  refundList,
  handleSubmit,
  handleUrlChange,
  handleUrlRemove,
  handleUrlAdd,
  selectedProduct,
  setQuantity,
  quantity,
  onMinus,
  onAdd,
  handleChange,
  values,
  openDialog,
  handleCloseDialog,
  handleClickOpenDialog,
  userName,
  handleCancel,
  open,
  setOpen,
  error,
  orders,
}) => {
  return (
    <Box component="main" sx={{ flexGrow: 1, paddingTop: 5 }}>
      <Toolbar />
      <h1 data-aos="fade-right" style={{ paddingLeft: "80px" }}>Lịch sử mua hàng</h1>
      {orders.length === 0 && error === null ? (
        <Typography data-aos="fade-right" variant="h5" sx={{ml: 10}}>Chưa có đơn hàng</Typography>
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
            data-aos="fade-right"
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
                <Grid item xs={5}>
                  <h2 style={{ marginLeft: 15, flexGrow: 1 }}>
                    Ngày: {moment(bill.timeCreate).format("DD-MM-YYYY")} -{" "}
                    {moment(bill.timeCreate).format("hh:mm A")}
                  </h2>
                </Grid>
                <Grid item xs={7}>
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
                        sx={{ width: "155px", height: "35px" }}
                        onClick={() => {
                          handleCancel(bill.billId);
                        }}
                      >
                        Hủy đơn hàng
                      </Button>
                    )}
                    {bill.processStatus !== "Đã giao hàng" ||
                    bill.processStatus === "Cancel" ? (
                      <></>
                    ) : (
                      bill.canRefund === "Y" && (
                        <Typography
                          sx={{ color: "#E28413" }}
                          variant="body6"
                          color="textSecondary"
                        >
                          Đổi trả hàng trước 7 ngày sau khi nhận hàng
                        </Typography>
                      )
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
                      {bill.processStatus !== "Cancel" && (
                        <TableCell align="left">
                          Trạng thái thanh toán
                        </TableCell>
                      )}
                      <TableCell align="left">Trạng thái đơn hàng</TableCell>
                      <TableCell align="left">Địa chỉ giao hàng</TableCell>
                      <TableCell align="left">Phí giao hàng</TableCell>
                      <TableCell align="left">Tổng thanh toán</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell align="center">
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
                      <TableCell align="left">{bill.billId}</TableCell>
                      {bill.processStatus !== "Cancel" && (
                        <TableCell align="left">
                          <Typography
                            sx={{
                              color:
                                bill.paymentStatus === "paid"
                                  ? "#00A3A3"
                                  : "#C33C54",
                            }}
                            variant="subtitle1"
                          >
                            {bill.paymentStatus === "paid"
                              ? "Đã thanh toán"
                              : "Chờ thanh toán"}
                          </Typography>
                        </TableCell>
                      )}

                      <TableCell align="left">
                        <Typography
                          sx={{
                            color:
                              bill.processStatus === "In Progress"
                                ? "#531FFF"
                                : bill.processStatus === "Cancel"
                                ? "#FF5714"
                                : bill.processStatus === "Đang giao hàng"
                                ? "#ED9831" :"#16A22D",
                          }}
                          variant="subtitle1"
                        >
                          {bill.processStatus === "In Progress"
                            ? "Chờ xác nhận"
                            : bill.processStatus === "Cancel"
                            ? "Đã hủy"
                            : bill.processStatus }
                        </Typography>
                      </TableCell>
                      <TableCell align="left">{bill.address}</TableCell>
                      <TableCell align="left">15,000 VND</TableCell>
                      <TableCell align="left">
                        {(parseFloat(bill.totalPrice) + 15000).toLocaleString(
                          "en-US"
                        )}{" "}
                        VND
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell colSpan={10} sx={{ pb: 0, pt: 0, b: 0 }}>
                        <Collapse
                          in={open === index}
                          timeout="auto"
                          unmountOnExit
                        >
                          {bill.updatedList.length === 0 ? (
                            <></>
                          ) : (
                            <h2>Thông tin giao hàng:</h2>
                          )}
                          {bill.updatedList.length === 0 ? (
                            <></>
                          ) : (
                            <Table size="medium">
                              <TableHead>
                                <TableRow>
                                  <TableCell align="left">
                                    Người cập nhật
                                  </TableCell>
                                  <TableCell align="left">
                                    Ngày cập nhật
                                  </TableCell>
                                  <TableCell align="left">
                                    Thời gian cập nhật
                                  </TableCell>
                                  <TableCell align="left">
                                    Trạng thái cập nhật
                                  </TableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                {bill.updatedList.map((staff, index2) => (
                                  <TableRow key={index2}>
                                    <TableCell align="left">
                                      {staff.staffName}{" "}
                                      {staff.staffName === userName
                                        ? "(Khách hàng)"
                                        : "(Nhân viên)"}
                                    </TableCell>
                                    <TableCell align="left">
                                      {moment(staff.updatedAt).format(
                                        "DD/MM/YYYY"
                                      )}
                                    </TableCell>
                                    <TableCell align="left">
                                      {moment(staff.updatedAt).format(
                                        "hh:mm A"
                                      )}
                                    </TableCell>
                                    <TableCell
                                      sx={{
                                        color:
                                          staff.processAfter === "Đã giao hàng"
                                            ? "#16A22D"
                                            : staff.processAfter === "Cancel"
                                            ? "#FF5714"
                                            : "#ED9831",
                                      }}
                                      align="left"
                                    >
                                      {staff.processAfter === "In Progress"
                                        ? "Đang giao hàng"
                                        : staff.processAfter === "Cancel"
                                        ? "Đã hủy"
                                        : staff.processAfter}
                                    </TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          )}
                          <br />
                          <h2>Thông tin sản phẩm:</h2>
                          <Table size="medium" aria-label="purchases">
                            <TableHead>
                              <TableRow>
                                <TableCell align="left">Ảnh</TableCell>
                                <TableCell align="left">Tên sản phẩm</TableCell>
                                <TableCell align="left">Số lượng</TableCell>
                                <TableCell align="left">Đơn giá</TableCell>
                                <TableCell align="center"></TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {bill.itemList.map((child, index2) => (
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
                                    {parseFloat(
                                      child.currentPrice
                                    ).toLocaleString("en-US")}{" "}
                                    VND
                                  </TableCell>
                                  <TableCell align="center">
                                    {refundList.find(
                                      (x) =>
                                        x.billId === bill.billId &&
                                        x.productRefundList[0].productId ===
                                          child.productId
                                    ) ? (
                                      <></>
                                    ) : bill.processStatus !== "Đã giao hàng" ||
                                      bill.processStatus === "Cancel" ? (
                                      <></>
                                    ) : (
                                      bill.canRefund === "Y" && (
                                        <Button
                                          variant="contained"
                                          sx={{
                                            width: "140px",
                                            height: "35px",
                                          }}
                                          onClick={() => {
                                            handleClickOpenDialog(child, bill);
                                          }}
                                        >
                                          Đổi trả hàng
                                        </Button>
                                      )
                                    )}
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
      <>
        <Dialog open={openDialog} onClose={handleCloseDialog}>
          <DialogTitle>Đổi trả hàng</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Chính sách đổi trả hàng trước 7 ngày kể từ khi giao hàng thành
              công.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="reason"
              name="reason"
              label="Lý do"
              value={values.reason}
              onChange={handleChange}
              fullWidth
              variant="standard"
            />
            <>Số lượng đổi trả: </>
            <Box
              sx={{ flex: 12, display: "inline-flex", alignItems: "center" }}
            >
              <Button onClick={() => onMinus()}>-</Button>
              <TextField
                required
                id="quantity"
                name="quantity"
                value={quantity}
                sx={{ width: 50 }}
                onFocus={(e) => e.target.select()}
                onChange={(e) => {
                  if (
                    e.target.value <= parseInt(selectedProduct.quantity) &&
                    e.target.value > 0
                  ) {
                    setQuantity(e.target.value);
                  }
                }}
                inputProps={{ maxLength: 2 }}
              />
              <Button onClick={() => onAdd()}>+</Button>
            </Box>
            {values.images.map((data, index) => (
              <Grid item key={index}>
                <TextField
                  id="data"
                  name="data"
                  sx={{ width: "70%" }}
                  variant="standard"
                  label="url image"
                  value={data}
                  onChange={(e) => handleUrlChange(e, index)}
                />
                {values.images.length - 1 === index && (
                  <IconButton
                    size="large"
                    color="success"
                    onClick={() => handleUrlAdd()}
                  >
                    <AddCircleIcon />
                  </IconButton>
                )}
                {values.images.length > 1 && (
                  <IconButton
                    size="large"
                    color="error"
                    onClick={() => handleUrlRemove(index)}
                  >
                    <CloseIcon />
                  </IconButton>
                )}
              </Grid>
            ))}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Hủy</Button>
            <Button onClick={handleSubmit}>Xác nhận</Button>
          </DialogActions>
        </Dialog>
        <Footer></Footer>
      </>
    </Box>
  );
};

export default BillHistory;
