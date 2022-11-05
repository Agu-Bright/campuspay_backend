import { Box, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import React from "react";

const Footer = () => {
  return (
    <div
      className="container-fluid bg-dark text-secondary mt-5 pt-5"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        border: "1px solid black",
      }}
    >
      <Stack
        spacing={3}
        direction={{ xs: "column", md: "row", xl: "row" }}
        sx={{
          width: "90vw",
          display: "flex",
          alignItems: "start",
          justifyContent: { xs: "start", md: "space-between" },

          paddingBottom: "20px",
        }}
      >
        <Box sx={{ padding: "10px" }}>
          <Typography variant="h5" sx={{ color: "white" }}>
            Get In Touch
          </Typography>
          <Typography>
            This is part of the easylife project let's make your campus life
            profitable
          </Typography>
          <p className="mb-2">
            <i className="fa fa-map-marker-alt text-primary mr-3"></i>123
            Street, New York, USA
          </p>
          <p className="mb-2">
            <i className="fa fa-envelope text-primary mr-3"></i>
            campuspay@gmail.com
          </p>
          <p className="mb-0">
            <i className="fa fa-phone-alt text-primary mr-3"></i>+012 345 67890
          </p>
        </Box>
        <Box sx={{ padding: "10px" }}>
          <h5 className="text-secondary text-uppercase mb-4">Quick Shop</h5>
          <div className="d-flex flex-column justify-content-start">
            <a className="text-secondary mb-2" href="/">
              <i
                className="fa fa-angle-right mr-2"
                style={{ color: "#48e5c2" }}
              ></i>
              Home
            </a>
            <a className="text-secondary mb-2" href="/books">
              <i
                className="fa fa-angle-right mr-2"
                style={{ color: "#48e5c2" }}
              ></i>
              Our Shop
            </a>

            <a className="text-secondary mb-2" href="/cart">
              <i
                className="fa fa-angle-right mr-2"
                style={{ color: "#48e5c2" }}
              ></i>
              Shopping Cart
            </a>
            <a className="text-secondary mb-2" href="/shipping">
              <i
                className="fa fa-angle-right mr-2"
                style={{ color: "#48e5c2" }}
              ></i>
              Checkout
            </a>
          </div>
        </Box>
        <Box sx={{ padding: "10px" }}>
          <h6 className="text-secondary text-uppercase mt-4 mb-3">Follow Us</h6>
          <div className="d-flex">
            <a className="btn btn-primary btn-square mr-2" href="/">
              <i className="fab fa-twitter"></i>
            </a>
            <a className="btn btn-primary btn-square mr-2" href="/">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a className="btn btn-primary btn-square mr-2" href="/">
              <i className="fab fa-linkedin-in"></i>
            </a>
            <a className="btn btn-primary btn-square" href="/">
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </Box>
      </Stack>
    </div>
  );
};

export default Footer;
