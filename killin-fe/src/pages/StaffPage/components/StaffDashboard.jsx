import {
  Box,
  Button,
  CardMedia,
  Collapse,
  Grid,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Toolbar,
} from "@mui/material";
import React from "react";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import moment from "moment/moment";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { DatePicker } from "@mui/x-date-pickers";

const StaffDashboard = ({
  handleConfirm,
  billData,
  open,
  setOpen,
  handleFinish,
  handleCancel,
  selectDate,
  setSelectDate,
  handleSearchByDate
}) => {
  return (
    <Box component="main" sx={{ flexGrow: 2, p: 3 }}>
      <Toolbar />
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <Grid
          sx={{ flexGrow: 1 }}
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={2}
        >
          <Grid item xs={1}></Grid>
          <Grid item xs={5}>
            <h2>Bảng Quảy Lý Hóa Đơn Theo Ngày</h2>
          </Grid>
          {/* <Grid item xs={7}>
            <TextField
              sx={{ width: "100%" }}
              label="Tìm Kiếm"
              variant="outlined"
              // onChange={(e) => setSearchedVal(e.target.value)}
            />
          </Grid> */}
          <Grid item xs={2}>
            <DatePicker
              disableFuture
              label="Tìm Kiếm Ngày"
              inputFormat="DD/MM/YYYY"
              placeholder="DD/MM/YYYY"
              value={selectDate}
              onChange={(newValue) => {
                setSelectDate(newValue);
              }}
              renderInput={(params) => (
                <TextField fullWidth variant="standard" {...params} />
              )}
            />
          </Grid>
          <Grid item xs={2}>
            <IconButton
              size="large"
              onClick={() => {
                handleSearchByDate();
              }}
            >
              <SearchRoundedIcon />
            </IconButton>
          </Grid>
        </Grid>
        <TableContainer>
          <Table aria-label="simple table">
            <TableHead>
              {billData.length === 0 ? (
                  <TableRow>
                    <TableCell
                      sx={{ width: "100%", height: "100%" }}
                      align="center"
                    >
                    </TableCell>
                  </TableRow>
                ) :
                (<TableRow>
                  <TableCell align="center"></TableCell>
                  <TableCell align="center">STT</TableCell>
                  <TableCell align="left">Mã đơn hàng</TableCell>
                  <TableCell align="left">Khách hàng</TableCell>
                  <TableCell align="left">Ngày tạo</TableCell>
                  <TableCell align="left">Thời gian</TableCell>
                  <TableCell align="left">Phí giao hàng</TableCell>
                  <TableCell align="left">Tổng thanh toán</TableCell>
                  <TableCell align="left">Trạng thái</TableCell>
                  <TableCell align="center"></TableCell>
                  <TableCell align="center"></TableCell>
                </TableRow>)}
              
            </TableHead>
            <TableBody>
              {
                billData.length === 0 ? (
                  <TableRow>
                    <TableCell
                      sx={{ width: "100%", height: "100%" }}
                      align="center"
                    >
                      Không Có Dữ Liệu
                    </TableCell>
                  </TableRow>
                ) :
              (billData
                // .filter(
                //   (row) =>
                //     !searchedVal.length ||
                //     `${row.fullName} ${row.phoneNumber} ${row.address}`
                //       .toString()
                //       .toLowerCase()
                //       .includes(searchedVal.toString().toLowerCase())
                // )
                // .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => (
                  <>
                    <TableRow key={row.billId}>
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
                      <TableCell align="center">{index + 1}</TableCell>
                      <TableCell align="left">{row.billId}</TableCell>
                      <TableCell align="left">{row.userFullName}</TableCell>
                      <TableCell align="left">
                        {moment(row.timeCreate).format("DD/MM/YYYY")}
                      </TableCell>
                      <TableCell align="left">
                        {moment(row.timeCreate).format("hh:mm A")}
                      </TableCell>
                      <TableCell align="left">
                        15,000 VND
                      </TableCell>
                      <TableCell align="left">
                        {(parseFloat(row.totalPrice) + 15000).toLocaleString("en-US")} VND
                      </TableCell>
                      <TableCell align="left">{row.processStatus === "In Progress" ? "Đang chờ duyệt" : row.processStatus === "Cancel" ? "Hủy đơn hàng" : row.processStatus}</TableCell>
                      <TableCell align="center">
                        {row.processStatus === "In Progress" ? (
                          <Button
                            variant="contained"
                            sx={{ width: "150px", height: "35px" }}
                            onClick={() => {
                              handleConfirm(row.billId);
                            }}
                          >
                            Xác Nhận
                          </Button>
                        ) : row.processStatus === "Đã giao hàng" ||
                          row.processStatus === "Cancel" ? (
                          <></>
                        ) : (
                          <Button
                            variant="contained"
                            sx={{ width: 160, height: "35px" }}
                            onClick={() => {
                              handleFinish(row.billId);
                            }}
                          >
                            Đã giao hàng
                          </Button>
                        )}
                      </TableCell>
                      <TableCell align="center">
                        {row.processStatus === "In Progress" ? (
                          <></>
                        ) : row.processStatus === "Đã giao hàng" ||
                          row.processStatus === "Cancel" ? (
                          <></>
                        ) : (
                          <Button
                            variant="contained"
                            sx={{ width: "100%", height: "35px" }}
                            onClick={() => {
                              handleCancel(row.billId);
                            }}
                          >
                            Hủy
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell colSpan={10} sx={{ pb: 0, pt: 0, b: 0 }}>
                        <Collapse
                          in={open === index}
                          timeout="auto"
                          unmountOnExit
                        >
                          <h2>Thông tin khách hàng:</h2>
                          <Table size="medium">
                            <TableHead>
                              <TableRow>
                                <TableCell align="left">Khách hàng</TableCell>
                                <TableCell align="left">SDT</TableCell>
                                <TableCell align="left">Email</TableCell>
                                <TableCell align="left">Địa chỉ</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              <TableRow>
                                <TableCell align="left">
                                  {row.userFullName}
                                </TableCell>
                                <TableCell align="left">
                                  {row.userPhoneNumber}
                                </TableCell>
                                <TableCell align="left">
                                  {row.userEmail}
                                </TableCell>
                                <TableCell align="left">
                                  {row.userAddress}
                                </TableCell>
                              </TableRow>
                            </TableBody>
                          </Table>
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
                              {row.itemList.map((child , index2) => (
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
                  </>
                ))
                )}
              {/* {isloading === true ? (
                <TableRow>
                  <TableCell
                    sx={{ width: "100%", height: "100%" }}
                    align="center"
                  >
                    <CircularProgress />
                  </TableCell>
                </TableRow>
              ) : userServiceData.length === 0 ? (
                <TableRow>
                  <TableCell
                    sx={{ width: "100%", height: "100%" }}
                    align="center"
                  >
                    Không Có Dữ Liệu
                  </TableCell>
                </TableRow>
              ) : 
              (
                
              )} */}
            </TableBody>
            {/* <TableFooter>
              <TableRow>
                {isloading === true ? (
                  <></>
                ) : (
                  <TablePagination
                    rowsPerPageOptions={[
                      4
                    ]}
                    count={userServiceData.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    labelRowsPerPage="Số hàng trên một trang"
                    showFirstButton
                    showLastButton
                    labelDisplayedRows={({ from, to, count, page }) =>
                      `${from}–${to} của ${
                        count !== -1 ? count : `nhiều hơn ${to}`
                      } | Trang ${page}`
                    }
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                  />
                )}
              </TableRow>
            </TableFooter> */}
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};

export default StaffDashboard;
