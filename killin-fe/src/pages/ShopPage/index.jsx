import { Box, CssBaseline } from '@mui/material';
import React from 'react'
import { useLocation, useParams } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import { SizeBar } from '../../services/constants/componentConstants';
import ProductList from './components/ProductList';

const Shoppage = () => {
    const { id: categoryId } = useParams(0);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      {/* <NavBar></NavBar> */}
      <SizeBar />
      <ProductList categoryId={categoryId} />
    </Box>
  )
}

export default Shoppage
