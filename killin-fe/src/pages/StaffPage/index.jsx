import { Box, CssBaseline } from '@mui/material'
import React from 'react'
import Navbar from '../../components/Navbar'

const index = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      {/* <Navbar /> */}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <h1>Staff Page</h1>
      </Box>
    </Box>
  )
}

export default index
