import React from 'react'
import { Navbar, ProductList, SizeBar } from '../../services/constants/componentConstants'
import { Box } from '@mui/system'
import { CssBaseline } from '@mui/material'

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

