import React, { useEffect, useState, forwardRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Container } from "@mui/system";
// import { MDBDataTable } from "mdbreact";
// import AcUnitIcon from "@mui/icons-material/AcUnit";
// import DeleteIcon from "@mui/icons-material/Delete";
import Sidebar from "./Sidebar";
import {
  CircularProgress,
  Typography,
  Alert,
  Snackbar,
  Stack,
} from "@mui/material";
import {
  updateOrder,
  getOrderDetails,
  clearErrors,
} from "../../redux/actions/orderAction";
import { LoadingButton } from "@mui/lab";

const SnackbarAlert = forwardRef(function SnackbarAlert(props, ref) {
  return <Alert severity="success" elevation={6} ref={ref} {...props} />;
});

function ProcessOrder() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { id } = useParams();
  const { loading, order } = useSelector((state) => state.orderDetails);

  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState(order ? order.orderStatus : "");

  const { updating, error, isUpdated } = useSelector((state) => state.order);
  // useEffect(() => {

  // }, [dispatch, id]);
  const { user: User } = useSelector((state) => state.auth);
  useEffect(() => {
    dispatch(getOrderDetails(id));

    if (error) {
      console.log(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      setOpen(true);
    }
  }, [error, isUpdated, dispatch, navigate, id]);

  let shippingInfo;
  let orderItems;
  let paymentInfo;
  let user;
  let orderStatus;
  let itemsPrice;

  if (order) {
    shippingInfo = order.shippingInfo;
    orderItems = order.orderItems;
    paymentInfo = order.paymentInfo;
    user = order.user;
    orderStatus = order.orderStatus;
    itemsPrice = order.itemsPrice;
  }

  // const { user: me } = useSelector((state) => state.auth);

  const handleClose = (e, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const updateOrderHandler = (id) => {
    const formData = new FormData();
    formData.set("status", status);

    dispatch(updateOrder(id, formData));
  };
  const shippingDetails =
    shippingInfo &&
    `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.postalCode}, ${shippingInfo.country}, ${shippingInfo.campus}`;

  // const orderStatusHandler = (e) => {
  //   setStatus(e.target.value);
  // };
  return (
    <>
      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>
        <div className="col-12 col-md-10" style={{ marginTop: "15vh" }}>
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
                <CircularProgress color="warning" size="small" />
              </Container>
            ) : (
              <div className="row d-flex justify-content-around">
                <div className="col-12 col-lg-7 order-details">
                  <h1 className="my-5">Order #{order && order._id}</h1>

                  <h4 className="mb-4">Shipping Info</h4>
                  <p>
                    <b>Name:</b> {user && user.name}
                  </p>
                  <p>
                    <b>Phone:</b> {shippingInfo && shippingInfo.phoneNumber}
                  </p>
                  <p className="mb-4">
                    <b>Address:</b>
                    {shippingDetails}
                  </p>
                  <p>
                    <b>Amount:</b> {itemsPrice && itemsPrice}
                  </p>

                  <hr />

                  <h4 className="my-4">Payment</h4>
                  <p className="greenColor">
                    <b>{paymentInfo && paymentInfo.status}</b>
                  </p>

                  <h4 className="my-4">Reference ID</h4>
                  <p className="greenColor">
                    <b>{paymentInfo && paymentInfo.id}</b>
                  </p>

                  <h4 className="my-4">Order Status:</h4>
                  <p className="greenColor">
                    <b>{orderStatus && orderStatus}</b>
                  </p>

                  <h4 className="my-4">Order Items:</h4>

                  <hr />
                  {orderItems &&
                    orderItems.map((item) => (
                      <div key={item.book} className="cart-item my-1">
                        <div className="row my-5">
                          <div className="col-4 col-lg-2">
                            <img
                              src={item.image}
                              alt="Laptop"
                              height="45"
                              width="65"
                            />
                          </div>

                          <div className="col-5 col-lg-5">
                            <a href={`/book/${item.book}`}>{item.name}</a>
                          </div>

                          <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                            <span style={{ color: "green" }}>
                              &#8358;{item.price}
                            </span>
                            {/* <p>${item.price}</p> */}
                          </div>

                          <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                            <p>{`${item.quantity} Piece(s)`}</p>
                            {User._id === item.seller && (
                              <Typography>
                                <Alert icon={false} severity="warning">
                                  Your order{" "}
                                </Alert>
                              </Typography>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}

                  <hr />
                </div>

                <div className="col-12 col-lg-3 mt-5">
                  <h4 className="my-4">Status</h4>

                  <div className="form-group">
                    <select
                      className="form-control"
                      name="status"
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                    >
                      <option value="Processing">Processing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                    </select>
                  </div>

                  <Stack>
                    <LoadingButton
                      id="login_button"
                      type="submit"
                      color="primary"
                      variant="contained"
                      loading={updating ? true : false}
                      sx={{ "&:focus": { outline: "none" } }}
                      onClick={() => updateOrderHandler(order._id)}
                    >
                      UPDATE ORDER
                    </LoadingButton>

                    <Snackbar
                      open={open}
                      autoHideDuration={4000}
                      onClose={handleClose}
                    >
                      <SnackbarAlert>
                        <Typography>updated</Typography>
                      </SnackbarAlert>
                    </Snackbar>
                  </Stack>
                </div>
              </div>
            )}
          </>
        </div>
      </div>
    </>
  );
}

export default ProcessOrder;
