import React from "react";
import CategoryDashBoard from "./components/CategoryDashBoard";
import Navbar from "../../../components/Navbar";
import { Box, CssBaseline } from "@mui/material";
import { OwnerSidebar } from "../../../services/constants/componentConstants";
import { useEffect } from "react";
import { useState } from "react";
import { axiosUrl } from "../../../services/api/axios";
import { GET_CATEGORY_NAME } from "../../../services/constants/apiConstants";

const category = [];

const Index = () => {
  const [categoryList, setCategoryList] = useState(category);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const params = {};
    try {
      const response = await axiosUrl.get(GET_CATEGORY_NAME, params);
      const data = [...response.data];
      console.log(data);
      setCategoryList(data);
    } catch (error) {
      console.error(`Error at fetchData: ${error}`);
    }
  };
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      {/* <Navbar /> */}
      <OwnerSidebar />
      <CategoryDashBoard categoryList={categoryList}/>
    </Box>
  );
};

export default Index;
