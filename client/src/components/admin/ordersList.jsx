import React, { useEffect, useState } from "react";
import {
  CircularProgress,
  IconButton,
  Typography,
  Box,
  Modal,
  // Alert,
  Stack,
  // Snackbar,
  Button,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  allOrders,
  clearErrors,
  deleteOrder,
} from "../../redux/actions/orderAction";
import { Container } from "@mui/system";
import { MDBDataTable } from "mdbreact";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import DeleteIcon from "@mui/icons-material/Delete";
import Sidebar from "./Sidebar";

// import { DELETE_BOOKS_RESET } from "../../redux/constants/bookConstants";

// const SnackbarAlert = forwardRef(function SnackbarAlert(props, ref) {
//   return <Alert severity="success" elevation={6} ref={ref} {...props} />;
// });

function OrdersList() {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid green",
    borderRadius: "10px",
    boxShadow: 24,
    p: 4,
  };
  const { isDeleted, reset } = useSelector((state) => state.deleteOrder);
  const { user } = useSelector((state) => state.auth);
  const [openM, setOpenM] = useState(false);
  const handleOpenM = () => setOpenM(true);
  const handleCloseM = () => setOpenM(false);

  const [orderId, setOrderId] = useState();

  // const [open, setOpen] = useState(false);
  // const [errorMessage, setErrorMessage] = useState();
  const dispatch = useDispatch();
  const { loading, error, orders } = useSelector((state) => state.allOrders);
  // const { deleting, isDeleted } = useSelector((state) => state.deleteBook);

  useEffect(() => {
    dispatch(allOrders());

    if (error) {
      console.log(error);
      dispatch(clearErrors());
    }
    if (isDeleted) {
      console.log("deleted");
    }
  }, [dispatch, error, reset, isDeleted]);

  // const handleClose = (e, reason) => {
  //   if (reason === "clickaway") {
  //     return;
  //   }
  //   setOpen(false);
  // };
  const handleDelete = (id) => {
    dispatch(deleteOrder(id));
  };
  const setOrders = () => {
    const data = {
      columns: [
        {
          label: "Order ID",
          field: "id",
          sort: "asc",
        },
        {
          label: "No of Items",
          field: "numOfItems",
          sort: "asc",
        },
        {
          label: "Amount",
          field: "amount",
          sort: "asc",
        },
        {
          label: "Status",
          field: "status",
          sort: "asc",
        },
        {
          label: "Actions",
          field: "actions",
        },
      ],
      rows: [],
    };

    orders &&
      orders.forEach((order) => {
        data.rows.push({
          id: order._id,
          numOfItems: order.orderItems.length,
          amount: (
            <span style={{ color: "green" }}>&#8358;{order.itemsPrice}</span>
          ),
          status:
            order.orderStatus &&
            String(order.orderStatus).includes("Delivered") ? (
              <p style={{ color: "green" }}>{order.orderStatus}</p>
            ) : (
              <p style={{ color: "red" }}>{order.orderStatus}</p>
            ),
          actions: (
            <>
              <Link to={`/admin/order/${order._id}`}>
                <IconButton sx={{ "&:focus": { outline: "none" } }}>
                  <AcUnitIcon color="primary" />
                </IconButton>
              </Link>
              {user && user.role === "admin" && (
                <IconButton
                  color="error"
                  sx={{ "&:focus": { outline: "none" } }}
                  onClick={() => {
                    setOrderId(order._id);
                    handleOpenM();
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              )}
            </>
          ),
        });
      });
    return data;
  };
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
              <>
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
                  All Orders
                </h2>
                <MDBDataTable
                  data={setOrders()}
                  className="px-3"
                  bordered
                  striped
                  hover
                />

                {/* <Snackbar
                  open={isDeleted}
                  autoHideDuration={4000}
                  onClose={handleClose}
                >
                  <SnackbarAlert>
                    <Typography>Deleted</Typography>
                  </SnackbarAlert>
                </Snackbar> */}
                <Modal
                  open={openM}
                  onClose={handleCloseM}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box sx={style}>
                    <Typography
                      id="modal-modal-title"
                      variant="h6"
                      component="h2"
                    >
                      Delete Order
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                      Are you sure you wan't to delete this order?
                    </Typography>
                    <Stack>
                      <Button
                        sx={{ "&:focus": { outline: "none" } }}
                        onClick={() => setOpenM(false)}
                      >
                        cancel
                      </Button>
                      <Button
                        sx={{ "&:focus": { outline: "none" } }}
                        onClick={() => {
                          handleDelete(orderId);
                          setOpenM(false);
                        }}
                      >
                        Yes
                      </Button>
                    </Stack>
                  </Box>
                </Modal>
              </>
            )}
          </>
        </div>
      </div>
    </>
  );
}

export default OrdersList;
