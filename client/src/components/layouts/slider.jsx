import React, { useState, useEffect } from "react";
import "./style.scss";
import { Button, Typography, Box } from "@mui/material";
import { Container } from "@mui/system";

function Slider() {
  const [state, setState] = useState(true);
  return (
    <Box id="home" sx={{ width: "90%", overflow: "hidden" }}>
      {state === true && (
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
      {state === false && (
        <>
          <h2>
            Sell Your items on <span class="head">CAMPUSPAY</span>{" "}
          </h2>

          <p>Create a sellers accout to start posting your items for sell</p>
          <div className="btn">
            <Button>Sell Now</Button>
          </div>
        </>
      )}
    </Box>
  );
}

export default Slider;
