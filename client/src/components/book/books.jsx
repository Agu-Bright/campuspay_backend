import {
  CircularProgress,
  Rating,
  Snackbar,
  Alert,
  Stack,
  Button,
  Typography,
} from "@mui/material";
import { Container } from "@mui/system";
import React, { useEffect, useState, forwardRef } from "react";
import { useDispatch } from "react-redux";
import { getNewBooks, clearErrors } from "../../redux/actions/booksAction";
import { Link } from "react-router-dom";

const SnackbarAlert = forwardRef(function SnackbarAlert(props, ref) {
  return <Alert severity="error" elevation={6} ref={ref} {...props} />;
});

function Books({
  loading,
  newBooks,
  error,
  booksCount,
  resPerPage,
  filteredBookCount,
}) {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    dispatch(getNewBooks());

    if (error) {
      console.log(error);
      dispatch(clearErrors());
    }
  }, [dispatch, error]);

  const handleClose = (e, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  return (
    <>
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
            <div className="row px-xl-5">
              {newBooks &&
                newBooks.map((book) => (
                  <div
                    key={book._id}
                    className="col-lg-3 col-md-4 col-sm-6 pb-1"
                  >
                    <div className="product-item bg-light mb-4">
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
                      <div className="text-center py-4">
                        <Link
                          className="h4 text-decoration-none text-truncate"
                          to={`/book/${book._id}`}
                        >
                          <Typography>{book.name}</Typography>
                        </Link>
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
                      </div>
                    </div>
                  </div>
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
            </div>
          </>
        )}
      </div>
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
            <div className="row px-xl-5">
              {newBooks &&
                newBooks.map((book) => (
                  <div
                    key={book._id}
                    className="col-lg-3 col-md-4 col-sm-6 pb-1"
                  >
                    <div className="product-item bg-light mb-4">
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
                      <div className="text-center py-4">
                        <Link
                          className="h4 text-decoration-none text-truncate"
                          to={`/book/${book._id}`}
                        >
                          {book.name}
                        </Link>
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
                      </div>
                    </div>
                  </div>
                ))}
              {error && (
                <Snackbar
                  open={() => {
                    setOpen(open);
                    return true;
                  }}
                  autoHideDuration={4000}
                  onClose={handleClose}
                >
                  <SnackbarAlert>
                    <h5>{error}</h5>
                  </SnackbarAlert>
                </Snackbar>
              )}
            </div>
          </>
        )}
      </div>

      {/* <div className="container-fluid pt-5 pb-3">
        <h2 className="section-title position-relative text-uppercase mx-xl-5 mb-4">
          <span className=" pr-3">New Books</span>
        </h2>
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
            <div className="row px-xl-5">
              {newBooks &&
                newBooks.map((book) => (
                  <div
                    key={book._id}
                    className="col-lg-3 col-md-4 col-sm-6 pb-1"
                  >
                    <div className="product-item bg-light mb-4">
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
                      <div className="text-center py-4">
                        <Link
                          className="h4 text-decoration-none text-truncate"
                          to={`/book/${book._id}`}
                        >
                          {book.name}
                        </Link>
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
                      </div>
                    </div>
                  </div>
                ))}
              {error && (
                <Snackbar
                  open={() => {
                    setOpen(true);
                    return true;
                  }}
                  autoHideDuration={4000}
                  onClose={handleClose}
                >
                  <SnackbarAlert>
                    <h5>{error}</h5>
                  </SnackbarAlert>
                </Snackbar>
              )}
            </div>
          </>
        )}
      </div> */}
    </>
  );
}

export default Books;
