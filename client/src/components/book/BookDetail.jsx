import React, { useEffect, useState, forwardRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getSingleBook,
  clearErrors,
  getBookReviews,
  postBookReview,
} from "../../redux/actions/booksAction";
import { useParams, Link } from "react-router-dom";
import { Container } from "@mui/system";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { LoadingButton } from "@mui/lab";
import {
  CircularProgress,
  Rating,
  Typography,
  Box,
  Button,
  ButtonGroup,
  IconButton,
  Stack,
  Alert,
  Snackbar,
} from "@mui/material";

// import { Carousel } from "react-bootstrap";
import { addItemToCart } from "../../redux/actions/cartAction";

const SnackbarAlert = forwardRef(function SnackbarAlert(props, ref) {
  return <Alert severity="warning" elevation={6} ref={ref} {...props} />;
});
const SnackbarAlert2 = forwardRef(function SnackbarAlert(props, ref) {
  return <Alert severity="success" elevation={6} ref={ref} {...props} />;
});
function BookDetail() {
  const [open, setOpen] = useState(false);
  // const [posted, setPosted] = useState(false);
  const [cart, setCart] = useState(false);
  const [count, setCount] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const { id } = useParams();
  const dispatch = useDispatch();
  const [state, setState] = useState(true);
  const { loading, error, book } = useSelector((state) => state.bookDetails);
  const { sending, success } = useSelector((state) => state.review);
  const { adding } = useSelector((state) => state.cart);
  const { reviews } = useSelector((state) => state.reviews);
  const { user } = useSelector((state) => state.auth);
  console.log(rating, comment);
  useEffect(() => {
    dispatch(getSingleBook(id));
    if (error) {
      console.log(error);
      dispatch(clearErrors());
    }
  }, [dispatch, id, error]);

  useEffect(() => {
    dispatch(getBookReviews(id));
    if (error) {
      console.log(error);
      dispatch(clearErrors());
    }
  }, [dispatch, id, success, error]);

  const toggleView = (view) => {
    setState((prev) => (prev ? false : true));
  };

  const increaseQty = () => {
    if (count >= Number(book?.book?.stock)) {
      setOpen(true);
      return;
    } else {
      const qty = count + 1;
      setCount(qty);
    }
  };
  const decreaseQty = () => {
    if (count <= 1) return;
    const qty = count - 1;
    setCount(qty);
  };
  const handleClose = (e, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  const handleClose2 = (e, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setCart(false);
  };

  const addToCart = () => {
    dispatch(addItemToCart(id, count));
    setCart(true);
  };

  const handleRating = (e, newValue) => {
    setRating(newValue);
  };

  const handlePostReview = async (e) => {
    e.preventDefault();
    const formData = {
      rating: rating,
      comment: comment,
      bookId: id,
    };
    dispatch(postBookReview(formData));
    setRating(0);
    setComment("");
  };

  return (
    <div className="container-fluid pb-5">
      {loading ? (
        <Container
          fixed
          sx={{
            height: "70vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CircularProgress />
        </Container>
      ) : (
        <Box sx={{ marginTop: "15vh" }}>
          {book && (
            <>
              <div className="row px-xl-5" style={{ marginTop: "10px" }}>
                <div className="col-lg-5 mb-30">
                  <div
                    id="product-carousel"
                    className="carousel slide"
                    data-ride="carousel"
                  >
                    <div className="carousel-inner bg-light">
                      {book?.book?.images.map((item) => (
                        <div key={item.url} className="carousel-item active">
                          <img
                            className="w-100 h-100"
                            src={item.url}
                            alt="book detail"
                          />
                        </div>
                      ))}
                    </div>
                    <a
                      className="carousel-control-prev"
                      href="#product-carousel"
                      data-slide="prev"
                    >
                      <i className="fa fa-2x fa-angle-left text-dark"></i>
                    </a>
                    <a
                      className="carousel-control-next"
                      href="#product-carousel"
                      data-slide="next"
                    >
                      <i className="fa fa-2x fa-angle-right text-dark"></i>
                    </a>
                  </div>
                </div>

                <div className="col-lg-7 h-auto mb-30">
                  <div className="h-100 bg-light p-30">
                    <h3>{book?.book?.name}</h3>
                    <Typography>
                      <strong>Author:</strong> {book?.book?.author}
                    </Typography>
                    <Typography>
                      <strong>Number Of Pages:</strong> {book?.book?.pageCount}{" "}
                      pages
                    </Typography>
                    <Typography>
                      <strong>Stock:</strong> {book?.book?.stock}
                    </Typography>
                    <div className="d-flex mb-3">
                      <div className="text-primary mr-2">
                        <Rating
                          defaultValue={Number(book?.book?.rating)}
                          precision={0.5}
                          size="medium"
                          readOnly
                        />
                      </div>
                      <small className="pt-1">
                        ({book?.book?.numberOfReviews} reviews)
                      </small>
                    </div>
                    <h3 className="font-weight-semi-bold mb-4">
                      <span style={{ color: "green" }}>&#8358;</span>
                      {book?.book?.price}
                    </h3>

                    <Stack
                      spacing={2}
                      sx={{ flexDirection: { xs: "column", md: "row" } }}
                    >
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
                          color="primary"
                          sx={{ "&:focus": { outline: "none" } }}
                          onClick={decreaseQty}
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
                          {count}
                        </Typography>
                        <IconButton
                          color="warning"
                          sx={{ "&:focus": { outline: "none" } }}
                          onClick={increaseQty}
                        >
                          <AddIcon />
                        </IconButton>
                      </ButtonGroup>

                      <LoadingButton
                        loading={adding ? true : false}
                        variant="outlined"
                        sx={{ "&:focus": { outline: "none" } }}
                        onClick={addToCart}
                        disabled={book?.book?.stock === 0}
                      >
                        <Typography variant="h5">Add to cart</Typography>
                      </LoadingButton>
                    </Stack>
                    <Box
                      sx={{
                        boxShadow: 2,
                        marginTop: "10px",
                        padding: "5px",
                        borderRadius: "10px",
                      }}
                    >
                      <Typography variant="h4" color="primary">
                        Description
                      </Typography>
                      <p className="mb-4">{book?.book?.description}</p>
                    </Box>
                  </div>
                </div>
              </div>

              <div className="row px-xl-5">
                <div className="col">
                  <div className="bg-light p-30">
                    <div className="nav nav-tabs mb-4">
                      <Button
                        variant={state ? "contained" : ""}
                        onClick={() => {
                          toggleView(true);
                        }}
                        sx={{ "&:focus": { outline: "none" } }}
                      >
                        Reviews ({book?.book?.numberOfReviews})
                      </Button>
                      <Button
                        sx={{ "&:focus": { outline: "none" } }}
                        onClick={() => {
                          toggleView(false);
                        }}
                        variant={!state ? "contained" : ""}
                      >
                        Description
                      </Button>
                    </div>

                    <div className="tab-content">
                      {state ? (
                        <Box>
                          <div className="row">
                            <div className="col-md-6">
                              {reviews && (
                                <h4 className="mb-4">
                                  {`${reviews.length} review(s) for ${book?.book?.name}`}
                                </h4>
                              )}
                              {reviews &&
                                reviews.map((rev) => (
                                  <div className="media mb-4">
                                    <div className="media-body">
                                      <h6>
                                        {rev.name}
                                        <small> </small>
                                      </h6>
                                      <Stack spacing={2}>
                                        <Rating
                                          value={rev.rating}
                                          precision={0.5}
                                          size="small"
                                          readOnly
                                        />
                                      </Stack>
                                      <Typography>{rev.comment}</Typography>
                                    </div>
                                  </div>
                                ))}
                            </div>

                            {user ? (
                              <div className="col-md-6">
                                <h4 className="mb-4">Leave a review</h4>

                                <Stack spacing={2}>
                                  <Rating
                                    value={rating}
                                    onChange={handleRating}
                                    precision={0.5}
                                    size="small"
                                  />
                                </Stack>
                                <form>
                                  <div className="form-group">
                                    <label htmlfor="message">
                                      Your Review *
                                    </label>
                                    <textarea
                                      id="message"
                                      cols="30"
                                      rows="5"
                                      className="form-control"
                                      value={comment}
                                      onChange={(e) =>
                                        setComment(e.target.value)
                                      }
                                    ></textarea>
                                  </div>

                                  <LoadingButton
                                    onClick={handlePostReview}
                                    variant="contained"
                                    loading={sending ? true : false}
                                    sx={{
                                      "&:focus": { outline: "none" },
                                      width: "30vw",
                                    }}
                                  >
                                    post
                                  </LoadingButton>
                                </form>
                              </div>
                            ) : (
                              <Box>
                                Sign In to leave a review
                                <Link to="/sign-in">Sign In</Link>
                              </Box>
                            )}
                          </div>
                        </Box>
                      ) : (
                        <Box>
                          <Typography variant="h4">
                            Product Description
                          </Typography>
                          <Typography variant="body1">
                            {book?.book?.description}
                          </Typography>
                        </Box>
                      )}
                    </div>
                  </div>
                </div>
                <Snackbar
                  open={open}
                  autoHideDuration={10000}
                  onClose={handleClose}
                >
                  <SnackbarAlert>
                    <Typography>Out of stock</Typography>
                  </SnackbarAlert>
                </Snackbar>

                <Snackbar
                  open={cart}
                  autoHideDuration={4000}
                  onClose={handleClose2}
                >
                  <SnackbarAlert2>
                    <Typography>Item Added to cart</Typography>
                  </SnackbarAlert2>
                </Snackbar>
                <Snackbar
                  open={success}
                  autoHideDuration={4000}
                  onClose={handleClose2}
                >
                  <SnackbarAlert2>
                    <Typography>Posted</Typography>
                  </SnackbarAlert2>
                </Snackbar>
              </div>
            </>
          )}
          {error && <Typography> {error}</Typography>}
        </Box>
      )}
    </div>
  );
}

export default BookDetail;
