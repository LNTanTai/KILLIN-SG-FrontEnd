import { Box, CssBaseline } from '@mui/material'
import React from 'react'
import Navbar from '../../components/Navbar'
import { Footer } from '../../services/constants/componentConstants'
import ProfilePage from './component/ProfilePage'

const index = () => {
    return (
        <Box sx={{ display: "column" }}>
            <CssBaseline />
            {/* <Navbar/> */}
            < ProfilePage />
            <Footer></Footer>
        </Box>
    )
}

export default index