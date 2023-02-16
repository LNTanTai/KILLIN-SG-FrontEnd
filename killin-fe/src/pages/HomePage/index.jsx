import React from "react";
import { Navbar, SizeBar } from "../../services/constants/componentConstants";
import { Box } from "@mui/system";
import { CssBaseline } from "@mui/material";
import ProductList from "./components/ProductList";
import { useParams } from "react-router-dom";

const HomePage = () => {
  const { id: categoryId } = useParams(0);
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Navbar />
      <SizeBar />
      <ProductList categoryId={categoryId} />
    </Box>
  );
};

export default HomePage;
