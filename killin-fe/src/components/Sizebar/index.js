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
import React, { useState } from "react";
import CheckroomIcon from "@mui/icons-material/Checkroom";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import {
  HOMEPAGE_PATH,
} from "../../services/constants/pathConstants";
import { Link } from "react-router-dom";
import { axiosUrl } from "../../services/api/axios";
import { GET_CATEGORY_NAME } from "../../services/constants/apiConstants";
import { useEffect } from "react";

const drawerWidth = 190;
// const CategoryArray = ["Tất cả", "Áo", "Áo hoodie", "Áo polo", "Quần", "Nón"];

const SideBar = () => {
  const [chooseCate, setchooseCate] = useState();
  const [categoryArray, setCategoryArray] = useState([]);
  const loginInfo = JSON.parse(localStorage.getItem("loginInfo"));

  const chooseCategory = (ctg) => {
    setchooseCate(ctg);
  };

  useEffect(()=>{
    fetchData();
  }, [])

  const fetchData = async () => {
    const params = {};
    try {
      const response = await axiosUrl.get(GET_CATEGORY_NAME, params);
      const data = [ { id:"", name: "tất cả"}, ...response.data];
      setCategoryArray(data);
    } catch (error) {
      console.error(`Error at fetchData: ${error}`);
    }
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

        {categoryArray.map((text, index) => (
          <List key={index}>
            {loginInfo!==null?(<Link to={`/user/shop/product-list/${index}`}  style={{textDecoration: 'none' }}>
              <ListItem disablePadding>
                <ListItemButton onClick={() => chooseCategory(index)}>
                  <ListItemIcon>
                    {index % 2 === 0 ? <CheckroomIcon /> : <AutoAwesomeIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text.name} />
                </ListItemButton>
              </ListItem>
            </Link>):(<Link to={`/shop/product-list/${index}`} style={{textDecoration: 'none' }}>
              <ListItem disablePadding>
                <ListItemButton onClick={() => chooseCategory(index)}>
                  <ListItemIcon>
                    {index % 2 === 0 ? <CheckroomIcon /> : <AutoAwesomeIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text.name} />
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
