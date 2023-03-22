import { Button, IconButton, Snackbar } from "@mui/material";
import React from "react";
import CloseIcon from "@mui/icons-material/Close";

const light = {
    palette: {
      mode: "light",
    },
  };
  
  const dark = {
    palette: {
      mode: "dark",
    },
  };

  const SimpleSnackbar = ({messageSnackbar, openSnackbar, handleCloseSnackbar}) => {
    // const [open, setOpen] = React.useState(false);

    // const handleClick = () => {
    //   setOpen(isOpen);
    // };

    // const handleClose = (event, reason) => {
    //   if (reason === "clickaway") {
    //     return;
    //   }

    //   setOpen(isOpen);
    // };

  const action = (
    <React.Fragment>
      {/* <Button color="secondary" size="small" onClick={handleClose}>
        UNDO
      </Button> */}
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleCloseSnackbar}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <div>
      {/* <Button onClick={handleClick}>Open simple snackbar</Button> */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={2000}
        onClose={handleCloseSnackbar}
        message={messageSnackbar}
        action={action}
      />
    </div>
    );
  }

  export {light, dark, SimpleSnackbar}