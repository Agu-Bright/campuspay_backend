import { Container } from "@mui/material";
import React from "react";
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
            <div
              className="d-flex align-items-center bg-light mb-4"
              style={{
                padding: "30px",
                border: "0.2px solid #48e5c2",
                borderRadius: "5px",
              }}
            >
              <h1 className="fa fa-check text-primary m-0 mr-3"></h1>
              <h5 className="font-weight-semi-bold m-0">Quality Books</h5>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 col-sm-12 pb-1">
            <div
              className="d-flex align-items-center bg-light mb-4"
              style={{
                padding: "30px",
                border: "0.2px solid #48e5c2",
                borderRadius: "5px",
              }}
            >
              <h1 className="fa fa-shipping-fast text-primary m-0 mr-2"></h1>
              <h5 className="font-weight-semi-bold m-0">Free Delivery</h5>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 col-sm-12 pb-1">
            <div
              className="d-flex align-items-center bg-light mb-4"
              style={{
                padding: "30px",
                border: "0.2px solid #48e5c2",
                borderRadius: "5px",
              }}
            >
              <h1 className="fas fa-exchange-alt text-primary m-0 mr-3"></h1>
              <h5 className="font-weight-semi-bold m-0">14-Day Return</h5>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 col-sm-12 pb-1">
            <div
              className="d-flex align-items-center bg-light mb-4"
              style={{
                padding: "30px",
                border: "0.2px solid #48e5c2",
                borderRadius: "5px",
              }}
            >
              <h1 className="fa fa-phone-volume text-primary m-0 mr-3"></h1>
              <h5 className="font-weight-semi-bold m-0">24/7 Support</h5>
            </div>
          </div>
        </div>
      </div>

      <Books {...booksData} />
    </div>
  );
}

export default Home;
