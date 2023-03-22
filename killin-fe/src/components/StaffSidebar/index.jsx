import {
    Box,
    Divider,
    Drawer,
    ListItem,
    ListItemButton,
    ListItemText,
    Toolbar,
  } from "@mui/material";
  import React from "react";
  import { NavLink } from "react-router-dom";
  import {
    REFUND_PATH,
    STAFF_PATH,
  } from "../../services/constants/pathConstants";
  
  const drawerWidth = 190;

  const StaffPageArray = [
    { name: "Quản lý hóa đơn", path: STAFF_PATH },
    { name: "Quản lý đổi trả hàng", path: REFUND_PATH },
  ];

const Index = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />

        {StaffPageArray.map((text, index) => (
          <NavLink
            to={text.path}
            style={{ textDecoration: "none" }}
            key={index}
          >
            <br />
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemText primary={text.name} />
              </ListItemButton>
            </ListItem>
            <Divider />
          </NavLink>
        ))}
      </Drawer>
    </Box>
  )
}

export default Index
