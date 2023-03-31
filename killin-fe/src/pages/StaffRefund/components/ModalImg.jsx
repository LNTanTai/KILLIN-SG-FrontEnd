import { Box, CardMedia, IconButton, Toolbar } from "@mui/material";
import React from "react";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const ModalImg = ({
  currentIndexImg,
  imageList,
  clickImg,
  handleRoutationRight,
  handleRoutationLeft,
  setClickImg,
}) => {
  const handleClick = (e) => {
    if (e.target.classList.contains("dismiss")) {
      setClickImg(null);
    }
  };

  return (
    <Box
      className="dismiss"
      onClick={handleClick}
      component="main"
      sx={{
        alignItems: "center",
        display: "flex",
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        width: "100%",
        height: "100%",
        background: "rgba(27, 27, 27, 0.541)",
        flexGrow: 1,
      }}
    >
      <Toolbar />
      { currentIndexImg + 1 !== imageList.length ? imageList.length !== 1 &&<IconButton
      onClick={handleRoutationRight}
      sx={{
        display: "flex",
        position: "absolute",
        justifyContent: "space-between",
        width: "100px",
        height: "100px",
        color: "white",
        right: 0,
        mr: 15,
      }}
    >
      < ChevronRightIcon  sx={{ width: "90px", height: "90px" }} />
    </IconButton>
    : <></>}
      
      <CardMedia
        component="img"
        alt="productImages"
        image={clickImg}
        title="productImages"
        sx={{
          display: "block",
          maxWidth: "60%",
          maxHeight: "80%",
          margin: "20px auto 20px auto",
          boxShadow: "3px 5px 7px rgba(0, 0, 0, 0.5)",
        }}
      ></CardMedia>
      {console.log(currentIndexImg, imageList.length)}
      
      {  currentIndexImg !== 0 ? imageList.length !== 1 && <IconButton
        onClick={handleRoutationLeft}
        sx={{
          display: "flex",
          position: "absolute",
          justifyContent: "space-between",
          width: "100px",
          height: "100px",
          color: "white",
          left: 0,
          ml: 25,
        }}
      >
        < KeyboardArrowLeftIcon sx={{ width: "90px", height: "90px" }} />
      </IconButton> : <></>}
    </Box>
  );
};

export default ModalImg;
