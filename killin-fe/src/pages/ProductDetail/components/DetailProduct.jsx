import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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

const DetailProduct = () => {
  const { id } = useParams();
  const [selectedProduct, setSelectedProduct] = useState({});

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axiosUrl.get(GET_PRODUCTS_ID(id));
      const data = { ...response.data };
      setSelectedProduct(data);
    } catch (error) {
      console.error(`Error at DetailProduct: ${error}`);
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
              height="300"
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
                <Button
                  variant="contained"
                  color="primary"
                  style={{ marginTop: 25 }}
                >
                  Add to Cart
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
      <Typography variant="body2" color="textSecondary">
        Description: {selectedProduct.description}
      </Typography>
    </div>
  );
};

export default DetailProduct;
