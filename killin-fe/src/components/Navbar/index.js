import {
  AppBar,
  Avatar,
  Box,
  FormControlLabel,
  FormGroup,
  IconButton,
  InputBase,
  Menu,
  MenuItem,
  Switch,
  Toolbar,
  Tooltip,
  Typography,
  alpha,
  styled,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import StorefrontIcon from "@mui/icons-material/Storefront";
import SearchIcon from "@mui/icons-material/Search";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  BILL_PATH,
  CART_PATH,
  HOMEPAGE_PATH,
  LOGIN_PATH,
  PROFILE_PATH,
  SHOP_PATH,
} from "../../services/constants/pathConstants";
import { LoadingBackdrop } from "../../services/constants/componentConstants";
import jwtDecode from "jwt-decode";
import CloseIcon from "@mui/icons-material/Close";
import { SimpleSnackbar } from "../../services/utils";

const MaterialUISwitch = styled(Switch)(({ theme }) => ({
  width: 62,
  height: 34,
  padding: 7,
  "& .MuiSwitch-switchBase": {
    margin: 1,
    padding: 0,
    transform: "translateX(6px)",
    "&.Mui-checked": {
      color: "#fff",
      transform: "translateX(22px)",
      "& .MuiSwitch-thumb:before": {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          "#fff"
        )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
      },
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
      },
    },
  },
  "& .MuiSwitch-thumb": {
    backgroundColor: theme.palette.mode === "dark" ? "#003892" : "#001e3c",
    width: 32,
    height: 32,
    "&:before": {
      content: "''",
      position: "absolute",
      width: "100%",
      height: "100%",
      left: 0,
      top: 0,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
        "#fff"
      )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
    },
  },
  "& .MuiSwitch-track": {
    opacity: 1,
    backgroundColor: theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
    borderRadius: 20 / 2,
  },
}));

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

const Navbar = ({ isDarkTheme, changeTheme }) => {
  const [isClose, setIsClose] = useState(false);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [openBackdrop, setOpenBackdrop] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const navigate = useNavigate();
  const loginInfo = JSON.parse(localStorage.getItem("loginInfo"));
  const location = useLocation();
  let token;
  if (loginInfo !== null) {
    token = jwtDecode(loginInfo);
  }
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [messageSnackbar, setMessageSnackbar] = useState("");

  useEffect(() => {
    if (location.pathname === "/user/shop" || location.pathname === "/shop") {
      if (searchInput === "") {
        if (loginInfo === null) {
          navigate("/shop", { state: { search: "" } });
        } else {
          navigate("/user/shop", { state: { search: "" } });
        }
      }
    }
  }, [searchInput]);

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
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
    let path = location.pathname.split("/");
    setOpenBackdrop(false);
    setOpenSnackbar(true);
    setMessageSnackbar("Đăng xuất thành công");
    if (path[1] === "user") {
      let path2 = location.pathname.substring(5);
      return path[2] === "shop" || path[2] === "product-detail"
        ? navigate(path2)
        : navigate(HOMEPAGE_PATH);
    } else {
      navigate(HOMEPAGE_PATH);
    }
  };

  const handleProfile = async () => {
    if (token.role === "3") {
      navigate(`/user/${PROFILE_PATH}`);
    } else if (token.role === "1") {
      navigate(`/owner/${PROFILE_PATH}`);
    } else if (token.role === "2") {
      navigate(`/staff/${PROFILE_PATH}`);
    } else if (token.role === "4") {
      navigate(`/admin/${PROFILE_PATH}`);
    }
  };

  const handleBillHistory = async () => {
    navigate(`/user/${BILL_PATH}`);
  };

  const searchItems = (searchValue) => {
    if (searchValue === "") {
      setIsClose(false);
    } else {
      setIsClose(true);
    }
    setSearchInput(searchValue);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (loginInfo === null) {
      navigate("/shop", { state: { search: searchInput } });
    } else {
      navigate("/user/shop", { state: { search: searchInput } });
    }
  };

  const handleCancel = () => {
    setIsClose(false);
    setSearchInput("");
    if (loginInfo === null) {
      navigate("/shop", { state: { search: "" } });
    } else {
      navigate("/user/shop", { state: { search: "" } });
    }
  };
  const [showPopup, setShowPopup] = useState(false);

  const handleClose = () => {
    setShowPopup(false);
  };

  const handleOpen = () => {
    setShowPopup(true);
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar
          position="fixed"
          sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
        >
          <Toolbar>
            <Link to={HOMEPAGE_PATH} style={{ textDecoration: "none" }}>
              <StorefrontIcon
                sx={{
                  color: "white",
                  display: { xs: "none", md: "flex" },
                  mr: 1,
                }}
              />
            </Link>
            <Link to={HOMEPAGE_PATH} style={{ textDecoration: "none" }}>
              <Typography sx={{ color: "white" }} variant="h6" component="div">
                KILLIN SG
              </Typography>
            </Link>
            {loginInfo !== null ? (
              token.role === "3" ? (
                <Box
                  component="form"
                  onSubmit={handleSubmit}
                  noValidate
                  // sx={{ mt: 1 }}
                >
                  <Search>
                    <SearchIconWrapper>
                      <SearchIcon />
                    </SearchIconWrapper>
                    <StyledInputBase
                      placeholder="Search…"
                      inputProps={{ "aria-label": "search" }}
                      value={searchInput}
                      onChange={(e) => searchItems(e.target.value)}
                    />
                  </Search>
                </Box>
              ) : (
                <></>
              )
            ) : (
              <Box
                component="form"
                onSubmit={handleSubmit}
                noValidate
                // sx={{ mt: 1 }}
              >
                <Search>
                  <SearchIconWrapper>
                    <SearchIcon />
                  </SearchIconWrapper>
                  <StyledInputBase
                    placeholder="Search…"
                    inputProps={{ "aria-label": "search" }}
                    value={searchInput}
                    onChange={(e) => searchItems(e.target.value)}
                  />
                </Search>
              </Box>
            )}
            {isClose === false ? <></> : "Nhấn Enter để tìm kiếm"}
            {isClose === false ? (
              <></>
            ) : (
              <IconButton
                size="large"
                sx={{ color: "white" }}
                onClick={() => {
                  handleCancel();
                }}
              >
                <CloseIcon />
              </IconButton>
            )}

            <Box sx={{ flexGrow: 1 }} />
            <Link to={HOMEPAGE_PATH} style={{ textDecoration: "none" }}>
              <Typography
                sx={{ color: "white", pr: 2 }}
                variant="h6"
                component="div"
              >
                Trang chủ
              </Typography>
            </Link>
            {loginInfo !== null ? (
              token.role === "3" ? (
                <Link
                  to={`/user/${SHOP_PATH}`}
                  style={{ textDecoration: "none" }}
                >
                  <Typography
                    sx={{ color: "white", pr: 2 }}
                    variant="h6"
                    component="div"
                  >
                    Cửa hàng
                  </Typography>
                </Link>
              ) : (
                <></>
              )
            ) : (
              <Link to={`/${SHOP_PATH}`} style={{ textDecoration: "none" }}>
                <Typography
                  sx={{ color: "white", pr: 2 }}
                  variant="h6"
                  component="div"
                >
                  Cửa hàng
                </Typography>
              </Link>
            )}

            {loginInfo !== null && token.role === "3" ? (
              <IconButton
                sx={{ flexGrow: 0, color: "white", mr: 1 }}
                aria-label="add to shopping cart"
                onClick={() => {
                  navigate(`/user/${CART_PATH}`);
                }}
                // href={`/user/${CART_PATH}`}
              >
                <AddShoppingCartIcon />
              </IconButton>
            ) : (
              <></>
            )}
            <FormGroup>
              <FormControlLabel
                control={
                  <MaterialUISwitch
                    sx={{ m: 1 }}
                    checked={isDarkTheme}
                    onChange={changeTheme}
                  />
                }
              />
            </FormGroup>
            {loginInfo !== null ? (
              <Typography
                sx={{ color: "white", pr: 2 }}
                variant="h6"
                component="div"
              >
                Chào mừng {token.fullName}
              </Typography>
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
                  <MenuItem onClick={handleProfile}>
                    <Typography textAlign="center">
                      Thông tin cá nhân
                    </Typography>
                  </MenuItem>
                  {token.role === "3" ? (
                    <MenuItem onClick={handleBillHistory}>
                      <Typography textAlign="center">
                        Lịch sử mua hàng
                      </Typography>
                    </MenuItem>
                  ) : (
                    <></>
                  )}
                  <MenuItem onClick={handleLogout}>
                    <Typography textAlign="center">Đăng xuất</Typography>
                  </MenuItem>
                </Menu>
              </Box>
            ) : (
              <Box sx={{ flexGrow: 0 }}>
                <Link
                  to={`/${LOGIN_PATH}`}
                  state={{ previousUrl: location.pathname }}
                  style={{ textDecoration: "none" }}
                >
                  <Typography
                    variant="h6"
                    component="div"
                    sx={{ color: "white" }}
                  >
                    Đăng nhập
                  </Typography>
                </Link>
              </Box>
            )}
          </Toolbar>
        </AppBar>
      </Box>
      <LoadingBackdrop open={openBackdrop} />
      <SimpleSnackbar messageSnackbar={messageSnackbar} handleCloseSnackbar={handleCloseSnackbar} openSnackbar={openSnackbar} />
    </>
  );
};

export default Navbar;
