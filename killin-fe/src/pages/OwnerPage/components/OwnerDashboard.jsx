import {
  Box,
  Button,
  CircularProgress,
  Grid,
  Paper,
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
import React, { useEffect, useState } from "react";
import { axiosUrl } from "../../../services/api/axios";
import { GET_PRODUCTS } from "../../../services/constants/apiConstants";

const product = [];

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#0A2463",
    color: theme.palette.common.white,
    fontSize: 16,
  },
  [`&.${tableCellClasses.body}`]:
  
   {
    fontSize: 14,
  },
}));

const OwnerDashboard = () => {
  const [isloading, setIsLoading] = useState(false);
  const [productData, setProductData] = useState(product);
  const [searchedVal, setSearchedVal] = useState("");
  const pages = [10, 25, 100];
  const [page, setPage] = useState(0);
  const [pageSave, setPageSave] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(pages[page]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async (categoryId) => {
    const params = {};
    try {
      const response = await axiosUrl.get(GET_PRODUCTS, params);
      const data = [...response.data];
      console.log(data);
      setProductData(data);
    } catch (error) {
      console.error(`Error at OwnerDashboard: ${error}`);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    setPageSave(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
    setPageSave(0);
  };

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
                mt:2,
              }}
              variant="h4"
              component="div"
            >
              Bảng quản lý sản phẩm
            </Typography>
          </Grid>
          <Grid item xs={7}>
            <TextField
              sx={{ width: "100%",}}
              id="filled-basic"
              label="Tìm Kiếm"
              variant="outlined"
              // onChange={(e) => setSearchedVal(e.target.value)}
            />
          </Grid>
          <Grid item xs={3}>
            <Button
              variant="contained"
              sx={{ width: "100%", height: "35px", ml: 4 }}
              onClick={() => {
                // handleDateSearch();
              }}
            >
              Tìm Kiếm Sản Phẩm
            </Button>
          </Grid>
          <Grid item xs={12} />
        </Grid>

        <TableContainer>
          <Table aria-label="simple table">
            <TableHead>
              {isloading === true || productData.length === 0 ? (
                <TableRow>
                  <TableCell></TableCell>
                </TableRow>
              ) : (
                <TableRow>
                  <StyledTableCell align="center">STT</StyledTableCell>
                  <StyledTableCell align="left">Ảnh</StyledTableCell>
                  <StyledTableCell align="left">Tên Sản Phẩm</StyledTableCell>
                  <StyledTableCell align="left">Nhãn Hiệu</StyledTableCell>
                  <StyledTableCell align="left">Loại Hàng</StyledTableCell>
                  <StyledTableCell align="left">Mô Tả</StyledTableCell>
                  <StyledTableCell align="left">Số Lượng</StyledTableCell>
                  <StyledTableCell align="left">Giá</StyledTableCell>
                </TableRow>
              )}
            </TableHead>
            <TableBody>
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
                  .filter(
                    (row) =>
                      !searchedVal.length ||
                      `${row.productName} ${row.phoneNumber} ${row.address}`
                        .toString()
                        .toLowerCase()
                        .includes(searchedVal.toString().toLowerCase())
                  )
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <TableRow key={row}>
                      <StyledTableCell align="center">
                        {productData.indexOf(row) + 1}
                      </StyledTableCell>
                      <StyledTableCell align="left">{row.productImages[0].url}</StyledTableCell>
                      <StyledTableCell align="left">{row.productName}</StyledTableCell>
                      <StyledTableCell align="left">{row.productBrand}</StyledTableCell>
                      <StyledTableCell align="left">{row.productCategory.name}</StyledTableCell>
                      <StyledTableCell align="left">{row.description}</StyledTableCell>
                      <StyledTableCell align="left">{row.productQuantity}</StyledTableCell>
                      <StyledTableCell align="left">{row.productPrice}</StyledTableCell>
                    </TableRow>
                  ))
              )}
            </TableBody>
            <TableFooter>
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
            </TableFooter>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};

export default OwnerDashboard;
