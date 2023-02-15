import React from 'react'
import { Navbar, SizeBar } from '../../services/constants/componentConstants'
import { Box } from '@mui/system'
import { CssBaseline } from '@mui/material'
import ProductList from './components/ProductList'
///
const HomePage = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Navbar/>
      <SizeBar/>
      <ProductList/>
    </Box>
  )
}

export default HomePage

