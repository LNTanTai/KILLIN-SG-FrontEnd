import {
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import CheckroomIcon from "@mui/icons-material/Checkroom";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import { Link, useParams } from "react-router-dom";
import {
  HOMEPAGE_PATH,
  PRODUCT_LIST,
} from "../../services/constants/pathConstants";

const drawerWidth = 190;
const CategoryArray = ["Tất cả", "Áo", "Áo hoodie", "Áo polo", "Quần", "Nón"];

const SideBar = () => {
  const [chooseCate, setchooseCate] = useState();
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
        <List>
          {CategoryArray.map((text, index) => (
            <Link to={`${HOMEPAGE_PATH}product-list/${index}`}>
              <ListItem key={text} disablePadding>
                <ListItemButton onClick={() => chooseCategory(index)}>
                  <ListItemIcon>
                    {index % 2 === 0 ? <CheckroomIcon /> : <AutoAwesomeIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            </Link>
          ))}
        </List>
      </Drawer>
    </Box>
  );
};

export default SideBar;
