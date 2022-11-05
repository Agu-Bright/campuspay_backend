import React from "react";
import { Container } from "@mui/material";
import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import Books from "./book/books";
import Slider from "./layouts/slider";
function Home() {
  const booksData = useSelector((state) => state.newBooks);
  return (
    <div style={{ marginTop: "80px" }}>
      <Slider />
      <div className="container-fluid pt-5">
        <div className="row px-xl-5 pb-3">
          <div className="col-lg-3 col-md-6 col-sm-12 pb-1">
            <Box
              className="d-flex align-items-center  mb-4"
              sx={{
                padding: "30px",
                // border: "0.2px solid #48e5c2",
                backgroundColor: "rgb(224, 250, 250)",
                boxShadow: 1,
                borderRadius: "5px",
              }}
            >
              <h1 className="fa fa-check text-primary m-0 mr-3"></h1>
              <h5 className="font-weight-semi-bold m-0">Quality Books</h5>
            </Box>
          </div>
          <div className="col-lg-3 col-md-6 col-sm-12 pb-1">
            <Box
              className="d-flex align-items-center mb-4"
              sx={{
                padding: "30px",
                // border: "0.2px solid #48e5c2",
                backgroundColor: "rgb(224, 250, 250)",
                boxShadow: 1,
                borderRadius: "5px",
              }}
            >
              <h1 className="fa fa-shipping-fast text-primary m-0 mr-2"></h1>
              <h5 className="font-weight-semi-bold m-0">Free Delivery</h5>
            </Box>
          </div>
          <div className="col-lg-3 col-md-6 col-sm-12 pb-1">
            <Box
              className="d-flex align-items-center  mb-4"
              sx={{
                padding: "30px",
                backgroundColor: "rgb(224, 250, 250)",
                boxShadow: 1,
                borderRadius: "5px",
              }}
            >
              <h1 className="fas fa-exchange-alt text-primary m-0 mr-3"></h1>
              <h5 className="font-weight-semi-bold m-0">14-Day Return</h5>
            </Box>
          </div>
          <div className="col-lg-3 col-md-6 col-sm-12 pb-1">
            <Box
              className="d-flex align-items-center  mb-4"
              sx={{
                padding: "30px",
                // border: "0.2px solid #48e5c2",
                backgroundColor: "rgb(224, 250, 250)",
                boxShadow: 1,
                borderRadius: "5px",
              }}
            >
              <h1 className="fa fa-phone-volume text-primary m-0 mr-3"></h1>
              <h5 className="font-weight-semi-bold m-0">24/7 Support</h5>
            </Box>
          </div>
        </div>
      </div>

      <Books {...booksData} />

      {/* <SpeedDialIcon sx={{ position: "absolute", bottom: 16, right: 16 }} /> */}
    </div>
  );
}

export default Home;
