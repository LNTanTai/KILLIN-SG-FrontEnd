import { Box, CssBaseline } from "@mui/material";
import React, { useEffect, useState } from "react";
import Navbar from "../../../components/Navbar";
import OwnerDashboard from "./components/OwnerDashboard";
import { axiosUrl } from "../../../services/api/axios";
import { GET_PRODUCTS } from "../../../services/constants/apiConstants";
import { OwnerSidebar } from "../../../services/constants/componentConstants";

const product = [];

const Index = () => {
  const [isloading, setIsLoading] = useState(false);
  const [productData, setProductData] = useState(product);
  const [searchedVal, setSearchedVal] = useState("");
  const pages = [10, 25, 100];
  const [page, setPage] = useState(0);
  const [pageSave, setPageSave] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(pages[page]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const params = {};
    try {
      const response = await axiosUrl.get(GET_PRODUCTS, params);
      const data = [...response.data];
      console.log(data);
      setProductData(data);
    } catch (error) {
      console.error(`Error at OwnerDashboard: ${error}`);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    setPageSave(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
    setPageSave(0);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      {/* <Navbar /> */}
      <OwnerSidebar />
      <OwnerDashboard
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
