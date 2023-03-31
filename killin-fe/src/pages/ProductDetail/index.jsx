import React, { useEffect, useState } from 'react'
import { Footer, Navbar } from '../../services/constants/componentConstants'
import { Box } from '@mui/system'
import { CssBaseline } from '@mui/material'
import DetailProduct from './components/DetailProduct'
import { SimpleSnackbar } from '../../services/utils'
import { useLocation } from 'react-router-dom'

const ProductDetail = () => {
  const location = useLocation("");
  let notify = location?.state?.notify ?? "";
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [messageSnackbar, setMessageSnackbar] = useState("");

  useEffect(()=>{
    if (notify !== "") {
      setOpenSnackbar(true);
      setMessageSnackbar(notify);
      window.history.replaceState({ notify: "" }, document.title);
    }
  }, []);

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    } 
    setOpenSnackbar(false);
  };
  
  return (
    <Box sx={{ display: "flex", flexDirection: 'column' }}>
      <CssBaseline />
      {/* <Navbar /> */}
      <DetailProduct/>
      <Footer></Footer>
      <SimpleSnackbar
        messageSnackbar={messageSnackbar}
        handleCloseSnackbar={handleCloseSnackbar}
        openSnackbar={openSnackbar}
      />
    </Box>
  )
}

export default ProductDetail
