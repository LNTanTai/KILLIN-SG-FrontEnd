import { Box, Button, Grid, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Toolbar, Typography } from "@mui/material";
import React from "react";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import EditRoundedIcon from "@mui/icons-material/EditRounded";

const CategoryDashBoard = ({categoryList}) => {
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
              Bảng quản lý category
            </Typography>
          </Grid>
          <Grid item xs={7}>
            <TextField
              sx={{ width: "100%" }}
              id="filled-basic"
              label="Tìm Kiếm"
              variant="outlined"
              // onChange={(e) => setSearchedVal(e.target.value)}
            />
          </Grid>
          <Grid item xs={3}>
            <Button
              variant="contained"
              sx={{ width: "200px", height: "35px", ml: 4 }}
              onClick={() => {}}
            >
              Tạo Sản Phẩm Mới
            </Button>
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
                    >
                    </TableCell>
                  </TableRow>
                ) :
                (<TableRow>
                  <TableCell align="center">STT</TableCell>
                  <TableCell align="left">Tên loại hàng</TableCell>
                  <TableCell align="center"></TableCell>
                  <TableCell align="center"></TableCell>
                </TableRow>)}
              
            </TableHead>
            <TableBody>
              {
                categoryList.length === 0 ? (
                  <TableRow>
                    <TableCell
                      sx={{ width: "100%", height: "100%" }}
                      align="center"
                    >
                      Không Có Dữ Liệu
                    </TableCell>
                  </TableRow>
                ) :
              (categoryList
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
                      <TableCell align="left">
                        {row.name}
                      </TableCell>
                      <TableCell align="center">
                      <IconButton
                            size="large"
                            color="info"
                            onClick={() => {
                              // handleDelete(row.id, list.orderId);
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
                              // handleDelete(row.id, list.orderId);
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
