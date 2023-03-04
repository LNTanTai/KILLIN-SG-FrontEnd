import { Box, CssBaseline } from '@mui/material'
import React from 'react'
import Navbar from '../../components/Navbar'
import { SizeBar } from '../../services/constants/componentConstants'
import ProfilePage from './components/ProfilePage'

const index = () => {
    return (
        <Box sx={{ display: "flex" }}>
            <CssBaseline />
            {/* <Navbar /> */}
            < ProfilePage />
        </Box>
    )
}

export default index