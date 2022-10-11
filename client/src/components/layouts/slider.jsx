import React, { useState, useEffect } from "react";
import "./style.scss";
import { Button, Typography } from "@mui/material";
import { Container } from "@mui/system";

function Slider() {
  const [state, setState] = useState(true);
  // useEffect(() => {
  //   setInterval(() => {
  //     setState((prev) => !prev);
  //   }, 1000);
  // }, [state]);
  return (
    <section id="home">
      {state === true && (
        <>
          <h2>
            WELCOME TO <span class="head">CAMPUSPAY</span>{" "}
          </h2>

          <p>
            Sign up now to purchase your books and other academic related items
          </p>
          <div className="btn">
            <Button>Sign Up</Button>
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
    </section>
  );
}

export default Slider;
