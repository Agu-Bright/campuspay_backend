import React, { useEffect, useState, forwardRef } from "react";
import {
  CircularProgress,
  IconButton,
  Typography,
  Box,
  Modal,
  Alert,
  Snackbar,
  Stack,
  Button,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  adminGetBooks,
  // clearErrors,
  deleteBook,
} from "../../redux/actions/booksAction";
import { Container } from "@mui/system";
import { MDBDataTable } from "mdbreact";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import DeleteIcon from "@mui/icons-material/Delete";
import Sidebar from "./Sidebar";
// import { DELETE_BOOKS_RESET } from "../../redux/constants/bookConstants";

const SnackbarAlert = forwardRef(function SnackbarAlert(props, ref) {
  return <Alert severity="success" elevation={6} ref={ref} {...props} />;
});

function BookList() {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: { xs: 200, md: 400 },
    bgcolor: "background.paper",
    border: "2px solid green",
    borderRadius: "10px",
    boxShadow: 24,
    p: 4,
  };

  const [openM, setOpenM] = useState(false);
  const handleOpenM = () => setOpenM(true);
  const handleCloseM = () => setOpenM(false);

  // const [open, setOpen] = useState(false);
  const [bookId, setBookId] = useState();
  // const [errorMessage, setErrorMessage] = useState();
  const dispatch = useDispatch();

  const { loading, error, books } = useSelector((state) => state.books);
  const { isDeleted, reset } = useSelector((state) => state.deleteBook);

  useEffect(() => {
    dispatch(adminGetBooks());

    // if (deleteError) {
    //   alert(deleteError);
    // }
  }, [dispatch, error, reset]);

  const handleDelete = (id) => {
    dispatch(deleteBook(id));
  };

  // const handleClose = (e, reason) => {
  //   if (reason === "clickaway") {
  //     return;
  //   }
  //   setOpen(false);
  // };
  const setBooks = () => {
    const data = {
      columns: [
        {
          label: "Book ID",
          field: "id",
          sort: "asc",
        },
        {
          label: "Name",
          field: "name",
          sort: "asc",
        },
        {
          label: "Price",
          field: "price",
          sort: "asc",
        },
        {
          label: "Status",
          field: "status",
          sort: "asc",
        },
        {
          label: "Stock",
          field: "stock",
          sort: "asc",
        },
        {
          label: "Actions",
          field: "actions",
        },
      ],
      rows: [],
    };

    books &&
      books.forEach((book) => {
        data.rows.push({
          id: book._id,
          name: book.name,
          price: <span style={{ color: "green" }}>&#8358;{book.price}</span>,
          status:
            book.status && String(book.status).includes("approved") ? (
              <p style={{ color: "green" }}>{book.status}</p>
            ) : (
              <p style={{ color: "red" }}>{book.status}</p>
            ),
          stock: book.stock,
          actions: (
            <>
              <Link to={`/admin/book/${book._id}`}>
                <IconButton sx={{ "&:focus": { outline: "none" } }}>
                  <AcUnitIcon color="primary" />
                </IconButton>
              </Link>

              <IconButton
                color="error"
                sx={{ "&:focus": { outline: "none" } }}
                onClick={() => {
                  setBookId(book._id);
                  handleOpenM();
                }}
              >
                <DeleteIcon />
              </IconButton>
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
              All Books
            </h2>
            <Box
              sx={{
                width: "auto",
                overflowX: "scroll",
              }}
            >
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
                <MDBDataTable
                  data={setBooks()}
                  className="px-3"
                  bordered
                  striped
                  hover
                />
              )}
            </Box>

            <Snackbar
              open={isDeleted}
              autoHideDuration={4000}
              // onClose={handleClose}
            >
              <SnackbarAlert>
                <Typography>Deleted</Typography>
              </SnackbarAlert>
            </Snackbar>
            <Modal
              open={openM}
              onClose={handleCloseM}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Delete Book
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  Are you sure you wan't to delete this book?
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
                      handleDelete(bookId);
                      setOpenM(false);
                    }}
                  >
                    Yes
                  </Button>
                </Stack>
              </Box>
            </Modal>
          </>
        </div>
      </div>
    </>
  );
}

export default BookList;
