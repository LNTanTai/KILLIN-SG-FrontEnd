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
import React from "react";
import RemoveCircleOutlineRoundedIcon from "@mui/icons-material/RemoveCircleOutlineRounded";
import RemoveCircleRoundedIcon from "@mui/icons-material/RemoveCircleRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import CloseIcon from "@mui/icons-material/Close";

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

const OwnerDashboard = ({
  setPage,
  handleDelete,
  setCategoryItem,
  categoryItem,
  categoryList,
  handleUrlRemove,
  handleUrlAdd,
  handleUrlChange,
  showAddForm,
  showUpdateForm,
  cancelForm,
  handleSubmit,
  handleChange,
  values,
  isUpdateRow,
  isAddNew,
  setSearchedVal,
  isloading,
  productData,
  searchedVal,
  page,
  rowsPerPage,
  handleChangePage,
  handleChangeRowsPerPage,
}) => {
  return (
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
      <Toolbar />
      {isAddNew === true || isUpdateRow === true ? (
        <Box>
          <Grid container justifyContent="center">
            <Card
              sx={{ width: "100%", border: "solid 1px", borderRadius: "10px" }}
            >
              <CardHeader
                title="Thông tin sản phẩm"
                titleTypographyProps={{
                  align: "center",
                  fontWeight: "bold",
                }}
                subheader={isAddNew === true ? "Thêm mới" : "Cập nhật"}
                subheaderTypographyProps={{
                  align: "center",
                }}
              />
              <CardContent sx={{ marginBottom: "2%" }}>
                <Box
                  component="form"
                  sx={{
                    display: "column",
                  }}
                  onSubmit={handleSubmit}
                >
                  <br />
                  <Grid container direction="column" spacing={2}>
                    <Grid item>
                      <TextField
                        id="name"
                        name="name"
                        fullWidth
                        variant="standard"
                        label="Name Product"
                        value={values.name}
                        onChange={handleChange}
                      />
                    </Grid>
                    <Grid item>
                      <TextField
                        id="brand"
                        name="brand"
                        fullWidth
                        variant="standard"
                        label="Brand"
                        value={values.brand}
                        onChange={handleChange}
                      />
                    </Grid>
                    <Grid item>
                      <TextField
                        id="quantity"
                        name="quantity"
                        fullWidth
                        variant="standard"
                        label="quantity"
                        value={values.quantity}
                        onChange={handleChange}
                      />
                    </Grid>
                    <Grid item>
                      <TextField
                        id="price"
                        name="price"
                        fullWidth
                        variant="standard"
                        label="price"
                        value={values.price}
                        onChange={handleChange}
                      />
                    </Grid>
                    <Grid item>
                      <TextField
                        id="description"
                        name="description"
                        fullWidth
                        variant="standard"
                        label="description"
                        value={values.description}
                        onChange={handleChange}
                      />
                    </Grid>
                    <Grid item>
                      <FormControl variant="standard" fullWidth required>
                        <InputLabel id="category-select-label">
                          Chọn loại hàng
                        </InputLabel>
                        <Select
                          labelId="category-select-label"
                          id="categoryItem"
                          value={categoryItem}
                          onChange={(event) =>
                            setCategoryItem(event.target.value)
                          }
                        >
                          {categoryList.map((data, index) => (
                            <MenuItem key={index} value={data.id}>
                              {data.name}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                    {values.productImages.map((data, index) => (
                      <Grid item key={index}>
                        <TextField
                          id="url"
                          name="url"
                          sx={{ width: "70%" }}
                          variant="standard"
                          label="url image"
                          value={data.url}
                          onChange={(e) => handleUrlChange(e, index)}
                        />
                        {values.productImages.length - 1 === index && (
                          <Button
                            variant="contained"
                            onClick={() => handleUrlAdd()}
                            sx={{ ml: 1, mt: 1, width: "100px" }}
                          >
                            Thêm
                          </Button>
                        )}
                        {values.productImages.length > 1 && (
                          <Button
                            variant="contained"
                            onClick={() => handleUrlRemove(index)}
                            sx={{ ml: 1, mt: 1, width: "100px" }}
                          >
                            Xóa
                          </Button>
                        )}
                      </Grid>
                    ))}
                    <Grid item>
                      <Button
                        variant="contained"
                        type="submit"
                        sx={{ height: "35px", width: "100%" }}
                      >
                        {isAddNew === true
                          ? "Thêm Sản Phẩm"
                          : "Cập Nhật Sản Phẩm"}
                      </Button>
                    </Grid>
                  </Grid>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Box>
      ) : (
        <></>
      )}
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
              onChange={(e) => {
                setPage(0);
                setSearchedVal(e.target.value.trim());
              }}
            />
          </Grid>
          <Grid item xs={4}>
            <Button
              variant="contained"
              sx={{ width: "200px", ml: 4 }}
              onClick={() => showAddForm()}
            >
              Tạo Sản Phẩm Mới
            </Button>
            <IconButton
              size="large"
              // disabled={!isDisabled}
              color="error"
              onClick={cancelForm}
            >
              <CloseIcon />
            </IconButton>
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
                  <StyledTableCell align="left">Đơn giá</StyledTableCell>
                  <StyledTableCell align="left">Trạng thái</StyledTableCell>
                  <StyledTableCell align="left"></StyledTableCell>
                  <StyledTableCell align="left"></StyledTableCell>
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
                      `${row.productName} ${row.productBrand} ${row.productCategory.name}`
                        .toString()
                        .toLowerCase()
                        .includes(searchedVal.toString().toLowerCase())
                  )
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
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
                        {parseFloat(row.productPrice).toLocaleString("en-US")}{" "}
                        VND
                      </StyledTableCell>
                      <StyledTableCell
                        sx={{
                          color: row.status === true ? "#16A22D" : "#FF5714",
                        }}
                        align="left"
                      >
                        {row.status === true
                          ? "Đang hoạt động"
                          : "Dừng hoạt động"}
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
