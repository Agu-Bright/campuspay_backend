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
  Link,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { resetPassword, clearErrors } from "../../redux/actions/userActions";
import { useNavigate, useParams } from "react-router-dom";

const SnackbarAlert = forwardRef(function SnackbarAlert(props, ref) {
  return <Alert severity="success" elevation={6} ref={ref} {...props} />;
});
const NewPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const token = params.token;

  // const { user, loading } = useSelector((state) => state.auth);
  const { error, success, sending } = useSelector(
    (state) => state.forgotPassword
  );

  const [open, setOpen] = useState(false);
  const [Message, setMessage] = useState(null);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    if (error) {
      setMessage(error);
      clearErrors();
    }

    if (success) {
      setOpen(true);
    }
  }, [navigate, error, dispatch, success]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.set("password", password);
    formData.set("confirmPassword", confirmPassword);

    dispatch(resetPassword(token, formData));
  };

  const handleClose = (e, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  return (
    <Box
      sx={{
        height: "50vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginTop: "15vh",
      }}
    >
      <Stack
        direction="column"
        spacing={1}
        sx={{
          boxShadow: 2,
          border: "0.1px solid #48e5c2",
          padding: "10px",
          borderRadius: "10px",
        }}
      >
        <Typography variant="h3">New Password</Typography>
        {Message && (
          <>
            <Alert severity="error">
              <AlertTitle>Error</AlertTitle>
              <Typography>{Message}</Typography>
            </Alert>
          </>
        )}
        <TextField
          label="password"
          type="text"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <TextField
          label="password"
          type="text"
          name="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
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
            loading={sending ? true : false}
            sx={{ "&:focus": { outline: "none" }, width: "30vw" }}
          >
            Reset Password
          </LoadingButton>
          <Typography sx={{ marginTop: "10px" }}>
            Go Back To <Link href="/sign-in">Sign In Page</Link>{" "}
          </Typography>
        </Stack>

        <Snackbar open={open} autoHideDuration={10000} onClose={handleClose}>
          <SnackbarAlert>
            <Typography variant="h4">Password Updated Successfully</Typography>
          </SnackbarAlert>
        </Snackbar>
      </Stack>
    </Box>
  );
};

export default NewPassword;
