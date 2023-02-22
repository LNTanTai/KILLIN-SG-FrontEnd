import {
  Box,
  Divider,
  Drawer,
  Link,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import CheckroomIcon from "@mui/icons-material/Checkroom";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import {
  HOMEPAGE_PATH,
} from "../../services/constants/pathConstants";

const drawerWidth = 190;
const CategoryArray = ["Tất cả", "Áo", "Áo hoodie", "Áo polo", "Quần", "Nón"];

const SideBar = () => {
  const [chooseCate, setchooseCate] = useState();
  const loginInfo = JSON.parse(localStorage.getItem("loginInfo"));
  const chooseCategory = (ctg) => {
    setchooseCate(ctg);
    // console.log(chooseCate);
  };

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
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          sx={{ mt: 2, mb: 1 }}
        >
          <Typography variant="h5" component="div">
            Category
          </Typography>
        </Box>
        <Divider />

        {CategoryArray.map((text, index) => (
          <List key={index}>
            {loginInfo!==null?(<Link href={`/user/shop/product-list/${index}`} underline="none">
              <ListItem disablePadding>
                <ListItemButton onClick={() => chooseCategory(index)}>
                  <ListItemIcon>
                    {index % 2 === 0 ? <CheckroomIcon /> : <AutoAwesomeIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            </Link>):(<Link href={`/shop/product-list/${index}`} underline="none">
              <ListItem disablePadding>
                <ListItemButton onClick={() => chooseCategory(index)}>
                  <ListItemIcon>
                    {index % 2 === 0 ? <CheckroomIcon /> : <AutoAwesomeIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            </Link>)}
            
          </List>
        ))}
      </Drawer>
    </Box>
  );
};

export default SideBar;
