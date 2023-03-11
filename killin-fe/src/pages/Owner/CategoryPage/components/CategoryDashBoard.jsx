import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
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
  Typography,
} from "@mui/material";
import React from "react";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import CloseIcon from "@mui/icons-material/Close";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";

const CategoryDashBoard = ({
  search,
  setSearch,
  handleChangeSearch,
  handleDelete,
  cancelForm,
  showUpdateForm,
  showAddForm,
  values,
  handleChange,
  handleSubmit,
  isUpdateRow,
  isAddNew,
  categoryList,
}) => {
  return (
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
      <Toolbar />
      {isAddNew === true || isUpdateRow === true ? (
        <Box>
          <Grid container justifyContent="center">
            <Card sx={{ width: "100%", border: "solid 1px", borderRadius: "10px" }}>
              <CardHeader
                title="Thông tin Category"
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
                        label="Name category"
                        value={values.name}
                        onChange={handleChange}
                      />
                    </Grid>
                    <br />
                    <Grid item>
                      <Button
                        variant="contained"
                        type="submit"
                        sx={{ height: "35px", width: "100%" }}
                      >
                        {isAddNew === true ? "Thêm Banner" : "Cập Nhật Banner"}
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
              Bảng quản lý category
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <TextField
              sx={{ width: "100%" }}
              id="filled-basic"
              label="Tìm Kiếm"
              variant="outlined"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                handleChangeSearch(e.target.value);}}
            />
          </Grid>
          <Grid item xs={4}>
            <Button
              variant="contained"
              sx={{ width: "200px", height: "35px", ml: 4 }}
              onClick={() => showAddForm()}
            >
              Tạo Sản Phẩm Mới
            </Button>
            <IconButton
              size="large"
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
              {categoryList.length === 0 ? (
                <TableRow>
                  <TableCell
                    sx={{ width: "100%", height: "100%" }}
                    align="center"
                  ></TableCell>
                </TableRow>
              ) : (
                <TableRow>
                  <TableCell align="center">STT</TableCell>
                  <TableCell align="left">Tên loại hàng</TableCell>
                  <TableCell align="center"></TableCell>
                  <TableCell align="center"></TableCell>
                </TableRow>
              )}
            </TableHead>
            <TableBody>
              {categoryList.length === 0 ? (
                <TableRow>
                  <TableCell
                    sx={{ width: "100%", height: "100%" }}
                    align="center"
                  >
                    Không Có Dữ Liệu
                  </TableCell>
                </TableRow>
              ) : (
                categoryList
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
                    <TableRow key={index}>
                      <TableCell align="center">{index + 1}</TableCell>
                      <TableCell align="left">{row.name}</TableCell>
                      <TableCell align="center">
                        <IconButton
                          size="large"
                          color="info"
                          onClick={() => {
                            showUpdateForm(row);
                          }}
                        >
                          <EditRoundedIcon />
                        </IconButton>
                      </TableCell>
                      <TableCell align="center">
                        <IconButton
                          size="large"
                          color="error"
                          onClick={() => {
                            handleDelete(row);
                          }}
                        >
                          <DeleteOutlinedIcon />
                        </IconButton>
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

export default CategoryDashBoard;
