import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Box, CircularProgress, Typography } from "@mui/material";
import Sidebar from "./Sidebar";
import { useSelector, useDispatch } from "react-redux";
import { adminGetBooks } from "../../redux/actions/booksAction";
import { allOrders } from "../../redux/actions/orderAction";
import { allUsers } from "../../redux/actions/userActions";

function Dashboard() {
  const { books } = useSelector((state) => state.books);
  const { user } = useSelector((state) => state.auth);
  const { users } = useSelector((state) => state.allUsers);

  const { orders, totalAmount, loading } = useSelector(
    (state) => state.allOrders
  );

  const dispatch = useDispatch();
  let outOfStock = 0;
  books.forEach((book) => {
    if (book.stock === 0) outOfStock += 1;
  });
  useEffect(() => {
    dispatch(adminGetBooks());
    dispatch(allOrders());
    dispatch(allUsers());
  }, [dispatch]);
  return (
    <>
      <div className="row">
        <div className="col-12 col-md-2" style={{ marginTop: "15px" }}>
          <Sidebar />
        </div>
        <div className="col-12 col-md-10" style={{ marginTop: "10vh" }}>
          <Typography className="my-4" variant="h5">
            {user && `${user.role} Dashboard`}
          </Typography>
          <Box className="row pr-4">
            <Box className="col-xl-12 col-sm-12 mb-3">
              <Box
                className="card text-white bg-primary o-hidden h-100"
                sx={{ boxShadow: "20px", borderRadius: "20px" }}
              >
                <Box
                  className="card-body"
                  sx={{ boxShadow: "20px", borderRadius: "20px" }}
                >
                  {loading ? (
                    <Box className="text-center card-font-size">
                      <CircularProgress color="warning" />
                    </Box>
                  ) : (
                    <Box className="text-center card-font-size">
                      <Typography sx={{ color: "gray" }}>
                        Total Amount
                      </Typography>
                      <br />{" "}
                      <span style={{ color: "green" }}>
                        <Typography variant="h4">
                          &#8358;{totalAmount}
                        </Typography>
                      </span>
                    </Box>
                  )}
                </Box>
              </Box>
            </Box>
          </Box>

          <div className="row pr-4">
            <Box
              className="col-xl-3 col-sm-6 mb-3"
              sx={{ boxShadow: "20px", borderRadius: "20px" }}
            >
              <Box
                className="card text-white bg-success o-hidden h-100"
                sx={{ boxShadow: "20px", borderRadius: "20px" }}
              >
                <div className="card-body">
                  <div className="text-center card-font-size">
                    Books
                    <br />
                    {books && <b>{books.length}</b>}
                  </div>
                </div>
                <Link
                  className="card-footer text-white clearfix small z-1"
                  to="/admin/products"
                >
                  <span className="float-left">View Details</span>
                  <span className="float-right">
                    <i className="fa fa-angle-right"></i>
                  </span>
                </Link>
              </Box>
            </Box>

            <Box
              className="col-xl-3 col-sm-6 mb-3"
              sx={{ boxShadow: "20px", borderRadius: "20px" }}
            >
              <Box
                className="card text-white bg-danger o-hidden h-100"
                sx={{ boxShadow: "20px", borderRadius: "20px" }}
              >
                <div className="card-body">
                  <div className="text-center card-font-size">
                    Orders
                    <br /> <b>{orders && orders.length}</b>
                  </div>
                </div>
                <Link
                  className="card-footer text-white clearfix small z-1"
                  to="/admin/orders"
                >
                  <span className="float-left">View Details</span>
                  <span className="float-right">
                    <i className="fa fa-angle-right"></i>
                  </span>
                </Link>
              </Box>
            </Box>

            {user && user.role === "admin" && (
              <Box
                className="col-xl-3 col-sm-6 mb-3"
                sx={{ boxShadow: "20px", borderRadius: "20px" }}
              >
                <Box
                  className="card text-white bg-info o-hidden h-100"
                  sx={{ boxShadow: "20px", borderRadius: "20px" }}
                >
                  <div className="card-body">
                    <div className="text-center card-font-size">
                      Users
                      <br /> <b>{users && users.length}</b>
                    </div>
                  </div>
                  <a
                    className="card-footer text-white clearfix small z-1"
                    href="/admin/users"
                  >
                    <span className="float-left">View Details</span>
                    <span className="float-right">
                      <i className="fa fa-angle-right"></i>
                    </span>
                  </a>
                </Box>
              </Box>
            )}

            <Box
              className="col-xl-3 col-sm-6 mb-3"
              sx={{ boxShadow: "20px", borderRadius: "20px" }}
            >
              <Box
                className="card text-white bg-warning o-hidden h-100"
                sx={{ boxShadow: "20px", borderRadius: "20px" }}
              >
                <div className="card-body">
                  <div className="text-center card-font-size">
                    Out of Stock
                    <br /> <b>{outOfStock}</b>
                  </div>
                </div>
              </Box>
            </Box>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
