import { Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
function CheckOutSteps({ shipping, confirmOrder, payment }) {
  return (
    <div className="checkout-progress d-flex justify-content-center">
      {shipping ? (
        <Link to="/shipping" className="float-right">
          <div className="triangle2-active"></div>
          <div className="step active-step">
            <Typography sx={{ fontSize: { xs: "10px", md: "30px" } }}>
              shipping
            </Typography>
          </div>
          <div className="triangle-active"></div>
        </Link>
      ) : (
        <Link to="#!" disabled>
          <div className="triangle2-incomplete"></div>
          <div className="step incomplete">
            {/* <h6 style={{ fontSize: "10px" }}>shipping</h6> */}
            <Typography sx={{ fontSize: { xs: "15px", md: "30px" } }}>
              shipping
            </Typography>
          </div>
          <div className="triangle-incomplete"></div>
        </Link>
      )}
      {confirmOrder ? (
        <Link to="/order/confirm" className="float-right">
          <div className="triangle2-active"></div>
          <div className="step active-step">
            <Typography sx={{ fontSize: { xs: "15px", md: "20px" } }}>
              Confirm
            </Typography>
          </div>
          <div className="triangle-active"></div>
        </Link>
      ) : (
        <Link to="#!" disabled>
          <div className="triangle2-incomplete"></div>
          <div className="step incomplete">
            <Typography sx={{ fontSize: { xs: "10px", md: "30px" } }}>
              confirm
            </Typography>
          </div>
          <div className="triangle-incomplete"></div>
        </Link>
      )}
      {payment ? (
        <Link to="/shipping" className="float-right">
          <div className="triangle2-active"></div>
          <div className="step active-step">
            <Typography sx={{ fontSize: { xs: "15px", md: "20px" } }}>
              Confirm
            </Typography>
          </div>
          <div className="triangle-active"></div>
        </Link>
      ) : (
        <Link to="#!" disabled>
          <div className="triangle2-incomplete"></div>
          <div className="step incomplete">
            <Typography sx={{ fontSize: { xs: "15px", md: "30px" } }}>
              Payment
            </Typography>
          </div>
          <div className="triangle-incomplete"></div>
        </Link>
      )}
    </div>
  );
}

export default CheckOutSteps;
