import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GET_PRODUCTS_ID, GET_PRODUCT_COMMENT_BY_ID, POST_COMMENT } from "../../../services/constants/apiConstants";
import { axiosUrl } from "../../../services/api/axios";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Toolbar,
  Typography,
  TextField,
  Avatar
} from "@mui/material";
import { LOGIN_PATH } from "../../../services/constants/pathConstants";
import jwtDecode from "jwt-decode";

const DetailProduct = () => {
  const { id } = useParams();
  const [selectedProduct, setSelectedProduct] = useState({});
  const [comment, setComment] = useState([]);
  const [newComment, setNewComment] = useState("");
  const loginInfo = JSON.parse(localStorage.getItem("loginInfo"));
  const navigate = useNavigate();
  let token;
  if (loginInfo !== null) {
    token = jwtDecode(loginInfo);
  }
  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {
    commentAPI();
  }, [id]);
  const fetchData = async () => {
    try {
      const response = await axiosUrl.get(GET_PRODUCTS_ID(id));
      const data = { ...response.data };
      setSelectedProduct(data);
      // console.log(data.productImages[0].url);
      // console.log(data.productImages[0]);
      console.log(data.id);
    } catch (error) {
      console.error(`Error at DetailProduct: ${error}`);
    }
  };

  const commentAPI = async () => {
    try {
      const response = await axiosUrl.get(GET_PRODUCT_COMMENT_BY_ID(id));
      const commentData = [...response.data];
      setComment(commentData);
      console.log(commentData);
    } catch (error) {
      console.error(`Error at DetailProduct: ${error}`);
    }
  };

  const requireLogin = () => {
    // if (loginInfo === null) {
    //   alert('Bạn cần đăng nhập để sử dụng tính năng này!');
    //   navigate(`/${LOGIN_PATH}`);
    //   return false;
    // }

    return true;
  }

  const handleAddToCart = () => {
    if (loginInfo === null) {
      navigate(`/${LOGIN_PATH}`);
    }
  }

  const handleCommentChange = (event) => {
    setNewComment(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!requireLogin()) {
      return;
    }
    try {
      const response = await axiosUrl.post(POST_COMMENT, {
        comment: newComment,
        id: "ad491d57-a4b2-4462-a209-c83f4f701d18", // ID của bình luận mới, có thể được tạo ngẫu nhiên hoặc dựa trên thời gian
        productId: "c3b6366d-e772-451e-96ec-192338bbfe92", // ID của sản phẩm được xem
        userId: "239fa0a7-c1a8-4449-853e-2b21488bbb67" // ID người dùng đăng nhập
      });
      setNewComment("");
      commentAPI(); // Reload comments
      // Thực hiện các thao tác cần thiết khi lưu bình luận thành công, ví dụ: đặt lại giá trị newComment, tải lại danh sách bình luận, vv.
    } catch (error) {
      console.error(`Error at saveComment: ${error}`);
    }
  };

  return (
    <div className="container">
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Grid container spacing={3}>
          <Grid item xs={8}>
            <CardMedia
              component="img"
              alt={selectedProduct.productName}
              height="500"
              // image={selectedProduct.productImages[0].url}
              title={selectedProduct.productName}
            />
          </Grid>
          <Grid item xs={4}>
            <Card>
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  {selectedProduct.productName}
                </Typography>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  style={{ marginTop: 25 }}
                >
                  Price: {selectedProduct.productPrice} VNĐ
                </Typography>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  style={{ marginTop: 25 }}
                >
                  Quantity:
                  <Button>-</Button>
                  {selectedProduct.productQuantity}
                  <Button>+</Button>
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  style={{ marginTop: 25 }}
                  onClick={() => handleAddToCart()}
                >
                  Add to Cart
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        <div style={{
          width: '66.2%',
          backgroundColor: 'lightgray',
          marginTop: '10px',
        }}>
          <div style={{
            padding: '10px 30px 30px 30px',
          }}>
            <Typography variant="body2" color="black">
              <h1>Mô tả sản phẩm:</h1>
              {selectedProduct.description}
            </Typography>
          </div>
        </div>
        <div style={{
          width: '66.2%',
          backgroundColor: 'lightgray',
          marginTop: '10px',
        }}>
          <div style={{
            padding: '10px 30px 30px 30px',
          }}>
            <h1>Bình luận: </h1>
            {comment.length === 0 && <p>Không có bình luận</p>}
            {comment.map((data) => (
              <div key={data.id} style={{ border: 'solid 1px' }}>
                <div style={{ display: 'flex', flexDirection: 'row', padding: '10px' }}>
                  <Avatar></Avatar>
                  <div style={{ paddingTop: '8px', paddingLeft: '10px' }}>{data.comment}</div>
                </div>
              </div>
            ))}<br></br>
            <form onSubmit={handleSubmit}>
              <TextField
                id="new-comment"
                label="Add a comment"
                variant="outlined"
                multiline
                rows={4}
                value={newComment}
                onChange={handleCommentChange}
                style={{ width: '100%' }}
              />
              <Button variant="contained" color="primary" type="submit">Thêm bình luận </Button>
            </form>

          </div>
        </div>
      </Box>
    </div>
  );
};

export default DetailProduct;
