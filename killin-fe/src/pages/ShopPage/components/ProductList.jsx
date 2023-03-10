import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Collapse,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { axiosUrl } from "../../../services/api/axios";
import {
  GET_CATEGORY_NAME,
  GET_PRODUCTS,
  POST_ORDER,
  POST_SEARCH_FILTER,
} from "../../../services/constants/apiConstants";
import { useLocation } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import { LOGIN_PATH } from "../../../services/constants/pathConstants";
import jwtDecode from "jwt-decode";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

const initialValues = {
  categoryName: "",
  maxPrice: "",
  minPrice: "",
  productBrand: "",
  productName: "",
};

const ProductList = (props) => {
  const [open, setOpen] = useState(false);
  const [productData, setProductData] = useState([]);
  const [loadingCircular, setLoadingCircular] = useState(false);
  const loginInfo = JSON.parse(localStorage.getItem("loginInfo"));
  const location = useLocation("");
  const search = location?.state?.search ?? "";
  const [values, setvalues] = useState(initialValues);
  const [categoryItem, setCategoryItem] = useState("");
  const [categoryList, setCategoryList] = useState([]);

  const navigate = useNavigate();
  let token;
  if (loginInfo !== null) {
    token = jwtDecode(loginInfo);
  }

  useEffect(() => {
    if (search !== "" || search !== undefined) {
      setvalues({ ...values, productName: search });
    }
  }, [search])

  useEffect(() => {
    fetchData(props.categoryId);
  }, [props.categoryId]);

  const fetchData = async (categoryId) => {
    const params = {};
    try {
      setLoadingCircular(true);
      const response = await axiosUrl.get(GET_PRODUCTS, params);
      const data = [...response.data];

      const response2 = await axiosUrl.get(GET_CATEGORY_NAME, params);
      const data2 = [{ id: "", name: "tất cả" }, ...response2.data];

      let filter = [];
      if (categoryId === "0" || categoryId === undefined) {
        filter = data;
        setCategoryItem("");
      } else {
        setCategoryItem(data2[parseInt(categoryId)].name);
        filter = data.filter((product) => {
          return (
            product.productCategory.name === data2[parseInt(categoryId)].name
          );
        });
      }
      setCategoryList(data2);
      setProductData(filter);
      setLoadingCircular(false);
    } catch (error) {
      console.error(`Error at ProductList: ${error}`);
      setLoadingCircular(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const params = {
      categoryName: categoryItem === "tất cả" ? "" : categoryItem,
      maxPrice: values.maxPrice,
      minPrice: values.minPrice,
      productBrand: values.productBrand,
      productName: values.productName,
    };
    console.log(params)
    try {
      setLoadingCircular(true);
      const response = await axiosUrl.post(POST_SEARCH_FILTER, params);
      const data = [...response.data];

      setProductData(data);
      setLoadingCircular(false);
    } catch (error) {
      console.error(`Error at handleSubmit: ${error}`);
      setLoadingCircular(false);
    }
  };

  const handleAddToCart = (product) => {
    if (loginInfo === null) {
      navigate(`/${LOGIN_PATH}`);
    } else {
      // console.log(productData);
      addToCart(product);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setvalues({ ...values, [name]: value });
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
          <Card sx={{ width: "100%", border: "solid 1px", ml: 3, mt: 2 }}>
            <CardHeader
              title="Tìm kiếm nâng cao"
              titleTypographyProps={{
                align: "center",
                fontWeight: "bold",
              }}
              subheaderTypographyProps={{
                align: "center",
              }}
              action={
                <IconButton onClick={() => setOpen(!open)}>
                  {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                </IconButton>
              }
            />
            <Collapse in={open} timeout="auto" unmountOnExit>
              <CardContent sx={{ marginBottom: "2%" }}>
                <Box
                  component="form"
                  sx={{
                    display: "column",
                  }}
                  onSubmit={handleSubmit}
                >
                  <br />
                  <Grid container direction="column" spacing={2}>
                    <Grid item>
                      <TextField
                        id="productName"
                        name="productName"
                        fullWidth
                        variant="outlined"
                        label="Tên sản phẩm"
                        value={values.productName}
                        onChange={handleChange}
                      />
                    </Grid>
                    <Grid item>
                      <TextField
                        id="productBrand"
                        name="productBrand"
                        fullWidth
                        variant="outlined"
                        label="Nhãn hiệu"
                        value={values.productBrand}
                        onChange={handleChange}
                      />
                    </Grid>
                    <Grid item>
                      <TextField
                        id="minPrice"
                        name="minPrice"
                        sx={{ width: "50%" }}
                        variant="outlined"
                        label="Giá thấp nhất"
                        value={values.minPrice}
                        onChange={handleChange}
                      />
                      <TextField
                        id="maxPrice"
                        name="maxPrice"
                        sx={{ width: "50%" }}
                        variant="outlined"
                        label="Giá cao nhất"
                        value={values.maxPrice}
                        onChange={handleChange}
                      />
                    </Grid>
                    <Grid item>
                      <FormControl variant="standard" fullWidth required>
                        <InputLabel id="category-select-label">
                          Chọn loại hàng
                        </InputLabel>
                        <Select
                          labelId="category-select-label"
                          id="categoryItem"
                          value={categoryItem}
                          onChange={(event) =>
                            setCategoryItem(event.target.value)
                          }
                        >
                          {categoryList.map((data, index) => (
                            <MenuItem key={index} value={data.name}>
                              {data.name}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item>
                      <Button
                        variant="contained"
                        type="submit"
                        sx={{ height: "35px", width: "100%" }}
                      >
                        Tìm Kiếm Nâng Cao
                      </Button>
                    </Grid>
                  </Grid>
                </Box>
              </CardContent>
            </Collapse>
          </Card>
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
                search
                  ? product.productName
                    .toLowerCase()
                    .includes(search.toLowerCase())
                  : true
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
                            Price:{" "}
                            {parseFloat(product.productPrice).toLocaleString(
                              "en-US"
                            )}{" "}
                            VNĐ
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
