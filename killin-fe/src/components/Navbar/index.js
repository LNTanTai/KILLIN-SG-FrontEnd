import {
  AppBar,
  Avatar,
  Box,
  Button,
  IconButton,
  InputBase,
  Link,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
  alpha,
  styled,
} from "@mui/material";
import React, { useState } from "react";
import StorefrontIcon from "@mui/icons-material/Storefront";
import SearchIcon from "@mui/icons-material/Search";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { useLocation, useNavigate } from "react-router-dom";
import {
  CART_PATH,
  HOMEPAGE_PATH,
  LOGIN_PATH,
  SHOP_PATH,
  USER_PATH,
} from "../../services/constants/pathConstants";
import { LoadingBackdrop } from "../../services/constants/componentConstants";
import jwtDecode from "jwt-decode";
import ProductList from "../../pages/ShopPage/components/ProductList";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

// const settings = ["Profile", "Account", "Dashboard", "Logout"];

const Navbar = () => {
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [openBackdrop, setOpenBackdrop] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const navigate = useNavigate();
  const loginInfo = JSON.parse(localStorage.getItem("loginInfo"));
  const location = useLocation();
  let token;
  if (loginInfo !== null) {
    token = jwtDecode(loginInfo);
  }

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = async () => {
    setOpenBackdrop(true);
    localStorage.clear();
    setOpenBackdrop(false);
    navigate(HOMEPAGE_PATH);
  };

  const searchItems = (searchValue) => {
    setSearchInput(searchValue);
    // console.log(searchValue);
    navigate('/user/shop', { state: {search : searchValue} });
  }

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar
          position="fixed"
          sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
        >
          <Toolbar>
            <Link href={HOMEPAGE_PATH}>
              <StorefrontIcon
                sx={{
                  color: "white",
                  display: { xs: "none", md: "flex" },
                  mr: 1,
                }}
              />
            </Link>
            <Link href={HOMEPAGE_PATH} underline="none">
              <Typography sx={{ color: "white" }} variant="h6" component="div">
                KILLIN SG
              </Typography>
            </Link>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
                onChange = {(e) => searchItems(e.target.value)}
              />
            </Search>
            {/* <Box sx={{ flexGrow: 1, textAlign: "right", pr: 5 }}>
              
            </Box>
            <Box sx={{ flexGrow: 1, textAlign: "left", pl:5 }}>
              
            </Box> */}
            <Box sx={{ flexGrow: 1 }} />
            <Link href={HOMEPAGE_PATH} underline="none">
              <Typography
                sx={{ color: "white", pr: 2 }}
                variant="h6"
                component="div"
              >
                Home
              </Typography>
            </Link>
            {loginInfo !== null && token.role === "3" ? (
              <Link
              href={`/user/${SHOP_PATH}`} underline="none"
              >
                <Typography
                  sx={{ color: "white", pr: 2 }}
                  variant="h6"
                  component="div"
                >
                  Shop
                </Typography>
              </Link>
            ) : (
              <Link href={`/${SHOP_PATH}`} underline="none">
                <Typography
                  sx={{ color: "white", pr: 2 }}
                  variant="h6"
                  component="div"
                >
                  Shop
                </Typography>
              </Link>
            )}

            {loginInfo !== null && token.role === "3" ? (
              <IconButton
                sx={{ flexGrow: 0, color: "white", mr: 1 }}
                aria-label="add to shopping cart"
                href={`/user/${CART_PATH}`}
              >
                <AddShoppingCartIcon />
              </IconButton>
            ) : (
              <></>
            )}
            {loginInfo !== null ? (
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt="Remy Sharp" />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  <MenuItem onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">Profile</Typography>
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>
                    <Typography textAlign="center">Logout</Typography>
                  </MenuItem>
                </Menu>
              </Box>
            ) : location.pathname !== "/login" ? (
              <Box sx={{ flexGrow: 0 }}>
                <Link href={`/${LOGIN_PATH}`} underline="none" >
                  <Typography
                    variant="h6"
                    component="div"
                    sx={{ color: "white" }}
                  >
                    Login
                  </Typography>
                </Link>
              </Box>
            ) : (
              <></>
            )}
          </Toolbar>
        </AppBar>
      </Box>
      <LoadingBackdrop open={openBackdrop} />
    </>
  );
};

export default Navbar;
