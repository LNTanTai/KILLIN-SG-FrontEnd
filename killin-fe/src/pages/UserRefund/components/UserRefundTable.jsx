import {
  Box,
  Card,
  CardActionArea,
  CardMedia,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Toolbar,
  Typography,
} from "@mui/material";
import moment from "moment";
import React from "react";
import { Footer } from "../../../services/constants/componentConstants";

const UserRefundTable = ({handleClickImg, refundList }) => {
  return (
    <Box component="main" sx={{ flexGrow: 1, paddingTop: 5 }}>
      <Toolbar />
      <Box
      data-aos="fade-right"
        sx={{
          border: "solid 1px",
          margin: " 10px auto 20px auto",
          borderRadius: "10px",
          width: "90%",
          paddingBottom: "10px",
        }}
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
            <Grid item xs={12}>
              <h2 style={{ marginLeft: 15, flexGrow: 1 }}>
                Danh sách đổi trả hàng
              </h2>
            </Grid>
          </Grid>
          {refundList.length === 0? <>Chưa có sản phẩm đổi trả hàng</> :
          <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center">STT</TableCell>
                <TableCell align="left">Mã đổi trả</TableCell>
                <TableCell align="left">Mã đơn hàng</TableCell>
                <TableCell align="left">Tên sản phẩm</TableCell>
                <TableCell align="left">Ngày tạo</TableCell>
                <TableCell align="left">Số lượng</TableCell>
                <TableCell align="left">Lý do</TableCell>
                <TableCell align="left">Trạng thái</TableCell>
                <TableCell align="center">Ảnh</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {refundList.map((data, index) => (
                <TableRow key={index}>
                  <TableCell align="center">{index + 1}</TableCell>
                  <TableCell align="left">{data.refundId}</TableCell>
                  <TableCell align="left">{data.billId}</TableCell>
                  <TableCell align="left">
                    {data.productRefundList[0].productName}
                  </TableCell>
                  <TableCell align="left">
                    {moment(data.dateCreateRefundRequest).format(
                      "DD/MM/YYYY"
                    )}
                  </TableCell>
                  <TableCell align="left">
                    {data.productRefundList[0].quantity}
                  </TableCell>
                  <TableCell align="left">
                    {data.productRefundList[0].reason}
                  </TableCell>
                  <TableCell align="left">
                    {data.refundStatus !== null &&
                    data.refundStatus === "In Progress" ? (
                      <Typography
                      sx={{
                        color:"#ED9831"
                      }}
                        variant="subtitle1"
                      >
                        Đang chờ duyệt
                      </Typography>
                    ) : data.refundStatus === "Accept" ? (
                      <Typography
                      sx={{
                        color:"#16A22D"
                      }}
                        variant="subtitle1"
                      >
                        Chấp nhận đổi trả
                      </Typography>
                    ) : data.refundStatus === "Cancel" ? (
                      <Typography
                        sx={{
                          color:"#FF5714"
                        }}
                        variant="subtitle1"
                      >
                        Hủy đổi trả
                      </Typography>
                    ) : (
                      data.refundStatus
                    )}
                  </TableCell>
                  <TableCell align="center">
                    {data.productRefundList[0].imagesUrl.map(
                      (image, index2) => (
                        <Card sx={{ width: "50px" }} key={index2}>
                          {index2 === 0 && <CardActionArea
                            onClick={() =>
                              handleClickImg(
                                data.productRefundList[0].imagesUrl,
                                image,
                                index2
                              )
                            }
                          >
                            <CardMedia
                              component="img"
                              alt="productImages"
                              image={image}
                              title="productImages"
                              sx={{ width: "50px" }}
                            ></CardMedia>
                          </CardActionArea>}
                          
                        </Card>
                      )
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
          }
          
        </div>
      </Box>
      <Footer></Footer>
    </Box>
  );
};

export default UserRefundTable;
