import { Box, Container, Paper, Toolbar, Typography, Table, Grid, Image } from "@mui/material";
import React from "react";

const index = () => {
  return (
    <Box sx={{ marginTop: "60px", width: "100%", bottom: 0, backgroundColor: 'black', color: 'white' }}>
      <Toolbar />
      <Paper
        sx={{
          marginTop: "1px",
          width: "100%",
          bottom: 0,
          backgroundColor: 'black',
          color: 'white'
        }}
        component="footer"
        square
        variant="outlined"
      >
        <Container maxWidth="lg">
          <Grid container spacing={2}>
            <Grid item xs={3} padding={0} display={"flex"} flexDirection={"column"}>
              <h2>KHÁCH HÀNG</h2>
              <p>Home</p>
              <p>Shop</p>
            </Grid>
            <Grid item xs={3}>
              <h2>THÔNG TIN</h2>
              <p>Chính sách bảo mật</p>
              <p>Chính sách vận chuyển</p>
              <p>Chính sách đổi trả</p>
              <p>Quy định sử dụng</p>
            </Grid>
            <Grid item xs={3}>
              <h2>SÀN TMĐT</h2>
              <p>Shopee Hồ Chí Minh</p>
              <p>Shopee Hà Nội</p>
              <p>Shopee Đà Nẵng</p>
              <p>Lazada - LazMall</p>
            </Grid>
            <Grid item xs={3}>
              <h2>KẾT NỐI VỚI KILLIN</h2>
              <p>Địa chỉ: 
                <br></br>718 Cách Mạng Tháng 8, Tân Bình, HCM
                <br></br>95A Nguyễn Trọng Tuyển, Phú Nhuận, HCM
                <br></br>180 Đông Các, Đống Đa, Hà Nội
                <br></br>488 Hoàng Diệu, Đà Nẵng</p>
              <p>Điện thoại: 1900 252520</p>
            </Grid>
          </Grid>
          <p>Phương thức thanh toán <img src='/public/images/Zalo.png'></img></p>
          <Box
            sx={{
              flexGrow: 1,
              justifyContent: "center",
              display: "flex",
              mb: 2,
              color: 'white'
            }}
          >
            <Typography variant="caption" color="initial" sx={{ color: 'white' }}>
              © Bản quyền thuộc về Killin | Thiết kế bởi KILLIN
            </Typography>
          </Box>
        </Container>
      </Paper>
    </Box>
  );
};

export default index;
