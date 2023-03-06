import { CssBaseline, Box } from '@mui/material'
import React from 'react'
import { Footer } from '../../services/constants/componentConstants'
import BillHistory from './component/BillHistory'

const index = () => {
  return (
    <Box>
      <CssBaseline />
      <BillHistory></BillHistory>
      <Footer></Footer>
    </Box>
  )
}

export default index