import { Box, CssBaseline } from "@mui/material";
import React, { useEffect, useState } from "react";
import Navbar from "../../../components/Navbar";
import OwnerDashboard from "./components/OwnerDashboard";
import { axiosUrl } from "../../../services/api/axios";
import {
  GET_CATEGORY_NAME,
  GET_PRODUCTS,
  GET_PRODUCTS_ID,
} from "../../../services/constants/apiConstants";
import { OwnerSidebar } from "../../../services/constants/componentConstants";

const product = [];

const initialValues = {
  id: "",
  name: "",
  quantity: "",
  brand: "",
  price: "",
  category: {
    id: "",
  },
  productImages: [
    {
      url: "",
    },
  ],
  description: "",
};

const Index = () => {
  const [isloading, setIsLoading] = useState(false);
  const [productData, setProductData] = useState(product);
  const [searchedVal, setSearchedVal] = useState("");
  const [values, setvalues] = useState(initialValues);
  const [isAddNew, setIsAddNew] = useState(false);
  const [isUpdateRow, setIsUpdateRow] = useState(false);
  const [categoryList, setCategoryList] = useState([]);
  const [categoryItem, setCategoryItem] = useState("");

  const pages = [10, 25, 100];
  const [page, setPage] = useState(0);
  const [pageSave, setPageSave] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(pages[page]);

  // useEffect(() => {
  //   fetchData();
  // }, []);

  const [temp, setTemp] = useState(0)

  useEffect(()=>{
    setInterval(()=>{
      setTemp((prevTemp)=>prevTemp+1)
    }, 2000)
  }, [])
  
  useEffect(()=>{
    fetchData()
  }, [temp])

  const fetchData = async () => {
    const params = {};
    try {
      const response = await axiosUrl.get(GET_PRODUCTS, params);
      const data = [...response.data];

      const response2 = await axiosUrl.get(GET_CATEGORY_NAME, params);
      const data2 = [...response2.data];

      console.log(data);
      setCategoryList([]);
      setCategoryList(data2);

      // console.log(data);
      setProductData(product);
      setProductData(data);
    } catch (error) {
      console.error(`Error at OwnerDashboard: ${error}`);
    }
  };

  const addData = async (value, category) => {
    const categoryItem = {
      id: category,
    };
    const params = {
      name: value.name,
      brand: value.brand,
      quantity: value.quantity,
      price: value.price,
      category: categoryItem,
      productImages: value.productImages,
      description: value.description,
    };
    try {
      await axiosUrl.post(GET_PRODUCTS, params);
      setvalues(initialValues);
      setCategoryItem("");
      setIsAddNew(false);
      fetchData();
    } catch (error) {
      console.error(`Error at addData: ${error}`);
    }
  };

  const updateData = async (value, category) => {
    const categoryItem = {
      id: category,
    };
    const params = {
      id: value.id,
      name: value.name,
      brand: value.brand,
      quantity: value.quantity,
      price: value.price,
      category: categoryItem,
      productImages: value.productImages,
      description: value.description,
      status: "true",
    };
    try {
      await axiosUrl.put(GET_PRODUCTS, params);
      setvalues(initialValues);
      setCategoryItem("");

      setIsUpdateRow(false);
      fetchData();
    } catch (error) {
      console.error(`Error at updateData: ${error}`);
    }
  };

  const handleDelete = async (value) => {
    try {
      await axiosUrl.delete(GET_PRODUCTS_ID(value.id));

      fetchData();
    } catch (error) {
      console.error(`Error at handleDelete: ${error}`);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    setPageSave(newPage);
  };

  const handleUrlAdd = (e, index) => {
    const urlAdd = {
      url: "",
    };
    const list = [...values.productImages, urlAdd];
    setvalues({ ...values, productImages: list });
  };

  const handleUrlRemove = (index) => {
    const list = [...values.productImages];
    list.splice(index, 1);
    setvalues({ ...values, productImages: list });
  };

  const handleUrlChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...values.productImages];
    list[index][name] = value;
    setvalues({ ...values, productImages: list });
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
    setPageSave(0);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(values);
    isAddNew === true
      ? addData(values, categoryItem)
      : updateData(values, categoryItem);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setvalues({ ...values, [name]: value });
  };

  const showAddForm = () => {
    setIsAddNew(true);
    setIsUpdateRow(false);
  };

  const showUpdateForm = (row) => {
    setIsAddNew(false);
    setIsUpdateRow(true);
    console.log(row);

    const data = {
      id: row.id,
      name: row.productName,
      quantity: row.productQuantity,
      brand: row.productBrand,
      price: row.productPrice,
      category: {
        id: "",
      },
      productImages: row.productImages,
      description: row.description,
    };
    setCategoryItem(row.productCategory.id);
    setvalues(data);
    console.log(categoryItem);
  };

  const cancelForm = () => {
    setvalues(initialValues);
    setCategoryItem("");
    setIsAddNew(false);
    setIsUpdateRow(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      {/* <Navbar /> */}
      <OwnerSidebar />
      <OwnerDashboard
        setPage={setPage}
        handleDelete={handleDelete}
        setCategoryItem={setCategoryItem}
        categoryItem={categoryItem}
        categoryList={categoryList}
        handleUrlRemove={handleUrlRemove}
        handleUrlAdd={handleUrlAdd}
        handleUrlChange={handleUrlChange}
        // handleDelete={handleDelete}
        showAddForm={showAddForm}
        showUpdateForm={showUpdateForm}
        cancelForm={cancelForm}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        values={values}
        isUpdateRow={isUpdateRow}
        isAddNew={isAddNew}
        setSearchedVal={setSearchedVal}
        isloading={isloading}
        productData={productData}
        searchedVal={searchedVal}
        page={page}
        rowsPerPage={rowsPerPage}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Box>
  );
};

export default Index;
