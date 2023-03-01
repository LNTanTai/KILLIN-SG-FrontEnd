import { Box, CssBaseline } from '@mui/material'
import React from 'react'
import Navbar from '../../components/Navbar'
import OwnerDashboard from './components/OwnerDashboard'

const index = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: 'column' }}>
      <CssBaseline />
      <Navbar />
      <OwnerDashboard/>
    </Box>
  )
}

export default index
