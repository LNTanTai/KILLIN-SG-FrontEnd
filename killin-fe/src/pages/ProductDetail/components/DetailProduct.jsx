import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GET_PRODUCTS_ID } from "../../../services/constants/apiConstants";
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
} from "@mui/material";
import { LOGIN_PATH } from "../../../services/constants/pathConstants";

const DetailProduct = () => {
  const { id } = useParams();
  const [selectedProduct, setSelectedProduct] = useState([]);
  const loginInfo = JSON.parse(localStorage.getItem("loginInfo"));
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axiosUrl.get(GET_PRODUCTS_ID(id));
      const data = { ...response.data };
      setSelectedProduct(data);
      console.log(data);
    } catch (error) {
      console.error(`Error at DetailProduct: ${error}`);
    }
  };

  const handleAddToCart = () => {
    if (loginInfo === null) {
      navigate(`/${LOGIN_PATH}`);
    }
  }

  return (
    <div className="container">
      <Box component="main" sx={{ flexGrow: 1, p: 3, backgroundColor: 'lightgray' }}>
        <Toolbar />
        <Grid container spacing={3}>
          <Grid item xs={8}>
            <CardMedia
              component="img"
              alt={selectedProduct.productName}
              height="300"
              image={`${selectedProduct.productImages[1].url}`}
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
