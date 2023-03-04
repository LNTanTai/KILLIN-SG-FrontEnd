import { Box, CssBaseline } from '@mui/material'
import React from 'react'
import CheckOutList from './components/CheckOutList'

const Index = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <CssBaseline />
      <CheckOutList />
    </Box>
  )
}

export default Index
