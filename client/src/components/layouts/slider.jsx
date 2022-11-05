import React, { useState, useEffect } from "react";
import "./style.scss";
import { Button, Typography, Box, Stack } from "@mui/material";
import { Container } from "@mui/system";
import { useSelector } from "react-redux";
import illustration from "../../images/illustration2.png";
function Slider() {
  const { user } = useSelector((state) => state.auth);
  return (
    <div className="slider">
      <div className="theme">
        <Typography>
          welcome to <span className="name">campuspay</span>
        </Typography>
        <Typography className="main">Students suporting students</Typography>
        <Typography
          variant="body1"
          className="body1"
          sx={{ fontSize: "x-small" }}
        >
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias
          explicabo earum obcaecati qui, doloremque facere cumque consequatur
          minima sapiente atque.
        </Typography>
        {!user && (
          <>
            <Button
              size="large"
              variant="contained"
              sx={{ marginRight: "10px", marginTop: "40px" }}
              href="/sign-up"
            >
              Sign up
            </Button>
          </>
        )}
        {user && user.requested === false && (
          <>
            <Button
              size="large"
              variant="contained"
              sx={{ marginRight: "10px", marginTop: "40px" }}
              href="/me/seller"
            >
              Become a seller
            </Button>
          </>
        )}
        {user && user.role === "seller" && (
          <>
            <Button
              size="large"
              variant="contained"
              sx={{ marginRight: "10px", marginTop: "40px" }}
              href="/admin/newBook"
            >
              Create an item
            </Button>
          </>
        )}
        {user && user.role === "admin" && (
          <>
            <Button
              size="large"
              variant="contained"
              sx={{ marginRight: "10px", marginTop: "40px" }}
              href="/dashboard"
            >
              Dashboard
            </Button>
          </>
        )}
      </div>

      <div className="img">
        <img src={illustration} alt="illustration" />
      </div>
    </div>
  );
}

export default Slider;
