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
import { Link, useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import { LOGIN_PATH } from "../../../services/constants/pathConstants";

const ProductList = (props) => {
  const [productData, setProductData] = useState([]);
  const [loadingCircular, setLoadingCircular] = useState(false);
  const loginInfo = JSON.parse(localStorage.getItem("loginInfo"));
  const navigate = useNavigate();

  useEffect(() => {
    fetchData(props.categoryId);
  }, [props.categoryId]);

  const fetchData = async (categoryId) => {
    const params = {};
    try {
      setLoadingCircular(true);
      const response = await axiosUrl.get(GET_PRODUCTS, params);
      const data = [...response.data];
      if (categoryId === "1") {
        const filter = data.filter((product) => {
          return product.productCategory.name === "áo";
        });
        setProductData(filter);
        setLoadingCircular(false);
      } else if (categoryId === "2") {
        const filter = data.filter((product) => {
          return product.productCategory.name === "áo hoodie";
        });
        setProductData(filter);
        setLoadingCircular(false);
      } else if (categoryId === "3") {
        const filter = data.filter((product) => {
          return product.productCategory.name === "áo polo";
        });
        setProductData(filter);
        setLoadingCircular(false);
      } else if (categoryId === "4") {
        const filter = data.filter((product) => {
          return product.productCategory.name === "quần ";
        });
        setProductData(filter);
        setLoadingCircular(false);
      } else if (categoryId === "5") {
        const filter = data.filter((product) => {
          return product.productCategory.name === "nón";
        });
        setProductData(filter);
        setLoadingCircular(false);
      } else {
        setProductData(data);
        setLoadingCircular(false);
      }
    } catch (error) {
      console.error(`Error at ProductList: ${error}`);
      setLoadingCircular(false);
    }
  };

  const handleAddToCart = () => {
    if(loginInfo ===null){
      navigate(`/${LOGIN_PATH}`);
    }
  }

  return (
    <>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Grid container spacing={3}>
          {loadingCircular === true ? (
            <CircularProgress size={120} sx={{ mt: 30 }} />
          ) : productData.length === 0 ? (
            <h1>Không còn hàng</h1>
          ) : (
            productData.map((product) => (
              <Grid item xs={3} key={product.id}>
                <Card>
                  {loginInfo !== null ? (
                    <Link to={`/user/product-detail/${product.id}`}>
                      <CardMedia
                        component="img"
                        alt={product.productName}
                        height="300"
                        image={product.productImages[0].url}
                        title={product.productName}
                      />
                    </Link>
                  ) : (
                    <Link to={`/product-detail/${product.id}`}>
                      <CardMedia
                        component="img"
                        alt={product.productName}
                        height="300"
                        image={product.productImages[0].url}
                        title={product.productName}
                      />
                    </Link>
                  )}
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
                        <Button variant="contained" color="primary" onClick={()=>{handleAddToCart()}}>
                          Add to Cart
                        </Button>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            ))
          )}
        </Grid>
      </Box>
    </>
  );
};
//
export default ProductList;
