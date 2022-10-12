import React from "react";
import { Link, useNavigate } from "react-router-dom";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import { Button, Box, List } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Stack } from "@mui/system";
import { useSelector } from "react-redux";
// import Typography from "@mui/material/Typography";
const Sidebar = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  return (
    <>
      {/* <MenuOpenIcon
        sx={{
          border: "5px solid green",
          marginTop: "20vh",
        }}
      /> */}
      <Box
        className="sidebar-wrapper"
        color="secondary"
        sx={{ marginTop: "12vh", display: { xs: "none", md: "flex" } }}
      >
        <nav id="sidebar" style={{ marginLeft: { xs: "-250px", md: "0" } }}>
          <List
            className="list-unstyled components"
            sx={{ display: { xs: "none", md: "block" } }}
          >
            <li>
              <Link to="/dashboard">
                <i className="fas fa-tachometer-alt"></i> Dashboard
              </Link>
            </li>

            <Accordion sx={{}}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                color="secondary"
              >
                <Button color="secondary" startIcon={<MenuBookIcon />}>
                  <b>Books</b>
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
                    onClick={() => navigate("/admin/books")}
                  >
                    All Books
                  </Button>
                  <Button
                    color="secondary"
                    variant="outlined"
                    sx={{ "&:focus": { outline: "none" } }}
                    onClick={() => navigate("/admin/newBook")}
                  >
                    Create Book
                  </Button>
                </Stack>
              </AccordionDetails>
            </Accordion>

            <li>
              <Link to="/admin/orders">
                <i className="fa fa-shopping-basket"></i> Orders
              </Link>
            </li>

            {user && user.role === "admin" && (
              <li>
                <Link to="/admin/users">
                  <i className="fa fa-users"></i> Users
                </Link>
              </li>
            )}
            <li>
              <Link to="/admin/sellers">
                <i className="fa fa-star"></i> Sellers
              </Link>
            </li>
          </List>
        </nav>
      </Box>
    </>
  );
};

export default Sidebar;
