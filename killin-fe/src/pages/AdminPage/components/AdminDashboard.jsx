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
import moment from "moment";
import { DesktopDatePicker } from "@mui/x-date-pickers";

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

const AdminDashboard = ({
  handleDelete,
  selectDob,
  setSelectDob,
  role,
  setRole,
  values,
  showAddForm,
  showUpdateForm,
  cancelForm,
  handleSubmit,
  handleChange,
  isUpdateRow,
  isAddNew,
  handleChangeSearch,
  setSearch,
  search,
  accountList,
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
                title="Thông tin tài khoản"
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
                        sx={{ pb: 2 }}
                        fullWidth
                        label="Name"
                        id="fullName"
                        name="fullName"
                        placeholder="Enter your name"
                        value={values.fullName}
                        onChange={handleChange}
                      />
                    </Grid>
                    <Grid item>
                      <DesktopDatePicker
                        label="Ngày Sinh"
                        inputFormat="DD/MM/YYYY"
                        placeholder="DD/MM/YYYY"
                        value={selectDob}
                        onChange={(newValue) => {
                          setSelectDob(newValue);
                        }}
                        renderInput={(params) => (
                          <TextField sx={{ pb: 2 }} fullWidth {...params} />
                        )}
                      />
                    </Grid>
                    <Grid item>
                      <TextField
                        fullWidth
                        sx={{ pb: 2 }}
                        label="Email"
                        id="email"
                        name="email"
                        placeholder="Enter your email"
                        value={values.email}
                        onChange={handleChange}
                      />
                    </Grid>
                    <Grid item>
                      <TextField
                        fullWidth
                        sx={{ pb: 2 }}
                        label="Adress"
                        id="address"
                        name="address"
                        placeholder="Enter your adress"
                        value={values.address}
                        onChange={handleChange}
                      />
                    </Grid>
                    <Grid item>
                      <TextField
                        fullWidth
                        sx={{ pb: 2 }}
                        label="Phone Number"
                        id="userName"
                        name="userName"
                        placeholder="Enter your phone number"
                        value={values.userName}
                        onChange={handleChange}
                      />
                    </Grid>
                    {isUpdateRow === false && (
                      <Grid item>
                        <TextField
                          fullWidth
                          sx={{ pb: 2 }}
                          label="Password"
                          id="password"
                          name="password"
                          placeholder="Enter your password"
                          value={values.password}
                          onChange={handleChange}
                        />
                      </Grid>
                    )}
                    {isUpdateRow === false && (
                      <Grid item>
                      <FormControl variant="standard" fullWidth required>
                        <InputLabel id="category-select-label">
                          Chọn vai trò
                        </InputLabel>
                        <Select
                          labelId="category-select-label"
                          id="categoryItem"
                          value={role}
                          onChange={(event) => setRole(event.target.value)}
                        >
                          <MenuItem value="1">owner</MenuItem>
                          <MenuItem value="2">staff</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    )}
                    
                    <Grid item>
                      <Button
                        variant="contained"
                        type="submit"
                        sx={{ height: "35px", width: "100%" }}
                      >
                        {isAddNew === true
                          ? "Thêm Tài Khoản"
                          : "Cập Nhật Tài Khoản"}
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
                fontWeight: 600,
                flexGrow: 1,
                textAlign: "center",
                mt: 2,
              }}
              variant="h4"
              component="div"
            >
              Bảng quản lý tài khoản
            </Typography>
          </Grid>
          <Grid item xs={5}>
            <TextField
              sx={{ width: "100%" }}
              id="filled-basic"
              label="Tìm Kiếm"
              variant="outlined"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                handleChangeSearch(e.target.value);
              }}
            />
          </Grid>
          <Grid item xs={4}>
            <Button
              variant="contained"
              sx={{ width: "200px", ml: 4 }}
              onClick={() => showAddForm()}
            >
              Tạo Tài Khoản Mới
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
              {/* {isloading === true || productData.length === 0 ? (
                <TableRow>
                  <TableCell></TableCell>
                </TableRow>
              ) : ( */}
              <TableRow>
                <StyledTableCell align="center">STT</StyledTableCell>
                <StyledTableCell align="left">Tên người dùng</StyledTableCell>
                <StyledTableCell align="left">Số điện thoại</StyledTableCell>
                <StyledTableCell align="left">Email</StyledTableCell>
                <StyledTableCell align="left">Ngày sinh</StyledTableCell>
                <StyledTableCell align="left">Địa chỉ</StyledTableCell>
                <StyledTableCell align="left">Vai trò</StyledTableCell>
                <StyledTableCell align="left">Trạng thái</StyledTableCell>
                <StyledTableCell align="left"></StyledTableCell>
                <StyledTableCell align="left"></StyledTableCell>
              </TableRow>
              {/* )} */}
            </TableHead>
            <TableBody>
              {
                // isloading === true ? (
                //   <TableRow>
                //     <TableCell
                //       sx={{ width: "100%", height: "100%" }}
                //       align="center"
                //     >
                //       <CircularProgress />
                //     </TableCell>
                //   </TableRow>
                // ) :
                accountList.length === 0 ? (
                  <TableRow>
                    <TableCell
                      sx={{ width: "100%", height: "100%" }}
                      align="center"
                    >
                      Không Có Dữ Liệu
                    </TableCell>
                  </TableRow>
                ) : (
                  accountList
                    // .filter(
                    //   (row) =>
                    //     !searchedVal.length ||
                    //     `${row.productName} ${row.productBrand} ${row.productCategory.name}`
                    //       .toString()
                    //       .toLowerCase()
                    //       .includes(searchedVal.toString().toLowerCase())
                    // )
                    // .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => (
                      <TableRow key={index}>
                        <StyledTableCell align="center">
                          {index + 1}
                        </StyledTableCell>
                        <StyledTableCell align="left">
                          {row.userFullName}
                        </StyledTableCell>
                        <StyledTableCell align="left">
                          {row.userName}
                        </StyledTableCell>
                        <StyledTableCell align="left">
                          {row.email}
                        </StyledTableCell>
                        <StyledTableCell align="left">
                          {moment(row.dob).format("DD/MM/YYYY")}
                        </StyledTableCell>
                        <StyledTableCell align="left">
                          {row.address}
                        </StyledTableCell>
                        <StyledTableCell align="left">
                          {row.role === "3"
                            ? "Khách hàng"
                            : row.role === "1"
                            ? "Quản lý sản phẩm"
                            : row.role === "2"
                            ? "Nhân viên"
                            : ""}
                        </StyledTableCell>
                        <StyledTableCell align="left">
                          {row.status === "Active"
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
                            color={row.status !== "Active" ? "error" : "success"}
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
                )
              }
            </TableBody>
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
