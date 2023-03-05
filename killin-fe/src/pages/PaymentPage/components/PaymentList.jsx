import { Box, Button, Toolbar } from '@mui/material'
import React from 'react'

const PaymentList = ({payment}) => {
  return (
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
      <Toolbar />
      <>PaymentList</>
      <Button onClick={()=>payment()}>ok</Button>
    </Box>
  )
}

export default PaymentList
