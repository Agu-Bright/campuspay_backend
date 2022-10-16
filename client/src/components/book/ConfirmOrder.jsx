import React from "react";
import CheckOutSteps from "./checkOutSteps";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Avatar, Box, Stack } from "@mui/material";
import axios from "axios";
function ConfirmOrder() {
  const navigate = useNavigate();
  const { cartItems, shippingInfo } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);

  //calculate order prices
  const itemsPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const shippingPrice = itemsPrice > 10000 ? 0 : 500;

  const taxPrice = Number((0.05 * itemsPrice).toFixed(2));

  const totalPrice = Math.trunc(
    (itemsPrice + shippingPrice + taxPrice).toFixed(2)
  );
  const processToPayment = async () => {
    const cost = {
      itemsPrice: itemsPrice.toFixed(2),
      shippingInfo,
      taxPrice,
      totalPrice,
      shippingPrice,
    };
    sessionStorage.setItem("orderInfo", JSON.stringify(cost));

    const transactionData = {
      email: user.email,
      amount: totalPrice,
      phone: shippingInfo.phoneNumber,
      itemsPrice: itemsPrice.toFixed(2),
      shippingPrice: shippingPrice,
    };
    try {
      //initializing the transaction
      const { data } = await axios.post(
        "/api/v1/payment/process",
        transactionData,
        {
          withCredentials: true,
          credentials: "include",
        }
      );
      window.location.replace(data.data.authorization_url);
    } catch (error) {
      console.log(error);
      navigate("/payment");
    }
  };
  return (
    <Box sx={{ marginTop: { xs: "10vh", md: "20vh" } }}>
      <Stack>
        <CheckOutSteps confirmOrder />
      </Stack>
      <div className="container container-fluid" style={{}}>
        <div className="row d-flex justify-content-between">
          <div className="col-12 col-lg-8 mt-5 order-confirm">
            <h3
              style={{
                width: "auto",
                paddingLeft: "6px",

                borderLeft: "10px solid #48e5c2",
                borderBottom: "0.1px solid #48e5c2",
                borderRadius: "10px",
                borderBottomRightRadius: "0px",
              }}
            >
              Shipping Info
            </h3>
            <p>
              <b>Name:</b> {user && user.name}
            </p>
            <p>
              <b>Phone:</b> {shippingInfo.phoneNumber}
            </p>
            <p className="mb-4">
              <b>Address:</b>{" "}
              {`${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.campus}, ${shippingInfo.postalCode}, ${shippingInfo.country}`}
            </p>

            <hr />
            <h3
              style={{
                width: "auto",
                paddingLeft: "6px",

                borderLeft: "10px solid #48e5c2",
                borderBottom: "0.1px solid #48e5c2",
                borderRadius: "10px",
                borderBottomRightRadius: "0px",
              }}
            >
              Your Cart items
            </h3>

            {cartItems.map((item) => (
              <Box key={item.book}>
                <hr />
                <div className="cart-item my-1">
                  <div className="row">
                    <div className="col-4 col-lg-2">
                      <Avatar
                        alt={item.name}
                        src={item.image}
                        sx={{ width: 100, height: 100 }}
                      />
                    </div>

                    <div className="col-5 col-lg-6">
                      <Link tp={`/book/${item.book}`}>{item.name}</Link>
                    </div>

                    <div className="col-4 col-lg-4 mt-4 mt-lg-0">
                      <p>
                        {item.quantity} x{" "}
                        <span style={{ color: "green" }}>&#8358;</span>
                        {item.price} ={" "}
                        <b>
                          {" "}
                          <span style={{ color: "green" }}>&#8358;</span>
                          {item.quantity * item.price}
                        </b>
                      </p>
                    </div>
                  </div>
                </div>
                <hr />
              </Box>
            ))}
          </div>

          <div className="col-12 col-lg-3 my-4">
            <div id="order_summary">
              <h4>Order Summary</h4>
              <hr />
              <p>
                Subtotal:{" "}
                <span className="order-summary-values">
                  {" "}
                  <span style={{ color: "green" }}>&#8358;</span>
                  {itemsPrice}
                </span>
              </p>
              <p>
                Shipping:{" "}
                <span className="order-summary-values">
                  {" "}
                  <span style={{ color: "green" }}>&#8358;</span>
                  {shippingPrice}
                </span>
              </p>
              <p>
                Tax:{" "}
                <span className="order-summary-values">
                  {" "}
                  <span style={{ color: "green" }}>&#8358;</span>
                  {taxPrice}
                </span>
              </p>

              <hr />

              <p>
                Total:{" "}
                <span className="order-summary-values">
                  {" "}
                  <span style={{ color: "green" }}>&#8358;</span>
                  {totalPrice}
                </span>
              </p>

              <hr />
              <button
                onClick={processToPayment}
                id="checkout_btn"
                className="btn btn-primary btn-block"
              >
                Proceed to Payment
              </button>
            </div>
          </div>
        </div>
      </div>
    </Box>
  );
}

export default ConfirmOrder;
