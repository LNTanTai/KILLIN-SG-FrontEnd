import React, { useEffect, useState } from "react";
import { Footer, Navbar, SizeBar } from "../../services/constants/componentConstants";
import { Box } from "@mui/system";
import { CssBaseline, Toolbar } from "@mui/material";
import Banner from "./components";
import { SimpleSnackbar } from "../../services/utils";
import { useLocation } from "react-router-dom";

const HomePage = () => {
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

  useEffect(() => {
    const body = document.querySelector("#root");

    body.scrollIntoView(
      {
        behavior: "auto",
      },
      500
    );
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
      {/* <Navbar/> */}
      <Banner />
      <Footer />
      <SimpleSnackbar
        messageSnackbar={messageSnackbar}
        handleCloseSnackbar={handleCloseSnackbar}
        openSnackbar={openSnackbar}
      />
    </Box>
  );
};

export default HomePage;
