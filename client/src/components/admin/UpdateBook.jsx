import React, { useState, useEffect, forwardRef } from "react";
import { Stack, Alert, Snackbar, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useSelector, useDispatch } from "react-redux";
import {
  updateBook,
  getSingleBook,
  clearErrors,
} from "../../redux/actions/booksAction";
import Schools from "./schools";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "./Sidebar";
const SnackbarAlert = forwardRef(function SnackbarAlert(props, ref) {
  return <Alert severity="success" elevation={6} ref={ref} {...props} />;
});

function UpdateBook() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [seller, setSeller] = useState("");
  const [author, setAuthor] = useState("");
  const [pageCount, setPageCount] = useState("");
  const [stock, setStock] = useState(0);
  const [location, setLocation] = useState("");
  const [images, setImages] = useState([]);
  const [status, setStatus] = useState("");

  const [oldImages, setOldImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);
  const { id } = useParams();

  const { error, book } = useSelector((state) => state.bookDetails);
  const {
    deleting: loading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.deleteBook);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getSingleBook(id));
  }, [dispatch, id]);

  useEffect(() => {
    setName(book?.book?.name);
    setPrice(book?.book?.price);
    setDescription(book?.book?.description);
    setAuthor(book?.book?.author);
    setPageCount(book?.book?.pageCount);
    setSeller(book?.book?.seller);
    setStock(book?.book?.stock);
    setLocation(book?.book?.location);
    setStatus(book?.book?.status);
    setOldImages(book?.book?.images);

    if (error) {
      console.log(error);
      dispatch(clearErrors());
    }
    if (updateError) {
      console.log(updateError);
    }
    if (isUpdated) {
      navigate("/admin/books");
    }
  }, [error, isUpdated, dispatch, navigate, updateError, book?.book, id]);

  const handleChange = (e) => {
    const files = Array.from(e.target.files);

    setImagesPreview([]);
    setImages([]);
    setOldImages([]);

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((oldArray) => [...oldArray, reader.result]);
          setImages((oldArray) => [...oldArray, reader.result]);
        }
      };
      reader.readAsDataURL(file);
    });
  };
  const handleClose = (e, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set("name", name);
    formData.set("price", price);
    formData.set("description", description);
    formData.set("seller", seller);
    formData.set("author", author);
    formData.set("pageCount", pageCount);
    formData.set("stock", stock);
    formData.set("location", location);
    if (user.role === "admin") formData.set("status", status);
    images.forEach((image) => {
      formData.append("images", image);
    });

    dispatch(updateBook(id, formData));
  };
  return (
    <div className="row">
      <div className="col-12 col-md-2">
        <Sidebar />
      </div>
      <div className="col-12 col-md-10" style={{ marginTop: "15vh" }}>
        <div className="wrapper my-5">
          <form
            className="shadow-lg"
            encType="multipart/form-data"
            onSubmit={handleSubmit}
          >
            <h1 className="mb-4">Update Book</h1>
            <Typography>
              <b>Sellers Id</b>
              {book?.book?.user}
            </Typography>
            <div className="form-group">
              <label htmlFor="name_field">Name</label>
              <input
                type="text"
                value={name}
                id="name_field"
                className="form-control"
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="price_field">Price</label>
              <input
                type="text"
                id="price_field"
                className="form-control"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="description_field">Description</label>
              <textarea
                className="form-control"
                id="description_field"
                rows="8"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>

            <div className="form-group">
              <label htmlFor="seller_field">Author Name</label>
              <input
                type="text"
                id="author_field"
                className="form-control"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="seller_field">Page Count</label>
              <input
                type="text"
                id="count_field"
                className="form-control"
                value={pageCount}
                onChange={(e) => setPageCount(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="category_field">Campus</label>
              <select
                className="form-control"
                id="category_field"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              >
                {Schools.map((school) => (
                  <option key={school} value={school}>
                    {school}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="stock_field">Stock</label>
              <input
                type="number"
                id="stock_field"
                className="form-control"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
              />
            </div>

            {user && user.role === "admin" && (
              <div className="form-group">
                <label htmlFor="seller_field">Status</label>
                <input
                  type="text"
                  id="seller_field"
                  className="form-control"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                />
              </div>
            )}

            <div className="form-group">
              <label>Images</label>

              <div className="custom-file">
                <input
                  type="file"
                  name="product_images"
                  className="custom-file-input"
                  id="customFile"
                  multiple
                  onChange={handleChange}
                />
                <label className="custom-file-label" htmlFor="customFile">
                  Choose Images
                </label>
              </div>

              {oldImages &&
                oldImages.map((image) => (
                  <img
                    key={image}
                    src={image.url}
                    alt="bookimage"
                    className="mt-3 mr-2"
                    width="55"
                    height="52"
                  />
                ))}

              {imagesPreview.map((img) => (
                <img
                  key={img}
                  className="mt-3 mr-2"
                  src={img}
                  alt="images-preview"
                  width="55"
                  height="52"
                />
              ))}
            </div>

            <Stack>
              <LoadingButton
                id="login_button"
                type="submit"
                color="primary"
                variant="contained"
                loading={loading ? true : false}
                sx={{ "&:focus": { outline: "none" } }}
              >
                UPDATE BOOK
              </LoadingButton>
              <Snackbar
                open={open}
                autoHideDuration={4000}
                onClose={handleClose}
              >
                <SnackbarAlert>
                  <Typography>Book Created</Typography>
                </SnackbarAlert>
              </Snackbar>
            </Stack>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UpdateBook;
