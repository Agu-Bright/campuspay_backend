import React, { useState, useEffect, forwardRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Typography,
  Stack,
  TextField,
  Box,
  Alert,
  AlertTitle,
  Snackbar,
} from "@mui/material";

import { Link, useNavigate } from "react-router-dom";
import { LoadingButton } from "@mui/lab";
import { clearErrors, registerSeller } from "../../redux/actions/userActions";
// import VisibilityIcon from "@mui/icons-material/Visibility";
// import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
// import { Container } from "@mui/system";
const SnackbarAlert = forwardRef(function SnackbarAlert(props, ref) {
  return <Alert severity="success" elevation={6} ref={ref} {...props} />;
});
function Seller() {
  // const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState(null);
  const { updating, isUpdated, error } = useSelector(
    (state) => state.updateUser
  );
  const [open, setOpen] = useState(false);

  const [formData, setFormData] = useState({
    bank: "",
    accountName: "",
    accountNumber: "",
    phoneNumber: "",
  });

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerSeller(formData));
  };
  // const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (error) {
      setMessage(error);
      clearErrors();
    }
    if (isUpdated) {
      setOpen(true);
      navigate("/admin/newBook");
    }
  }, [error, isUpdated, navigate]);
  const handleClose = (e, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <Box
      sx={{
        height: "70vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginTop: "30vh",
        marginBottom: "20vh",
      }}
    >
      <Stack
        direction="column"
        spacing={1}
        sx={{
          boxShadow: { xs: "none", md: 2 },
          border: { xs: "none", md: "0.1px solid #48e5c2" },
          padding: "10px",
          borderRadius: "10px",
        }}
      >
        <Typography variant="h3">Become a seller</Typography>
        {message && (
          <>
            <Alert severity="error">
              <AlertTitle>Error</AlertTitle>
              <Typography variant="h5">{message}</Typography>
            </Alert>
          </>
        )}
        <form
          autoComplete="off"
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <TextField
            sx={{ margin: "10px" }}
            label="Bank Name"
            name="bank"
            type="text"
            value={formData.bank}
            onChange={handleChange}
            required
          />

          <TextField
            sx={{ margin: "10px" }}
            label="Account Number"
            type="text"
            name="accountNumber"
            value={formData.accountNumber}
            onChange={handleChange}
            required
          />
          <TextField
            sx={{ margin: "10px" }}
            label="Account Name"
            type="text"
            name="accountName"
            value={formData.accountName}
            onChange={handleChange}
            required
          />
          <TextField
            sx={{ margin: "10px" }}
            label="Phone Number"
            type="text"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
          />

          <Stack
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <LoadingButton
              onClick={handleSubmit}
              variant="contained"
              loading={updating ? true : false}
              sx={{ "&:focus": { outline: "none" }, width: "30vw" }}
            >
              Send Request
            </LoadingButton>
          </Stack>
        </form>
        <Snackbar open={open} autoHideDuration={10000} onClose={handleClose}>
          <SnackbarAlert>
            <Typography variant="h4">success</Typography>
          </SnackbarAlert>
        </Snackbar>
      </Stack>
    </Box>
  );
}

export default Seller;
