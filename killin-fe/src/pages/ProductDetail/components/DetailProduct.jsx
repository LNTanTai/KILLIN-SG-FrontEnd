import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  GET_PRODUCTS_ID,
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
} from "@mui/material";
import { LOGIN_PATH } from "../../../services/constants/pathConstants";
import jwtDecode from "jwt-decode";

const DetailProduct = () => {
  const { id } = useParams();
  let [selectedProduct, setSelectedProduct] = useState({});
  const loginInfo = JSON.parse(localStorage.getItem("loginInfo"));
  const navigate = useNavigate();
  let [url, setUrl] = useState();
  let [quantity, setQuantity] = useState(1);
  let token;
  if (loginInfo !== null) {
    token = jwtDecode(loginInfo);
  }

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
      // console.log(data);
    } catch (error) {
      console.error(`Error at DetailProduct: ${error}`);
    }
  };

  const handleAddToCart = () => {
    if (loginInfo === null) {
      navigate(`/${LOGIN_PATH}`);
    }
    else{
      addToCart();
    }
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
              height="400"
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
                <Box sx={{ flex: 12, display: "inline-block" }}>
                  <Button onClick={() => onAdd()}>+</Button>
                  <Typography
                    variant="div"
                    color="textSecondary"
                    width={5}
                  >
                    {quantity}
                  </Typography>
                  <Button onClick={() => onMinus()}>-</Button>
                </Box>
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
        <Typography variant="body2" color="textSecondary">
          Description: {selectedProduct.description}
        </Typography>
      </Box>
    </div>
  );
};

export default DetailProduct;
