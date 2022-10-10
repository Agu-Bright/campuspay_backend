import React, { useState, useEffect, forwardRef } from "react";
import { Stack, Alert, Snackbar, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useSelector, useDispatch } from "react-redux";
import { createBook, clearErrors } from "../../redux/actions/booksAction";
import Schools from "./schools";
import { useNavigate } from "react-router-dom";
import { CREATE_BOOKS_RESET } from "../../redux/constants/bookConstants";
import Sidebar from "./Sidebar";
const SnackbarAlert = forwardRef(function SnackbarAlert(props, ref) {
  return <Alert severity="success" elevation={6} ref={ref} {...props} />;
});
function NewBook() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const [open, setOpen] = useState(false);

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [seller, setSeller] = useState("");
  const [author, setAuthor] = useState("");
  const [pageCount, setPageCount] = useState("");
  const [stock, setStock] = useState(0);
  const [location, setLocation] = useState(0);
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);
  const { loading, error, success } = useSelector((state) => state.createBook);

  const handleChange = (e) => {
    const files = Array.from(e.target.files);

    setImagesPreview([]);
    setImages([]);

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
    images.forEach((image) => {
      formData.append("images", image);
    });

    dispatch(createBook(formData));
  };

  useEffect(() => {
    if (error) {
      console.log(error);
      dispatch(clearErrors());
    }
    if (success) {
      navigate("/admin/books");
      console.log("success");
      dispatch({ type: CREATE_BOOKS_RESET });
    }
  }, [error, success, dispatch, navigate]);
  // const handleClose = (e, reason) => {
  //   if (reason === "clickaway") {
  //     return;
  //   }
  //   setOpen(false);
  // };
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
            <h1 className="mb-4">New Book</h1>

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

            <div className="form-group">
              <label htmlFor="seller_field">Seller Name</label>
              <input
                type="text"
                id="seller_field"
                className="form-control"
                value={seller}
                onChange={(e) => setSeller(e.target.value)}
              />
            </div>

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
                CREATE BOOK
              </LoadingButton>
              <Snackbar
                open={success}
                autoHideDuration={4000}
                // onClose={handleClose}
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

export default NewBook;
