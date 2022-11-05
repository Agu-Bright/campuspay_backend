import React from "react";
import {
  Typography,
  ButtonGroup,
  IconButton,
  Box,
  Avatar,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { LoadingButton } from "@mui/lab";
import { Stack } from "@mui/system";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  addItemToCart,
  removeItemFromcart,
} from "../../redux/actions/cartAction";
import { useNavigate } from "react-router-dom";

function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems } = useSelector((state) => state.cart);

  const increaseQty = (id, quantity, stock) => {
    const newQty = quantity + 1;
    if (newQty >= stock) return;
    dispatch(addItemToCart(id, newQty));
  };
  const decreaseQty = (id, quantity) => {
    const newQty = quantity - 1;
    if (newQty <= 1) return;
    dispatch(addItemToCart(id, newQty));
  };

  const removeCartHandler = (id) => {
    dispatch(removeItemFromcart(id));
  };
  const checkOutHandler = () => {
    navigate("/shipping");
  };
  return (
    <div className="container-fluid" style={{ marginTop: "15vh" }}>
      {cartItems.length === 0 ? (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography>Your Cart is Empty</Typography>
        </Box>
      ) : (
        <div className="row px-xl-5">
          <div className="col-lg-8 table-responsive mb-5">
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
              CART ITEMS -{" "}
              <span style={{ fontSize: "20px", fontWeight: "100" }}>
                {cartItems.length === 1
                  ? `${cartItems.length} item`
                  : `${cartItems.length} items`}
              </span>
            </h3>
            <table className="table table-light table-borderless table-hover text-center mb-0">
              <thead className="thead-dark">
                <tr>
                  <th>Books</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                  <th>Remove</th>
                </tr>
              </thead>

              <tbody className="align-middle">
                {cartItems.map((item) => (
                  <tr key={item.book}>
                    <td className="align-middle">
                      <Link to={`/book/${item.book}`}>
                        <Avatar alt={item.name} src={item.image} />
                      </Link>
                      <Box
                        sx={{
                          display: "flex",
                          color: "black",
                          fontWeight: "400",
                        }}
                      >
                        <Typography>{item.name}</Typography>
                      </Box>
                    </td>
                    <td className="align-middle">
                      <span style={{ color: "green" }}>&#8358;</span>
                      {item.price}
                    </td>
                    <td className="align-middle">
                      <ButtonGroup
                        variant="contained"
                        orientation="horizontal"
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          boxShadow: 0,
                        }}
                      >
                        <IconButton
                          onClick={() => {
                            decreaseQty(item.book, item.quantity);
                          }}
                          color="primary"
                          sx={{ "&:focus": { outline: "none" } }}
                        >
                          <RemoveIcon />
                        </IconButton>
                        <Typography
                          variant="h4"
                          sx={{
                            textAlign: "center",
                            verticalAlign: "center",
                            padding: "4px",
                            border: "0.1px solid gray",
                          }}
                        >
                          {item.quantity}
                        </Typography>
                        <IconButton
                          onClick={() => {
                            increaseQty(item.book, item.quantity, item.stock);
                          }}
                          color="warning"
                          sx={{ "&:focus": { outline: "none" } }}
                        >
                          <AddIcon />
                        </IconButton>
                      </ButtonGroup>
                    </td>
                    <td className="align-middle">
                      <span style={{ color: "green" }}>&#8358;</span>
                      {item.price * item.quantity}
                    </td>
                    <td className="align-middle">
                      <IconButton
                        onClick={() => removeCartHandler(item.book)}
                        color="error"
                        sx={{ "&:focus": { outline: "none" } }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="col-lg-4">
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
              CART SUMMARY
            </h3>
            <div className="bg-light p-30 mb-5">
              <div className="border-bottom pb-2">
                <div className="d-flex justify-content-between mb-3">
                  <h6>Subtotal</h6>
                  <h6>
                    {cartItems.reduce(
                      (acc, item) => acc + Number(item.quantity),
                      0
                    )}{" "}
                    (units)
                  </h6>
                </div>
              </div>
              <div className="pt-2">
                <div className="d-flex justify-content-between mt-2">
                  <h5>Total</h5>
                  <h5>
                    <span style={{ color: "green" }}>&#8358;</span>
                    {cartItems.reduce(
                      (acc, item) => acc + item.quantity * item.price,
                      0
                    )}
                  </h5>
                </div>
                <Stack>
                  <LoadingButton
                    onClick={checkOutHandler}
                    variant="contained"
                    // loading={sending ? true : false}
                    sx={{
                      "&:focus": { outline: "none" },
                    }}
                  >
                    Proceed To Checkout
                  </LoadingButton>
                </Stack>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
