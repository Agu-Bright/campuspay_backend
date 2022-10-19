import React, { useState, useEffect, forwardRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container } from "@mui/system";

import {
  Typography,
  Stack,
  TextField,
  Box,
  Alert,
  AlertTitle,
  Snackbar,
  CircularProgress,
} from "@mui/material";
import { Link } from "react-router-dom";
import { LoadingButton } from "@mui/lab";
import {
  updateProfile,
  loadUser,
  clearErrors,
} from "../../redux/actions/userActions";
import { useNavigate } from "react-router-dom";
import { UPDATE_PROFILE_RESET } from "../../redux/constants/userConstants";

const SnackbarAlert = forwardRef(function SnackbarAlert(props, ref) {
  return <Alert severity="success" elevation={6} ref={ref} {...props} />;
});

function UpdateProfile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, loading } = useSelector((state) => state.auth);
  const { error, isUpdated, updating } = useSelector((state) => state.user);

  const [open, setOpen] = useState(false);
  const [Message, setMessage] = useState(null);
  const [name, setName] = useState("");
  const [email, setemail] = useState("");
  const [campus, setCampus] = useState("");
  // const [course, setCourse] = useState("");
  const [bank, setBank] = useState("");
  const [accountName, setAccountName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState(
    "/images/default_Avater.png"
  );
  // const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (error) {
      setMessage(error);
      clearErrors();
    }
    if (user) {
      setName(user?.name);
      setemail(user?.email);
      // setCourse(user?.courseOfStudy);
      setCampus(user?.campus);
      setAvatarPreview(user?.avatar?.url);
    }
    if (user.requested) {
      setBank(user?.bank);
      setAccountName(user?.accountName);
      setAccountNumber(user?.accountNumber);
      setPhoneNumber(user?.phoneNumber);
    }
    if (isUpdated) {
      setOpen(true);
      dispatch(loadUser());
      dispatch({ type: UPDATE_PROFILE_RESET });
    }
  }, [user, navigate, error, dispatch, isUpdated]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.set("name", name);
    formData.set("email", email);
    formData.set("campus", campus);
    // formData.set("course", course);
    formData.set("avatar", avatar);

    dispatch(updateProfile(formData));
  };

  const handleChange = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatarPreview(reader.result);
        setAvatar(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
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
        marginTop: "60vh",
        marginBottom: "40vh",
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
        <Stack direction="column" spacing={1}>
          <Typography variant="h3">Update Profile</Typography>
          {Message && (
            <>
              <Alert severity="error">
                <AlertTitle>Error</AlertTitle>
                <Typography>{Message}</Typography>
              </Alert>
            </>
          )}
          <TextField
            label="name"
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <TextField
            label="Emial Address"
            name="email"
            type="text"
            value={email}
            onChange={(e) => setemail(e.target.value)}
          />
          <TextField
            label="Campus"
            name="campus"
            type="text"
            value={campus}
            onChange={(e) => setCampus(e.target.value)}
          />
          {/* <TextField
            label="Course of Study"
            name="course"
            type="text"
            value={course}
            onChange={(e) => setCourse(e.target.value)}
          /> */}

          {user && user.requested && (
            <>
              <TextField
                sx={{ margin: "10px" }}
                label="Bank Name"
                name="bank"
                type="text"
                value={bank}
                onChange={handleChange}
                required
              />

              <TextField
                sx={{ margin: "10px" }}
                label="Account Number"
                type="text"
                name="accountNumber"
                value={accountNumber}
                onChange={handleChange}
                required
              />
              <TextField
                sx={{ margin: "10px" }}
                label="Account Name"
                type="text"
                name="accountName"
                value={accountName}
                onChange={handleChange}
                required
              />
              <TextField
                sx={{ margin: "10px" }}
                label="Phone Number"
                type="text"
                name="phoneNumber"
                value={phoneNumber}
                onChange={handleChange}
                required
              />
            </>
          )}
          <Stack direction="row" spacing={2}>
            <label htmlFor="avatar_upload">Avatar</label>
            <div className="d-flex align-items-center">
              <div>
                <figure className="avatar mr-3 item-rtl">
                  <img
                    src={avatarPreview}
                    className="rounded-circle"
                    alt="avatar"
                  />
                </figure>
              </div>
              <div className="custom-file">
                <input
                  type="file"
                  name="avatar"
                  className="custom-file-input"
                  id="customFile"
                  accept="images/*"
                  onChange={handleChange}
                />
                <label className="custom-file-label" htmlFor="customFile">
                  Choose Avatar
                </label>
              </div>
            </div>
          </Stack>
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
              Update Profile
            </LoadingButton>
          </Stack>

          <Typography>
            Already have an account{" "}
            <Link to="/sign-in" sx={{ cursor: "pointer" }}>
              {" "}
              <Typography variant="h5" color="primary">
                SIgn In
              </Typography>{" "}
            </Link>
          </Typography>

          <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
            <SnackbarAlert>
              <Typography>profile updated</Typography>
            </SnackbarAlert>
          </Snackbar>
        </Stack>
      )}
    </Box>
  );
}

export default UpdateProfile;
