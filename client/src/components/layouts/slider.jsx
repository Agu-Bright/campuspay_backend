import React from "react";
import { Typography } from "@mui/material";
import { Container } from "@mui/system";

function Slider() {
  return (
    <Container
      fixed
      sx={{
        boxShadow: 2,
        backgroundColor: "#48e5c2",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        // border: "1px solid #48e5c2",
        height: "40vh",
        marginTop: { xs: "0", md: "10px" },
      }}
    >
      <Typography variant="h3">Fliers coming soon</Typography>
    </Container>
  );
}

export default Slider;
