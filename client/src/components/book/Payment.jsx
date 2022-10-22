import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { CircularProgress, Typography } from "@mui/material";
// import CheckOutSteps from "./checkOutSteps";
// import { Snackbar } from "@mui/material";
import { Container } from "@mui/system";
import axios from "axios";
import { placeOrder } from "../../redux/actions/orderAction";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function Payment() {
  const [message, setMessage] = useState("");
  // const [sellers, setSellers] = useState([]);
  const query = useQuery();
  const { user } = useSelector((state) => state.auth);
  // const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.theOrder);
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  // get the reference id
  const id = query.get("trxref");

  // const status = "processing";

  useEffect(() => {
    if (error) {
      setMessage(error);
    }
    //get the remaining order details
    async function verifyPayment() {
      try {
        const { data } = await axios.get(
          `/api/v1/payment/verify?trxref=${id}&reference=${id}`,
          {
            withCredentials: true,
            credentials: "include",
          }
        );

        let sellers = [];

        cartItems.forEach((element) => {
          sellers.push(element.seller);
        });

        const formData = {
          shippingInfo: shippingInfo,
          orderItems: cartItems,
          paymentInfo: {
            id: id,
            status: data.status,
          },
          orderId: id,
          paidAt: data.paidAt,
          itemsPrice: data.metadata.itemPrice,
          taxPrice: Number(data.fees) / 100,
          shippingPrice: data.metadata.shippingPrice,
          totalPrice: Number(data.amount) / 100,
          sellers,
        };
        //now save the data in the database
        dispatch(placeOrder(formData));
        // localStorage.removeItem("cartItems");
        navigate("/orders/me");
      } catch (error) {
        setMessage(error);
      }
    }
    verifyPayment();
  });

  return (
    <>
      {loading ? (
        <Container
          fixed
          sx={{
            height: "60vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CircularProgress />
          <Typography>Creating Order .....</Typography>
        </Container>
      ) : (
        <>
          <div className="container container-fluid">
            <div className="row justify-content-center">
              <div className="col-6 mt-5 text-center">
                <img
                  className="my-5 img-fluid d-block mx-auto"
                  src="https://freepngimg.com/thumb/success/6-2-success-png-image.png"
                  alt="Order Success"
                  width="200"
                  height="200"
                />
                {error && <Typography>{message}</Typography>}
                <h2>Your Order has been placed successfully.</h2>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Payment;
