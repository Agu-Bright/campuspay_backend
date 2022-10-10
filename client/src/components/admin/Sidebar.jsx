import React from "react";
import { Link, useNavigate } from "react-router-dom";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import { Button } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
// import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Stack } from "@mui/system";

const Sidebar = () => {
  const navigate = useNavigate();

  return (
    <div className="sidebar-wrapper" style={{ marginTop: "7vh" }}>
      <nav id="sidebar">
        <ul className="list-unstyled components">
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

          <li>
            <Link to="/admin/users">
              <i className="fa fa-users"></i> Users
            </Link>
          </li>
          <li>
            <Link to="/admin/review">
              <i className="fa fa-star"></i> Users
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
