import { Box, CssBaseline } from '@mui/material'
import React from 'react'
import Navbar from '../../components/Navbar'
import AdminDashboard from './components/AdminDashboard'

const index = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      {/* <Navbar /> */}
      <AdminDashboard/>
    </Box>
  )
}

export default index
