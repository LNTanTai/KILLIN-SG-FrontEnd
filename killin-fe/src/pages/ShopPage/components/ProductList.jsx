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
import React, { useEffect, useMemo, useState } from "react";
import { axiosUrl } from "../../../services/api/axios";
import { GET_PRODUCTS, POST_ORDER } from "../../../services/constants/apiConstants";
import { useLocation } from 'react-router-dom';
import {
  HOMEPAGE_PATH,
  PRODUCT_DETAIL_PATH,
} from "../../../services/constants/pathConstants";
import { Link, useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import { LOGIN_PATH } from "../../../services/constants/pathConstants";
import jwtDecode from "jwt-decode";

const ProductList = (props) => {
  const [productData, setProductData] = useState([]);
  const [loadingCircular, setLoadingCircular] = useState(false);
  const loginInfo = JSON.parse(localStorage.getItem("loginInfo"));
  const location = useLocation('');
  const search = location?.state?.search;
  const navigate = useNavigate();
  let token;
  if (loginInfo !== null) {
    token = jwtDecode(loginInfo);
  }

  useEffect(() => {
    fetchData(props.categoryId);
  }, [props.categoryId, search]);
  useEffect(() => {
    console.log(search);
  }, [search]);

  const fetchData = async (categoryId) => {
    const params = {};
    try {
      setLoadingCircular(true);
      const response = await axiosUrl.get(GET_PRODUCTS, params);
      const data = [...response.data];
      let filter = [];
      if (categoryId === "1") {
        filter = data.filter((product) => {
          return product.productCategory.name === "áo";
        });
      } else if (categoryId === "2") {
        filter = data.filter((product) => {
          return product.productCategory.name === "áo hoodie";
        });
      } else if (categoryId === "3") {
        filter = data.filter((product) => {
          return product.productCategory.name === "áo polo";
        });
      } else if (categoryId === "4") {
        filter = data.filter((product) => {
          return product.productCategory.name === "quần";
        });
      } else if (categoryId === "5") {
        filter = data.filter((product) => {
          return product.productCategory.name === "nón";
        });
      } else {
        filter = data;
      }
      setProductData(filter);
      setLoadingCircular(false);
    } catch (error) {
      console.error(`Error at ProductList: ${error}`);
      setLoadingCircular(false);
    }
  };

  const handleAddToCart = (product) => {
    if (loginInfo === null) {
      navigate(`/${LOGIN_PATH}`);
    }
    else{
      // console.log(productData);
      addToCart(product);
    }
  };

  const addToCart = async (product) => {
    const params = {
      itemList: [
        {
          productId: product.id,
          image: product.productImages[0].url,
          price: parseFloat(product.productPrice),
          quantity: "1",
        },
      ],
      totalPrice: `${parseFloat(product.productPrice)}`,
      userId: token.userId,
    };
    try {
      const response = await axiosUrl.post(POST_ORDER, params);
      console.log(response);
    } catch (error) {
      console.error(`Error at addToCart: ${error}`);
    }
  };

  return (
    <>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Grid container spacing={3}>
          {console.log(productData)}
          {loadingCircular === true ? (
            <CircularProgress size={120} sx={{ mt: 30 }} />
          ) : productData.length === 0 ? (
            <Typography
              sx={{
                flexGrow: 1,
                justifyContent: "center",
                display: "flex",
              }}
              variant="h3"
              component="div"
            >
              Không còn hàng
            </Typography>
          ) : (
                productData
                  .filter((product) =>
                    search ? product.productName.toLowerCase().includes(search.toLowerCase()) : true
                  )
            .map((product) => (
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
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => {
                            handleAddToCart(product);
                          }}
                        >
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