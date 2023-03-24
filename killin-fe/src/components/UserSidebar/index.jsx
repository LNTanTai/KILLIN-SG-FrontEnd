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
    VIEW_BILL_PATH,
    VIEW_REFUND_PATH,
  } from "../../services/constants/pathConstants";
  
  const drawerWidth = 190;
  const OwnerPageArray = [
    { name: "Lịch sử hóa đơn", path: VIEW_BILL_PATH },
    { name: "Đổi trả hàng", path: VIEW_REFUND_PATH },
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
  
          {OwnerPageArray.map((text, index) => (
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
    );
  };
  
  export default Index;
  