import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  GET_PRODUCTS_ID,
  GET_PRODUCT_COMMENT_BY_ID,
  POST_ADD_WISHLIST,
  POST_COMMENT,
  POST_GET_USER_BY_PHONENUMBER,
  POST_ORDER,
} from "../../../services/constants/apiConstants";
import { axiosUrl } from "../../../services/api/axios";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  TextField,
  Toolbar,
  Typography,
  Avatar,
  Menu,
  MenuItem,
} from "@mui/material";
import { LOGIN_PATH } from "../../../services/constants/pathConstants";
import jwtDecode from "jwt-decode";

const DetailProduct = () => {
  const { id } = useParams();
  const [selectedProduct, setSelectedProduct] = useState({});
  const [comment, setComment] = useState([]);
  const [selectIdComment, setSelectIdComment] = useState("");
  const [likeProduct, setLikeProduct] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [editedComment, setEditedComment] = useState(comment.comment);
  const [anchorEl, setAnchorEl] = useState(null);
  const loginInfo = JSON.parse(localStorage.getItem("loginInfo"));
  const navigate = useNavigate();
  let [url, setUrl] = useState();
  let [quantity, setQuantity] = useState(1);
  let token;
  if (loginInfo !== null) {
    token = jwtDecode(loginInfo);
  }
  useEffect(() => {
    commentAPI();
  }, [id]);

  useEffect(() => {
    fetchData();
  }, []);

  const onAdd = () => {
    if (quantity !== parseInt(selectedProduct.productQuantity)) {
      setQuantity(quantity + 1);
    }
  };

  const onMinus = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  const handleWishList = async () => {
    const params = {
      id: "",
      items: [
        {
          id: "",
          productId: selectedProduct.productId,
          wishlist: {}
        }
      ],
      userId: token.userId,
    };
    try {
      const response = await axiosUrl.post(POST_ADD_WISHLIST, params);
      console.log(response);
      console.log('Thêm vào sản phẩm yêu thích thành công');
    } catch (err) {
      console.error(`Error at handleWistList:  ${err}`);
    }
  }

  const addToCart = async () => {
    const params = {
      itemList: [
        {
          productId: selectedProduct.id,
          image: url,
          price: parseFloat(selectedProduct.productPrice),
          quantity: quantity,
        },
      ],
      totalPrice: `${parseFloat(quantity * selectedProduct.productPrice)}`,
      userId: token.userId,
    };
    try {
      const response = await axiosUrl.post(POST_ORDER, params);
      setLikeProduct(true);
      console.log(response);
    } catch (error) {
      console.error(`Error at addToCart: ${error}`);
    }
  };

  const fetchData = async () => {
    try {
      const response = await axiosUrl.get(GET_PRODUCTS_ID(id));
      const data = { ...response.data };
      setSelectedProduct(data);
      for (let index = 0; index < 1; index++) {
        const element = data.productImages[index];
        setUrl(element.url);
      }
      console.log(data);
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


  const handleAddToCart = () => {
    if (loginInfo === null) {
      navigate(`/${LOGIN_PATH}`);
    } else {
      addToCart();
    }
  };

  const handleCommentChange = (event) => {
    setEditedComment(event.target.value);
  };
  const handleCommentChange1 = (event) => {
    setNewComment(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (loginInfo == null) {
      alert("Bạn phải đăng nhập để có thể sử dụng tính năng này!");
      return;
    }
    const params = {
      comment: newComment,
      id: "", // ID của bình luận mới, có thể được tạo ngẫu nhiên hoặc dựa trên thời gian
      productId: selectedProduct.id, // ID của sản phẩm được xem
      userId: token.userId // ID người dùng đăng nhập
    };
    try {
      const response = await axiosUrl.post(POST_COMMENT, params);
      setNewComment("");
      commentAPI(); // Reload comments
      // Thực hiện các thao tác cần thiết khi lưu bình luận thành công, ví dụ: đặt lại giá trị newComment, tải lại danh sách bình luận, vv.
    } catch (error) {
      console.log(params);
      console.error(`Error at saveComment: ${error.response}`);
    }
  };
  const handleClickComment = (event, id) => {
    setAnchorEl(event.currentTarget);
    setSelectIdComment(id);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSaveComment = async () => {
    const params = {
      comment: editedComment,
      id: selectIdComment,
      productId: selectedProduct.id,
      userId: token.userId,
    };
    try {
      const response = await axiosUrl.put(POST_COMMENT, params);
      handleClose();
      setEditedComment("");
      commentAPI(); // Reload comments
    } catch (error) {
      console.error(`Error at handleSaveComment: ${error}`);
    }
  };
  const handleDeleteWishList = async () => {

  };

  return (
    <div className="container">
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, backgroundColor: "lightgray" }}
      >
        <Toolbar />
        <Grid container spacing={3}>
          <Grid item xs={8}>
            <CardMedia
              component="img"
              alt={selectedProduct.productName}
              height="500"
              width='300'
              image={url}
              title={selectedProduct.productName}
            ></CardMedia>
          </Grid>
          <Grid item xs={4}>
            <Card>
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  {selectedProduct.productName}
                </Typography>
                {quantity === 0 ? (
                  <></>
                ) : (
                  <Box sx={{ flex: 12, display: "inline-block" }}>
                    <Button onClick={() => onAdd()}>+</Button>
                    <Typography variant="div" color="textSecondary" width={5}>
                      {quantity}
                    </Typography>
                    <Button onClick={() => onMinus()}>-</Button>
                  </Box>
                )}
                {quantity === 0 ? (
                  <></>
                ) : (
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    style={{ marginTop: 25 }}
                  >
                    Price:{" "}
                    {parseFloat(
                      quantity * selectedProduct.productPrice
                    ).toLocaleString("en-US")}{" "}
                    VNĐ
                  </Typography>
                )}
                {quantity === 0 ? (
                  <h2>Hết sản phẩm</h2>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <Button
                      variant="contained"
                      color="primary"
                      style={{ marginTop: 25 }}
                      onClick={() => handleAddToCart()}
                    >
                      Add to Cart
                    </Button>
                    {
                      likeProduct == true ? (<Button
                        variant="contained"
                        style={{ marginTop: 25, backgroundColor: 'red' }}
                        onClick={() => handleDeleteWishList()}
                      >
                        Bỏ yêu thích
                      </Button>) : (
                        <Button
                          variant="contained"
                          style={{ marginTop: 25, backgroundColor: 'red' }}
                          onClick={() => handleWishList()}
                        >
                          Yêu thích
                        </Button>
                      )
                    }
                  </div>
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        <div
          style={{
            width: "66.2%",
            backgroundColor: "lightgray",
            marginTop: "10px",
          }}
        >
          <div
            style={{
              padding: "10px 30px 30px 30px",
            }}
          >
            <Typography variant="body2" color="black">
              <h1>Mô tả sản phẩm:</h1>
              {selectedProduct.description}
            </Typography>
          </div>
        </div>
        <div
          style={{
            width: "66.2%",
            backgroundColor: "lightgray",
            marginTop: "10px",
          }}
        >
          <div
            style={{
              padding: "10px 30px 30px 30px",
            }}
          >
            <h1>Bình luận: </h1>
            {comment.length === 0 && <p>Không có bình luận</p>}
            {comment.map((data) => (
              <div key={data.id} style={{ border: 'solid 1px', margin: '10px 10px 10px 0', borderRadius: '10px' }}>
                <div style={{ display: 'flex', flexDirection: 'row', padding: '10px' }}>
                  <Avatar></Avatar>
                  <div style={{ paddingTop: '8px', paddingLeft: '10px', display: 'flex', flexDirection: 'row' }}>
                    {data.comment}

                    {data.userId === token.userId && (
                      <div style={{ paddingLeft: '300px', paddingBottom: '2px' }}>
                        <Button
                          variant="text"
                          onClick={(event) => handleClickComment(event, data.id)}
                        >
                          Update
                        </Button>
                        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
                          <MenuItem onClick={() => {}}>
                            <TextField label="Edit comment" value={editedComment} onChange={handleCommentChange1} />
                          </MenuItem>
                          <MenuItem><Button onClick={handleSaveComment}>Save</Button></MenuItem>
                        </Menu>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
            <br></br>
            <form onSubmit={handleSubmit}>
              <TextField
                id="new-comment"
                label="Add a comment"
                variant="outlined"
                multiline
                rows={4}
                value={newComment}
                onChange={handleCommentChange}
                style={{
                  width: '100%',
                  paddingBottom: '10px'
                }}
              />
              <Button variant="contained" color="primary" type="submit">
                Thêm bình luận{" "}
              </Button>
            </form>
          </div>
        </div>
      </Box>
    </div>
  );
};

export default DetailProduct;
