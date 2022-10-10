import {
  CircularProgress,
  Rating,
  Stack,
  Pagination,
  Box,
  Typography,
  Button,
} from "@mui/material";
import { Container } from "@mui/system";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBooks, clearErrors } from "../redux/actions/booksAction";
import { useNavigate, useLocation } from "react-router-dom";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function Books() {
  //handling the search query
  const navigate = useNavigate();
  const query = useQuery();
  // const page = query.get("page") || 1;
  const searchQuery = query.get("search");
  const dispatch = useDispatch();
  // const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const { loading, books, numberOfPages, error, searchNumberOfPages } =
    useSelector((state) => state.books);
  useEffect(() => {
    dispatch(getBooks(searchQuery, page));
    if (error) {
      dispatch(clearErrors());
    }
  }, [dispatch, searchQuery, page, error]);
  const handleChange = (e, value) => {
    setPage(value);
    console.log(value);
  };
  console.log(page);
  return (
    <div
      className="container-fluid"
      style={{
        display: "flex",
        justifyContent: "center",
        padding: "5px",
      }}
    >
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
        <>
          <div
            className="col-lg-10 col-md-8"
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <div className="row pb-3">
              <div className="col-12 pb-1">
                <div className="d-flex align-items-center justify-content-between mb-4">
                  {/* <div className="ml-2">
                    <div className="btn-group">
                      <button
                        type="button"
                        className="btn btn-sm btn-light dropdown-toggle"
                        data-toggle="dropdown"
                      >
                        Sorting
                      </button>
                      <div className="dropdown-menu dropdown-menu-right">
                        <a className="dropdown-item" href="/">
                          Latest
                        </a>
                        <a className="dropdown-item" href="/">
                          Popularity
                        </a>
                        <a className="dropdown-item" href="/">
                          Best Rating
                        </a>
                      </div>
                    </div>
                  </div> */}
                </div>
              </div>
              {books &&
                books.map((book) => (
                  <Box
                    key={book._id}
                    className="col-lg-3 col-md-6 col-sm-6 pb-1"
                    sx={{ marginTop: "15vh" }}
                  >
                    <Box
                      className="product-item bg-light mb-4"
                      sx={{ boxShadow: 2, height: "500px" }}
                    >
                      <div
                        className="product-img position-relative overflow-hidden"
                        style={{ height: "70%" }}
                      >
                        <img
                          className="img-fluid w-100"
                          src={book.images[0].url}
                          alt={book.name}
                          onClick={() => navigate(`/book/${book._id}`)}
                          // style={{ maxHeight: "300px" }}
                        />
                        {/* <div className="product-action">
                          <a
                            className="btn btn-outline-dark btn-square"
                            href="/"
                          >
                            <i className="fa fa-shopping-cart"></i>
                          </a>
                        </div> */}
                      </div>
                      <div
                        className="text-center py-4"
                        style={{ height: "30%" }}
                      >
                        <Typography>{book?.name}</Typography>
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
                            size="small"
                            readOnly
                          />
                          <small>({book.numberOfReviews} reviews)</small>
                        </div>
                        <Stack
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <Button
                            sx={{
                              "&:focus": { outline: "none" },
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              width: "50%",
                            }}
                            size="small"
                            variant="contained"
                            href={`/book/${book._id}`}
                          >
                            View Details
                          </Button>
                        </Stack>
                      </div>
                    </Box>
                  </Box>
                ))}

              {/* <div className="col-12">
                <nav>
                  <ul className="pagination justify-content-center">
                    <li className="page-item disabled">
                      <a className="page-link" href="/">
                        Previous
                      </a>
                    </li>
                    <li className="page-item active">
                      <a className="page-link" href="/">
                        1
                      </a>
                    </li>
                    <li className="page-item">
                      <a className="page-link" href="/">
                        2
                      </a>
                    </li>
                    <li className="page-item">
                      <a className="page-link" href="/">
                        3
                      </a>
                    </li>
                    <li className="page-item">
                      <a className="page-link" href="/">
                        Next
                      </a>
                    </li>
                  </ul>
                </nav>
              </div> */}
              <Stack
                spacing={2}
                sx={{
                  width: "90vw",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Pagination
                  color="primary"
                  count={searchQuery ? searchNumberOfPages : numberOfPages}
                  page={Number(page)}
                  onChange={handleChange}
                  sx={{
                    "&:focus": {
                      outline: "none",
                    },
                  }}
                />
              </Stack>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Books;
