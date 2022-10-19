import React, { useState, useEffect } from "react";
import "./style.scss";
import { Button, Typography, Box } from "@mui/material";
import { Container } from "@mui/system";
import { useSelector } from "react-redux";

function Slider() {
  const { user } = useSelector((state) => state.auth);
  return (
    <Box id="home" sx={{ width: "90%", overflow: "hidden" }}>
      {!user && (
        <>
          <Typography variant="h3" sx={{ color: "white" }}>
            WELCOME TO <span class="head">CAMPUSPAY</span>{" "}
          </Typography>

          <p>
            Sign up now to purchase your books and other academic related items
          </p>
          <div className="btn">
            <Button href="/sign-up" size="large" variant="outlined">
              Sign Up
            </Button>
          </div>
        </>
      )}

      {user && user.role === "user" && (
        <>
          <Typography variant="h3" sx={{ color: "white" }}>
            SELL ON <span class="head">CAMPUSPAY</span>{" "}
          </Typography>

          <p>Register you seller accout to start selling on your items</p>
          <div className="btn">
            <Button href="/me/seller" size="large" variant="outlined">
              Become a seller
            </Button>
          </div>
        </>
      )}
      {user && user.role === "seller" && (
        <>
          <Typography variant="h3" sx={{ color: "white" }}>
            CREATE ITEMS TO SELL ON<span class="head"> CAMPUSPAY</span>{" "}
          </Typography>

          <div className="btn">
            <Button href="/admin/newBook" size="large" variant="outlined">
              CREATE AN ITEM
            </Button>
          </div>
        </>
      )}
    </Box>
  );
}

export default Slider;
