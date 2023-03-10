import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  CircularProgress,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Toolbar,
  Typography,
  styled,
  tableCellClasses,
} from "@mui/material";
import RemoveCircleOutlineRoundedIcon from "@mui/icons-material/RemoveCircleOutlineRounded";
import RemoveCircleRoundedIcon from "@mui/icons-material/RemoveCircleRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import CloseIcon from "@mui/icons-material/Close";

import React from "react";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#0A2463",
    color: theme.palette.common.white,
    fontSize: 16,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const AdminDashboard = () => {
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
          <Grid item xs={12}>
            <Typography
              sx={{
                color: "black",
                fontWeight: 600,
                flexGrow: 1,
                textAlign: "center",
                mt: 2,
              }}
              variant="h4"
              component="div"
            >
              Bảng quản lý sản phẩm
            </Typography>
          </Grid>
          <Grid item xs={5}>
            <TextField
              sx={{ width: "100%" }}
              id="filled-basic"
              label="Tìm Kiếm"
              variant="outlined"
              // onChange={(e) => setSearchedVal(e.target.value)}
            />
          </Grid>
          <Grid item xs={4}>
            <Button
              variant="contained"
              sx={{ width: "200px", ml: 4 }}
              // onClick={() => showAddForm()}
            >
              Tạo Sản Phẩm Mới
            </Button>
            <IconButton
              size="large"
              // disabled={!isDisabled}
              color="error"
              // onClick={cancelForm}
            >
              <CloseIcon />
            </IconButton>
          </Grid>

          <Grid item xs={12} />
        </Grid>

        <TableContainer>
          <Table aria-label="simple table">
            <TableHead>
              {/* {isloading === true || productData.length === 0 ? (
                <TableRow>
                  <TableCell></TableCell>
                </TableRow>
              ) : ( */}
                <TableRow>
                  <StyledTableCell align="center">STT</StyledTableCell>
                  <StyledTableCell align="left">Ảnh</StyledTableCell>
                  <StyledTableCell align="left">Tên Sản Phẩm</StyledTableCell>
                  <StyledTableCell align="left">Nhãn Hiệu</StyledTableCell>
                  <StyledTableCell align="left">Loại Hàng</StyledTableCell>
                  <StyledTableCell align="left">Mô Tả</StyledTableCell>
                  <StyledTableCell align="left">Số Lượng</StyledTableCell>
                  <StyledTableCell align="left">Đơn giá</StyledTableCell>
                  <StyledTableCell align="left">Trạng thái</StyledTableCell>
                  <StyledTableCell align="left"></StyledTableCell>
                  <StyledTableCell align="left"></StyledTableCell>
                </TableRow>
              {/* )} */}
            </TableHead>
            {/* <TableBody>
              {isloading === true ? (
                <TableRow>
                  <TableCell
                    sx={{ width: "100%", height: "100%" }}
                    align="center"
                  >
                    <CircularProgress />
                  </TableCell>
                </TableRow>
              ) : productData.length === 0 ? (
                <TableRow>
                  <TableCell
                    sx={{ width: "100%", height: "100%" }}
                    align="center"
                  >
                    Không Có Dữ Liệu
                  </TableCell>
                </TableRow>
              ) : (
                productData
                  // .filter(
                  //   (row) =>
                  //     !searchedVal.length ||
                  //     `${row.productName} ${row.productBrand} ${row.productCategory.name}`
                  //       .toString()
                  //       .toLowerCase()
                  //       .includes(searchedVal.toString().toLowerCase())
                  // )
                  // .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <TableRow key={row.id}>
                      <StyledTableCell align="center">
                        {productData.indexOf(row) + 1}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        <CardMedia
                          component="img"
                          alt="productImages"
                          image={row.productImages[0].url}
                          title="productImages"
                          sx={{ width: "50px" }}
                        ></CardMedia>
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {row.productName}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {row.productBrand}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {row.productCategory.name}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {row.description}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {row.productQuantity}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {parseFloat(row.productPrice).toLocaleString("en-US")} VND
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {row.status === true? "Đang hoạt động": "Dừng hoạt động"}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        <IconButton
                          size="large"
                          color="info"
                          onClick={() => {
                            showUpdateForm(row);
                          }}
                        >
                          <EditRoundedIcon />
                        </IconButton>
                      </StyledTableCell>
                      <StyledTableCell align="center">
                      <IconButton
                        size="large"
                          color={row.status === true ? "error" : "success"}
                          // disabled={isDisabled}
                          onClick={() => {
                            handleDelete(row);
                          }}
                        >
                          {row.status === "Active" ? (
                            <RemoveCircleOutlineRoundedIcon />
                          ) : (
                            <RemoveCircleRoundedIcon />
                          )}
                        </IconButton>
                      </StyledTableCell>
                    </TableRow>
                  ))
              )}
            </TableBody> */}
            {/* <TableFooter>
              <TableRow>
                {isloading === true ? (
                  <></>
                ) : (
                  <TablePagination
                    rowsPerPageOptions={[4]}
                    count={productData.length}
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

export default AdminDashboard;
