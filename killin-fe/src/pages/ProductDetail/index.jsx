import React from 'react'
import { Footer, Navbar } from '../../services/constants/componentConstants'
import { Box } from '@mui/system'
import { CssBaseline } from '@mui/material'
import DetailProduct from './components/DetailProduct'

const ProductDetail = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: 'column' }}>
      <CssBaseline />
      {/* <Navbar /> */}
      <DetailProduct/>
      <Footer></Footer>
    </Box>
  )
}

export default ProductDetail
