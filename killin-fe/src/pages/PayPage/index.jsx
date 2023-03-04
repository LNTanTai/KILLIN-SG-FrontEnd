import React from 'react'
import { Footer, Navbar } from '../../services/constants/componentConstants'
import { Box } from '@mui/system'
import PaymentForm from './component/Payment'

const PaymentMethod = () => {
    return (
        <Box sx={{ display: "flex", flexDirection: 'column' }}>
            <PaymentForm></PaymentForm>
            <Footer></Footer>
        </Box>
    )
}

export default PaymentMethod