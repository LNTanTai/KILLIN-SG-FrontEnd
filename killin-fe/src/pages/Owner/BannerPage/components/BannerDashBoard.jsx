import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
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
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import CloseIcon from "@mui/icons-material/Close";

const BannerDashBoard = ({
  handleDelete,
  handleSubmit,
  cancelForm,
  handleChange,
  values,
  showAddForm,
  showUpdateForm,
  bannerList,
  isUpdateRow,
  isAddNew,
}) => {
  return (
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
      <Toolbar />
      {isAddNew === true || isUpdateRow === true ? (
        <Box>
          <Grid container justifyContent="center">
            <Card sx={{ width: "100%", border: "solid 1px", borderRadius: "10px" }}>
              <CardHeader
                title="Thông tin Banner"
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
                        id="banner_url"
                        name="banner_url"
                        fullWidth
                        variant="standard"
                        label="Url Banner"
                        value={values.banner_url}
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
          {/* <Grid item xs={1}></Grid> */}
          <Grid item xs={4}>
            <h2>Bảng Quảy Lý Banner</h2>
          </Grid>
          <Grid item xs={5}>
            <Button
              variant="contained"
              sx={{ width: "200px", height: "35px", ml: 4 }}
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
        </Grid>
        <TableContainer>
          <Table aria-label="simple table">
            <TableHead>
              {bannerList.length === 0 ? (
                <TableRow>
                  <TableCell
                    sx={{ width: "100%", height: "100%" }}
                    align="center"
                  ></TableCell>
                </TableRow>
              ) : (
                <TableRow>
                  <TableCell align="center">STT</TableCell>
                  <TableCell align="left">Ảnh</TableCell>
                  <TableCell align="center"></TableCell>
                  <TableCell align="center"></TableCell>
                </TableRow>
              )}
            </TableHead>
            <TableBody>
              {bannerList.length === 0 ? (
                <TableRow>
                  <TableCell
                    sx={{ width: "100%", height: "100%" }}
                    align="center"
                  >
                    Không Có Dữ Liệu
                  </TableCell>
                </TableRow>
              ) : (
                bannerList
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
                      <TableCell align="center">
                        <CardMedia
                          component="img"
                          alt="productImages"
                          image={row.banner_url}
                          title="productImages"
                          sx={{ width: "250px" }}
                        ></CardMedia>
                      </TableCell>
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

export default BannerDashBoard;
