import React, { useEffect, useState } from "react";
import { CircularProgress, Typography, Box } from "@mui/material";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getOrderDetails, clearErrors } from "../../redux/actions/orderAction";
import { Container } from "@mui/system";
function OrderDetails() {
  const [errorMessage, setErrorMessage] = useState();
  const diapatch = useDispatch();
  const { loading, error, order } = useSelector((state) => state.orderDetails);
  const { id } = useParams();
  console.log(id);
  useEffect(() => {
    diapatch(getOrderDetails(id));
    if (error) {
      setErrorMessage(error);
      diapatch(clearErrors());
    }
  }, [diapatch, error, id]);
  return (
    <div className="container container-fluid">
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
        </Container>
      ) : (
        <div className="row d-flex justify-content-between">
          {order && (
            <div className="col-12 col-lg-8 mt-5 order-details">
              <Typography className="my-5">Order # {order._id}</Typography>

              <h2
                style={{
                  width: "auto",
                  paddingLeft: "6px",

                  borderLeft: "10px solid #48e5c2",
                  borderBottom: "0.1px solid #48e5c2",
                  borderRadius: "10px",
                  borderBottomRightRadius: "0px",
                }}
              >
                Shipping info
              </h2>
              <Typography>
                <b>Name:</b> {order.user.name}
              </Typography>
              <Typography>
                <b>Phone:</b> {order.shippingInfo.phoneNumber}
              </Typography>
              <Typography className="mb-4">
                <b>Address:</b>
                {order.shippingInfo.address}
              </Typography>
              <Typography>
                <b>Amount:</b>
                <span style={{ color: "green" }}>&#8358;</span>
                {order.itemsPrice}
              </Typography>

              <hr />

              <h2
                style={{
                  width: "auto",
                  paddingLeft: "6px",

                  borderLeft: "10px solid #48e5c2",
                  borderBottom: "0.1px solid #48e5c2",
                  borderRadius: "10px",
                  borderBottomRightRadius: "0px",
                }}
              >
                Payment
              </h2>
              <p className="greenColor">
                <b>{order.paymentInfo.status}</b>
              </p>

              <h2
                style={{
                  width: "auto",
                  paddingLeft: "6px",

                  borderLeft: "10px solid #48e5c2",
                  borderBottom: "0.1px solid #48e5c2",
                  borderRadius: "10px",
                  borderBottomRightRadius: "0px",
                }}
              >
                Order Status
              </h2>
              <p className="greenColor">
                <b>{order.orderStatus}</b>
              </p>

              <h2
                style={{
                  width: "auto",
                  paddingLeft: "6px",

                  borderLeft: "10px solid #48e5c2",
                  borderBottom: "0.1px solid #48e5c2",
                  borderRadius: "10px",
                  borderBottomRightRadius: "0px",
                }}
              >
                Order Items
              </h2>

              <hr />
              <div className="cart-item my-1">
                {order.orderItems.map((item) => (
                  <div className="row my-5" key={item.book}>
                    <div className="col-4 col-lg-2">
                      <img
                        src={item.image}
                        alt={item.name}
                        height="45"
                        width="65"
                      />
                    </div>

                    <div className="col-5 col-lg-5">
                      <Link to={`/book/${item.book}`}>{item.name}</Link>
                    </div>

                    <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                      <p>
                        {" "}
                        <span style={{ color: "green" }}>&#8358;</span>
                        {item.price}
                      </p>
                    </div>

                    <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                      <p> {item.quantity} Piece(s)</p>
                    </div>
                  </div>
                ))}
              </div>
              <hr />
            </div>
          )}

          {error && <Box sx={{ merginTop: "20vh" }}>{errorMessage}</Box>}
        </div>
      )}
    </div>
  );
}

export default OrderDetails;
