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
import React, { useEffect, useState } from "react";
import { axiosUrl } from "../../../services/api/axios";
import { GET_PRODUCTS } from "../../../services/constants/apiConstants";
import { Link } from "react-router-dom";
import { PRODUCT_DETAIL_PATH } from "../../../services/constants/pathConstants";

const ProductList = () => {
  const [productData, setProductData] = useState([]);

  useEffect(() => {
    fetchData();
  }, [productData]);

  const fetchData = async () => {
    const params = {};
    try {
      const response = await axiosUrl.get(GET_PRODUCTS, params);
      const data = [...response.data];
      // console.log(data);
      setProductData(data);
    } catch (error) {
      console.error(`Error at ProductList: ${error}`);
    }
  };

  return (
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
      <Toolbar />
      <Grid container spacing={3}>
        {productData.map((product) => (
          <Grid item xs={3} key={product.id}>
            <Card>
              <Link to={`${PRODUCT_DETAIL_PATH}/${product.id}`}>
                <CardMedia
                  component="img"
                  alt={product.productName}
                  height="300"
                  image={product.productImages[0].url}
                  title={product.productName}
                />
              </Link>
              <CardContent>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="h2"
                  align="center"
                >
                  {product.productName}
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={5}>
                    <Typography variant="body2" color="textSecondary">
                      Price: {product.productPrice} VNĐ
                    </Typography>
                  </Grid>
                  <Grid item xs={7}>
                    <Button variant="contained" color="primary">
                      Add to Cart
                    </Button>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ProductList;
