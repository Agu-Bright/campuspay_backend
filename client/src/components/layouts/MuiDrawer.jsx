import React from "react";
import {
  Drawer,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Box,
  Avatar,
  Typography,
  ListItemIcon,
  ListItemAvatar,
  Badge,
  Button,
} from "@mui/material";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import HomeIcon from "@mui/icons-material/Home";
import { useSelector } from "react-redux";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import EditIcon from "@mui/icons-material/Edit";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Stack } from "@mui/system";

function MuiDrawer({
  open,
  close,
  bookNav,
  cartNav,
  profileNav,
  logOutNav,
  signUpNav,
  signInNav,
  homeNav,
  orderNav,
  adminNav,
  sellerNav,
  adminBookNav,
  newBookNavigate,
  OrderNavigate,
  userNavigate,
  sellerNavigate,
}) {
  const { user, loading } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);

  return (
    <Drawer
      anchor="left"
      open={open}
      onClose={close}
      sx={{
        backgroundColor: "#48e5c2",
        opacity: "0.98 ",
        backdropFilter: "blur(5)",
      }}
    >
      <Box
        p={2}
        width="300px"
        textAlign="center"
        role="presentation"
        sx={{ height: "100vh", padding: "0" }}
      >
        <Box
          sx={{
            height: "9.35vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#48e5c2",
          }}
        >
          <Typography>campusPay</Typography>
        </Box>
        <List sx={{ overflow: "scroll" }}>
          <ListItem disablePadding>
            <ListItemButton onClick={homeNav}>
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
          <Divider />
          <ListItem disablePadding>
            <ListItemButton onClick={bookNav}>
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
                <ListItemButton onClick={cartNav}>
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

              <ListItem disablePadding>
                <ListItemButton onClick={orderNav}>
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
                <>
                  <ListItem disablePadding>
                    <ListItemButton onClick={sellerNav}>
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
                  <Divider />
                  <ListItem disablePadding>
                    <Accordion>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                        color="secondary"
                      >
                        <Button color="secondary" startIcon={<MenuBookIcon />}>
                          <b>Seller actions</b>
                        </Button>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Stack
                          spacing={2}
                          direction="column"
                          sx={{ alignItems: "start" }}
                        >
                          <Button
                            color="secondary"
                            variant="outlined"
                            sx={{ "&:focus": { outline: "none" } }}
                            onClick={adminBookNav}
                          >
                            All Books
                          </Button>
                          <Button
                            color="secondary"
                            variant="outlined"
                            sx={{ "&:focus": { outline: "none" } }}
                            onClick={newBookNavigate}
                          >
                            Create Book
                          </Button>
                          <Button
                            color="secondary"
                            variant="outlined"
                            sx={{ "&:focus": { outline: "none" } }}
                            onClick={OrderNavigate}
                          >
                            Orders
                          </Button>
                        </Stack>
                      </AccordionDetails>
                    </Accordion>
                  </ListItem>
                </>
              )}
              {user?.role === "admin" && (
                <>
                  <ListItem disablePadding>
                    <ListItemButton onClick={adminNav}>
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
                  <Divider />
                  <ListItem disablePadding>
                    <Accordion>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                        color="secondary"
                      >
                        <ListItemButton>
                          <ListItemIcon>
                            <ListItemAvatar>
                              <Avatar sx={{ backgroundColor: "white" }}>
                                <EditIcon color="warning" />
                              </Avatar>{" "}
                            </ListItemAvatar>
                          </ListItemIcon>
                          <ListItemText primary="Admin Actions" />
                        </ListItemButton>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Stack
                          spacing={2}
                          direction="column"
                          sx={{ alignItems: "start" }}
                        >
                          <Button
                            color="secondary"
                            variant="outlined"
                            sx={{ "&:focus": { outline: "none" } }}
                            onClick={adminBookNav}
                          >
                            All Books
                          </Button>
                          <Button
                            color="secondary"
                            variant="outlined"
                            sx={{ "&:focus": { outline: "none" } }}
                            onClick={newBookNavigate}
                          >
                            Create Book
                          </Button>
                          <Button
                            color="secondary"
                            variant="outlined"
                            sx={{ "&:focus": { outline: "none" } }}
                            onClick={OrderNavigate}
                          >
                            Orders
                          </Button>
                          <Button
                            color="secondary"
                            variant="outlined"
                            sx={{ "&:focus": { outline: "none" } }}
                            onClick={userNavigate}
                          >
                            Users
                          </Button>
                          <Button
                            color="secondary"
                            variant="outlined"
                            sx={{ "&:focus": { outline: "none" } }}
                            onClick={sellerNavigate}
                          >
                            Sellers
                          </Button>
                        </Stack>
                      </AccordionDetails>
                    </Accordion>
                  </ListItem>
                </>
              )}
              <Divider />
              <ListItem disablePadding>
                <ListItemButton onClick={profileNav}>
                  <ListItemIcon>
                    <ListItemAvatar>
                      <Avatar alt={user.name} src={user.avatar.url} />
                    </ListItemAvatar>
                  </ListItemIcon>
                  <ListItemText primary={user.name} secondary="view Profile" />
                </ListItemButton>
              </ListItem>
              <Divider />
              <ListItem disablePadding>
                <ListItemButton onClick={logOutNav}>
                  <Typography color="warning">logout</Typography>
                </ListItemButton>
              </ListItem>
            </>
          ) : (
            <>
              <ListItem disablePadding>
                <ListItemButton onClick={signUpNav}>
                  <ListItemIcon>
                    <ListItemAvatar></ListItemAvatar>
                  </ListItemIcon>
                  <ListItemText primary="Sign Up" />
                </ListItemButton>
              </ListItem>
              <Divider />
              <ListItem disablePadding>
                <ListItemButton onClick={signInNav}>
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
      </Box>
    </Drawer>
  );
}

export default MuiDrawer;
