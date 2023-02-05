import { Box, CssBaseline } from '@mui/material'
import React from 'react'
import { Navbar } from '../../services/constants/componentConstants'

const index = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Navbar/>
      
    </Box>
  )
}

export default index

