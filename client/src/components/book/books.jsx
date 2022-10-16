import {
  CircularProgress,
  Rating,
  Snackbar,
  Alert,
  Stack,
  Button,
  Typography,
  Box,
} from "@mui/material";
import { Container } from "@mui/system";
import React, { useEffect, useState, forwardRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getNewBooks, clearErrors } from "../../redux/actions/booksAction";
import { Link } from "react-router-dom";
import Location from "./Location";

const SnackbarAlert = forwardRef(function SnackbarAlert(props, ref) {
  return <Alert severity="error" elevation={6} ref={ref} {...props} />;
});

function Books({
  loading,
  newBooks,
  error,
  // booksCount,
  // resPerPage,
  // filteredBookCount,
}) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [open, setOpen] = useState(false);
  const [location, setLocation] = useState("");

  useEffect(() => {
    dispatch(getNewBooks());

    if (error) {
      console.log(error);
      dispatch(clearErrors());
    }
    // if (user) {
    //   // setLocation(user.campus);
    //   // console.log(user.campus);
    //   convertToHttp(user.campus);
    // }
  }, [dispatch, error]);

  // const convertToHttp = (string) => {
  //   const array = string.split(" ");

  //   const main = array.join("%20");
  //   setLocation(main);
  //   console.log(main);
  // };
  const handleClose = (e, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  return (
    <>
      <Box className="container-fluid pt-5 pb-3">
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
          New Books
        </h3>

        {loading ? (
          <Container
            fixed
            sx={{
              height: "40vh",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <CircularProgress />
          </Container>
        ) : (
          <>
            <Box className="row px-xl-5">
              {newBooks &&
                newBooks.map((book) => (
                  <Box
                    key={book._id}
                    className="col-lg-3 col-md-4 col-sm-6 pb-1"
                  >
                    <Box className="product-item bg-light mb-4">
                      <div className="product-img position-relative overflow-hidden">
                        <img
                          className="img-fluid w-100"
                          src={book.images[0].url}
                          alt="book"
                        />
                        <div className="product-action">
                          <a
                            className="btn btn-outline-dark btn-square"
                            href="/"
                          >
                            <i className="fa fa-shopping-cart"></i>
                          </a>
                        </div>
                      </div>
                      <Box className="text-center py-4">
                        {/* <Link
                          className="h4 text-decoration-none text-truncate"
                          to={`/book/${book._id}`}
                        > */}
                        <Typography>{book.name}</Typography>
                        {/* </Link> */}
                        <div className="d-flex align-items-center justify-content-center mt-2">
                          <h5>
                            <span style={{ color: "green" }}>&#8358;</span>
                            {book.price}
                          </h5>
                        </div>
                        <div className="d-flex align-items-center justify-content-center mb-1">
                          <Rating
                            value={Number(book.rating)}
                            precision={0.5}
                            size="medium"
                            readOnly
                          />
                          <small>({book.numberOfReviews} reviews)</small>
                        </div>
                        <Stack>
                          <Link to={`/book/${book._id}`}>
                            <Button
                              variant="contained"
                              sx={{ "&:focus": { outline: "none" } }}
                            >
                              {" "}
                              View Details
                            </Button>
                          </Link>
                        </Stack>
                      </Box>
                    </Box>
                  </Box>
                ))}
              {error && (
                <Snackbar
                  open={true}
                  autoHideDuration={4000}
                  onClose={handleClose}
                >
                  <SnackbarAlert>
                    <h5>{error}</h5>
                  </SnackbarAlert>
                </Snackbar>
              )}
            </Box>
          </>
        )}
      </Box>
      {user ? (
        <div className="container-fluid pt-5 pb-3">
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
            Avalilable in <Typography>{user.campus}</Typography>
          </h3>
          <Location />
        </div>
      ) : (
        <Container fluid>
          <Alert
            variant="filled"
            severity="info"
            sx={{
              height: "20vh",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography>
              <Link to="/sign-in">Sign in </Link>
              to view books available in your campus
            </Typography>
          </Alert>
        </Container>
      )}
    </>
  );
}

export default Books;
