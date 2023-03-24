import {
  Box,
  Button,
  CardMedia,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Toolbar,
} from "@mui/material";
import moment from "moment";
import React from "react";

const StaffRefundDashboard = ({ handleFinish, handleCancel, refundList }) => {
  return (
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
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
            <h2>Bảng Quản Lý Đổi Trả Sản Phẩm</h2>
          </Grid>
          {/* <Grid item xs={7}>
            <TextField
              sx={{ width: "100%" }}
              label="Tìm Kiếm"
              variant="outlined"
              // onChange={(e) => setSearchedVal(e.target.value)}
            />
          </Grid> */}
        </Grid>
        <TableContainer>
          <Table aria-label="simple table">
            <TableHead>
              {refundList.length === 0 ? (
                <TableRow>
                  <TableCell
                    sx={{ width: "100%", height: "100%" }}
                    align="center"
                  ></TableCell>
                </TableRow>
              ) : (
                <TableRow>
                  <TableCell align="center">STT</TableCell>
                  <TableCell align="left">Mã đổi trả</TableCell>
                  <TableCell align="left">Mã đơn hàng</TableCell>
                  <TableCell align="left">Tên sản phẩm</TableCell>
                  <TableCell align="left">Ngày tạo</TableCell>
                  <TableCell align="left">SDT khách hàng</TableCell>
                  <TableCell align="left">Số lượng</TableCell>
                  <TableCell align="left">Lý do</TableCell>
                  <TableCell align="left">Trạng thái</TableCell>
                  <TableCell align="center">Ảnh</TableCell>
                  <TableCell align="center"></TableCell>
                  <TableCell align="center"></TableCell>
                </TableRow>
              )}
            </TableHead>
            <TableBody>
              {refundList.length === 0 ? (
                <TableRow>
                  <TableCell
                    sx={{ width: "100%", height: "100%" }}
                    align="center"
                  >
                    Không Có Dữ Liệu
                  </TableCell>
                </TableRow>
              ) : (
                refundList
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
                    <TableRow key={row.billId}>
                      <TableCell align="center">{index + 1}</TableCell>
                      <TableCell align="left">{row.refundId}</TableCell>
                      <TableCell align="left">{row.billId}</TableCell>
                      <TableCell align="left">
                        {row.productRefundList[0].productName}
                      </TableCell>
                      <TableCell align="left">
                        {moment(row.dateCreateRefundRequest).format(
                          "DD/MM/YYYY"
                        )}
                      </TableCell>
                      <TableCell align="left">{row.userPhoneNumber}</TableCell>
                      <TableCell align="left">
                        {row.productRefundList[0].quantity}
                      </TableCell>
                      <TableCell align="left">
                        {row.productRefundList[0].reason}
                      </TableCell>
                      <TableCell align="left">
                        {row.refundStatus !== null && row.refundStatus === "In Progress" ? "Đang chờ duyệt" : row.refundStatus === "Accept" ? "Chấp nhận đổi trả" : row.refundStatus === "Cancel" ? "Hủy đổi trả" : row.refundStatus}
                      </TableCell>
                      <TableCell align="center">
                        {row.productRefundList[0].imagesUrl.map(
                          (image, index2) => (
                            <CardMedia
                              component="img"
                              alt="productImages"
                              image={image}
                              title="productImages"
                              sx={{ width: "50px" }}
                              key={index2}
                            ></CardMedia>
                          )
                        )}
                      </TableCell>
                      <TableCell align="center">
                        {row.refundStatus === "Accept" ||
                          row.refundStatus === "Cancel" ? (
                          <></>
                        ) : (
                          <Button
                            variant="contained"
                            sx={{ width: 180, height: "35px" }}
                            onClick={() => {
                              handleFinish(row.refundId);
                            }}
                          >
                            Xác nhận đổi trả
                          </Button>
                        )}
                      </TableCell>
                      <TableCell align="center">
                        {row.refundStatus === "Accept" ||
                          row.refundStatus === "Cancel" ? (
                          <></>
                        ) : (
                          <Button
                            variant="contained"
                            sx={{ width: "100%", height: "35px" }}
                            onClick={() => {
                              handleCancel(row.refundId);
                            }}
                          >
                            Hủy
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
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

export default StaffRefundDashboard;
