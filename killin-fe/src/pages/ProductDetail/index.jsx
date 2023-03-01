import React from 'react'
import { Navbar } from '../../services/constants/componentConstants'
import { Box } from '@mui/system'
import { CssBaseline } from '@mui/material'
import DetailProduct from './components/DetailProduct'

const ProductDetail = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      {/* <Navbar /> */}
      <DetailProduct/>
    </Box>
  )
}

export default ProductDetail
