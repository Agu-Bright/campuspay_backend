import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getBooksLocation } from "../../redux/actions/booksAction";
import { Box, Typography, Rating, Stack, Button, Alert } from "@mui/material";
import { Container } from "@mui/system";
function Location() {
  const [location, setLocation] = useState("");
  const { user } = useSelector((state) => state.auth);
  const { books } = useSelector((state) => state.books);
  const dispatch = useDispatch();
  useEffect(() => {
    if (user) {
      const campus = user?.campus?.split(" ").join("%20");
      setLocation(campus);
      dispatch(getBooksLocation(location));
    }
  }, [user, dispatch, location]);
  return (
    <>
      <Box className="row px-xl-5">
        {books &&
          books.map((book) => (
            <Box key={book._id} className="col-lg-3 col-md-4 col-sm-6 pb-1">
              <Box className="product-item bg-light mb-4">
                <div className="product-img position-relative overflow-hidden">
                  <img
                    className="img-fluid w-100"
                    src={book.images[0].url}
                    alt="book"
                  />
                  <div className="product-action">
                    <a className="btn btn-outline-dark btn-square" href="/">
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

        {books.length === 0 && (
          <Container>
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
                Sorry There is no book available in your campus for now
              </Typography>
            </Alert>
          </Container>
        )}
      </Box>
    </>
  );
}

export default Location;
