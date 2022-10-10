import * as React from "react";
// import { styled, alpha } from "@mui/material/styles";
import {
  Stack,
  Button,
  Avatar,
  Snackbar,
  Alert,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
  ListItemIcon,
  ListItemAvatar,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";

import { Link, useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
// import InputBase from "@mui/material/InputBase";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";

import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
// import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Searche from "./Search";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/actions/userActions";
import MuiDrawer from "./MuiDrawer";

const SnackbarAlert = React.forwardRef(function SnackbarAlert(props, ref) {
  return <Alert severity="success" elevation={6} ref={ref} {...props} />;
});

export default function PrimarySearchAppBar() {
  const [Drawer, setDrawer] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(null);
  const { cartItems } = useSelector((state) => state.cart);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const navigate = useNavigate();
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const { user, loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const handleClose = (e, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleCartNavigate = () => {
    if (Drawer) {
      setDrawer(false);
    }
    navigate("/cart");
  };
  const handleBookNavigate = () => {
    if (Drawer) {
      setDrawer(false);
    }
    navigate("/books");
  };
  const handleHomeNavigate = () => {
    if (Drawer) {
      setDrawer(false);
    }
    navigate("/");
  };
  const handleProfileNav = () => {
    if (Drawer) {
      setDrawer(false);
    }
    navigate("/me");
  };
  const handleSIgnUp = () => {
    if (Drawer) {
      setDrawer(false);
    }
    navigate("/sign-up");
  };
  const handleSignIn = () => {
    if (Drawer) {
      setDrawer(false);
    }
    navigate("/sign-in");
  };
  const handleOrderNavigate = () => {
    if (Drawer) {
      setDrawer(false);
    }
    navigate("/orders/me");
  };
  const handleAdminNavigate = () => {
    if (Drawer) {
      setDrawer(false);
    }
    navigate("/dashboard");
  };
  const handleSellerNavigate = () => {
    if (Drawer) {
      setDrawer(false);
    }
    navigate("/dashboard");
  };
  const logoutHandler = () => {
    if (Drawer) {
      setDrawer(false);
    }
    dispatch(logout());
    navigate("/");
    setOpen(true);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      sx={{ padding: "0" }}
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <List sx={{ padding: "0" }}>
        <ListItem disablePadding>
          <ListItemButton onClick={handleHomeNavigate}>
            <ListItemIcon>
              <ListItemAvatar>
                <Avatar sx={{ backgroundColor: "white" }}>
                  <HomeIcon color="primary" />
                </Avatar>
              </ListItemAvatar>
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={handleBookNavigate}>
            <ListItemIcon>
              <ListItemAvatar>
                <Avatar sx={{ backgroundColor: "white" }}>
                  <AutoStoriesIcon color="primary" />
                </Avatar>
              </ListItemAvatar>
            </ListItemIcon>
            <ListItemText primary="Books" />
          </ListItemButton>
        </ListItem>
        <Divider />
        {user && !loading ? (
          <>
            <ListItem disablePadding>
              <ListItemButton onClick={handleCartNavigate}>
                <ListItemIcon>
                  <ListItemAvatar>
                    <Badge
                      badgeContent={cartItems ? cartItems.length : "0"}
                      color="warning"
                    >
                      <ShoppingCartIcon color="primary" />
                    </Badge>
                  </ListItemAvatar>
                </ListItemIcon>
                <ListItemText primary="carts" />
              </ListItemButton>
            </ListItem>
            <Divider />

            <ListItem disablePadding>
              <ListItemButton onClick={handleOrderNavigate}>
                <ListItemIcon>
                  <ListItemAvatar>
                    <Avatar sx={{ backgroundColor: "white" }}>
                      <ShoppingCartCheckoutIcon color="primary" />
                    </Avatar>
                  </ListItemAvatar>
                </ListItemIcon>
                <ListItemText primary="Orders" />
              </ListItemButton>
            </ListItem>

            <Divider />
            {user?.role === "seller" && (
              <ListItem disablePadding>
                <ListItemButton onClick={handleSellerNavigate}>
                  <ListItemIcon>
                    <ListItemAvatar>
                      <Avatar sx={{ backgroundColor: "white" }}>
                        <DashboardRoundedIcon color="warning" />
                      </Avatar>
                    </ListItemAvatar>
                  </ListItemIcon>
                  <ListItemText primary="Dashboard" secondary="seller" />
                </ListItemButton>
              </ListItem>
            )}
            {user?.role === "admin" && (
              <ListItem disablePadding>
                <ListItemButton onClick={handleAdminNavigate}>
                  <ListItemIcon>
                    <ListItemAvatar>
                      <Avatar sx={{ backgroundColor: "white" }}>
                        <DashboardRoundedIcon color="warning" />
                      </Avatar>{" "}
                    </ListItemAvatar>
                  </ListItemIcon>
                  <ListItemText primary="Dashboard" secondary="admin" />
                </ListItemButton>
              </ListItem>
            )}
            <Divider />
            <ListItem disablePadding>
              <ListItemButton onClick={handleProfileNav}>
                <ListItemIcon>
                  <ListItemAvatar>
                    <Avatar alt={user.name} src={user.avatar.url} />
                  </ListItemAvatar>
                </ListItemIcon>
                <ListItemText primary={user.name} secondary="view Profile" />
              </ListItemButton>
            </ListItem>
            <Divider />
            <ListItem disablePadding onClick={logoutHandler}>
              <ListItemButton>
                <Typography color="warning">logout</Typography>
              </ListItemButton>
            </ListItem>
          </>
        ) : (
          <>
            <ListItem disablePadding>
              <ListItemButton onClick={handleSIgnUp}>
                <ListItemIcon>
                  <ListItemAvatar></ListItemAvatar>
                </ListItemIcon>
                <ListItemText primary="Sign Up" />
              </ListItemButton>
            </ListItem>
            <Divider />
            <ListItem disablePadding>
              <ListItemButton onClick={handleSignIn}>
                <ListItemIcon>
                  <ListItemAvatar></ListItemAvatar>
                </ListItemIcon>
                <ListItemText primary="Sign In" />
              </ListItemButton>
            </ListItem>
            <Divider />
          </>
        )}
      </List>
    </Menu>
  );

  const handleDrawerClose = () => {
    setDrawer(false);
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <MuiDrawer
        close={handleDrawerClose}
        open={Drawer}
        bookNav={() => {
          handleBookNavigate();
        }}
        cartNav={() => {
          handleCartNavigate();
        }}
        profileNav={() => {
          handleProfileNav();
        }}
        logOutNav={() => {
          logoutHandler();
        }}
        signUpNav={() => {
          handleSIgnUp();
        }}
        orderNav={() => handleOrderNavigate()}
        homeNav={() => handleHomeNavigate()}
        signInNav={() => handleSignIn()}
        adminNav={() => handleAdminNavigate()}
        sellerNav={() => handleSellerNavigate()}
      />
      <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
        <SnackbarAlert>
          <h5>logOut Success</h5>
        </SnackbarAlert>
      </Snackbar>

      <AppBar position="fixed" sx={{ backgroundColor: "white" }}>
        <Toolbar>
          <Box width="80px" height="80px">
            <img
              onClick={() => navigate("/")}
              src="/logo.png"
              alt="logo"
              style={{ width: "80px", height: "80px" }}
            />
          </Box>

          <Searche />
          <Button
            onClick={() => navigate("/books")}
            sx={{ display: { xs: "none", md: "block" } }}
          >
            Books
          </Button>
          <Box sx={{ flexGrow: 1 }} />
          <Box
            sx={{ display: { xs: "none", md: "flex" }, alignItems: "center" }}
          >
            <IconButton
              sx={{ "&:focus": { outline: "none" } }}
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
              onClick={() => {
                navigate("/cart");
              }}
            >
              <Badge
                badgeContent={cartItems ? cartItems.length : "0"}
                color="primary"
              >
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
            <IconButton
              sx={{ "&:focus": { outline: "none" } }}
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              {user && !loading ? (
                <Avatar alt={user.name} src={user.avatar.url} />
              ) : (
                <AccountCircle />
              )}
            </IconButton>
            {user && !loading && (
              <Typography sx={{ margin: "4px" }} variant="body1">
                Welcome!! {user.name.split(" ")[0]}
              </Typography>
            )}
          </Box>

          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={() => setDrawer(true)}
            sx={{
              mr: 2,
              "&:focus": {
                outline: "none",
              },
              display: { xs: "block", md: "none" },
            }}
          >
            <MenuIcon color="primary" />
          </IconButton>
        </Toolbar>
      </AppBar>
      {renderMenu}
    </Box>
  );
}
