import { Box, CssBaseline } from '@mui/material'
import React from 'react'
import Navbar from '../../components/Navbar'
import { Footer, SizeBar } from '../../services/constants/componentConstants'
import ProfilePage from './component/ProfilePage'

const index = () => {
    return (
        <Box>
            <CssBaseline />
            {/* <Navbar /> */}
            < ProfilePage />
            <Footer></Footer>
        </Box>
    )
}

export default index