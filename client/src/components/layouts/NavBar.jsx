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
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";

import Badge from "@mui/material/Badge";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Searche from "./Search";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/actions/userActions";
import MuiDrawer from "./MuiDrawer";

const SnackbarAlert = React.forwardRef(function SnackbarAlert(props, ref) {
  return <Alert severity="success" elevation={6} ref={ref} {...props} />;
});

export default function PrimarySearchAppBar() {
  // const {user} =  useSelector(state => state.auth)
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
  const bookNavigate = () => {
    if (Drawer) {
      setDrawer(false);
    }
    navigate("/admin/books");
  };
  const newBookNavigate = () => {
    if (Drawer) {
      setDrawer(false);
    }
    navigate("/admin/newBook");
  };
  const OrderNavigate = () => {
    if (Drawer) {
      setDrawer(false);
    }
    navigate("/admin/orders");
  };
  const userNavigate = () => {
    if (Drawer) {
      setDrawer(false);
    }
    navigate("/admin/users");
  };
  const sellerNavigate = () => {
    if (Drawer) {
      setDrawer(false);
    }
    navigate("/admin/sellers");
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
        {user && !loading ? (
          <>
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
                    <Avatar alt={user.name} src={user?.avatar?.url} />
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
    <>
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
          adminBookNav={() => bookNavigate()}
          newBookNavigate={() => newBookNavigate()}
          OrderNavigate={() => OrderNavigate()}
          userNavigate={() => userNavigate()}
          sellerNavigate={() => sellerNavigate()}
        />
        <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
          <SnackbarAlert>
            <h5>logOut Success</h5>
          </SnackbarAlert>
        </Snackbar>

        <AppBar
          position="fixed"
          sx={{ backgroundColor: "white", padding: "0px" }}
        >
          {user && user.role === "user" && (
            <Typography
              variant="body2"
              sx={{ backgroundColor: "#FFF8F0", paddingLeft: "5px" }}
            >
              Become a{" "}
              <Link to="me/seller" sx={{ color: "white" }}>
                seller
              </Link>
            </Typography>
          )}
          <Toolbar sx={{ padding: "0px" }}>
            <Box width="80px" height="80px">
              <img
                onClick={() => navigate("/")}
                src="/logo.png"
                alt="logo"
                style={{ width: "80px", height: "80px" }}
              />
            </Box>
            <Searche />
            <Stack direction="row">
              <Box
                sx={{
                  flexGrow: 1,
                  display: { xs: "none", md: "flex" },
                  marginLeft: "90px",
                }}
              >
                <Button
                  color="secondary"
                  href="/"
                  sx={{
                    my: 2,
                    marginLeft: "5px",
                    "&:focus": { outline: "none" },
                  }}
                  startIcon={<HomeIcon color="primary" />}
                >
                  Home
                </Button>
                <Button
                  color="secondary"
                  href="/books"
                  sx={{
                    my: 2,
                    marginLeft: "px",
                    "&:focus": { outline: "none" },
                  }}
                  startIcon={<AutoStoriesIcon color="primary" />}
                >
                  Books
                </Button>
                <Button
                  color="secondary"
                  href="/orders/me"
                  sx={{
                    my: 2,
                    marginLeft: "px",
                    "&:focus": { outline: "none" },
                  }}
                  startIcon={<ShoppingCartCheckoutIcon color="primary" />}
                >
                  orders
                </Button>
              </Box>
            </Stack>

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

              {user && !loading && (
                <>
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
                    <Avatar alt={user.name} src={user?.avatar?.url} />
                  </IconButton>

                  <Typography sx={{ margin: "4px" }} variant="body1">
                    Welcome!! {user?.name?.split(" ")[0]}
                  </Typography>
                </>
              )}

              {!user && (
                <>
                  <Button
                    sx={{ marginLeft: "10px" }}
                    href="/sign-up"
                    variant="outlined"
                  >
                    sign up
                  </Button>
                  <Button
                    sx={{ marginLeft: "10px" }}
                    href="/sign-in"
                    variant="outlined"
                  >
                    sign in
                  </Button>
                </>
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
                marginRight: "0px",
              }}
            >
              <MenuIcon color="primary" />
            </IconButton>
          </Toolbar>
        </AppBar>
        {renderMenu}
      </Box>
    </>
  );
}
