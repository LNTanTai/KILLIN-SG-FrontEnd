import { Box, CssBaseline } from '@mui/material'
import React from 'react'
import Navbar from '../../components/Navbar'
import CartList from './components/CartList'

const index = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: 'column' }}>
      <CssBaseline />
      <Navbar />
      <CartList/>
    </Box>
  )
}

export default index

