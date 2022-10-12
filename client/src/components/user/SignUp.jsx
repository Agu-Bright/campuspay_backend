import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Typography,
  Stack,
  TextField,
  Box,
  Alert,
  AlertTitle,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
} from "@mui/material";
import { Link } from "react-router-dom";
import { LoadingButton } from "@mui/lab";
import { register, clearErrors } from "../../redux/actions/userActions";
import { useNavigate } from "react-router-dom";
import Schools from "../admin/schools.js";
// import VisibilityIcon from "@mui/icons-material/Visibility";
// import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
// import { Container } from "@mui/system";

function SignUp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [Message, setMessage] = useState(null);
  const { loading, isAuthenticated, error } = useSelector(
    (state) => state.auth
  );
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    campus: "",
    course: "",
    password: "",
    confirmPassword: "",
  });

  const [avatar, setAvatar] = useState();
  const [avatarPreview, setAvatarPreview] = useState(
    "/images/default_Avater.png"
  );
  // const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    } else {
      const name = e.target.name;
      const value = e.target.value;
      setUser({ ...user, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set("firstName", user.firstName);
    formData.set("lastName", user.lastName);
    formData.set("email", user.email);
    formData.set("campus", user.campus);
    formData.set("course", user.course);
    formData.set("password", user.password);
    formData.set("confirmPassword", user.confirmPassword);
    formData.set("avatar", avatar);

    dispatch(register(formData));
  };

  useEffect(() => {
    if (error) {
      setMessage(error);
      clearErrors();
    }
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate, error]);

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginTop: "30vh",
        marginBottom: "25vh",
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
        <Typography variant="h3">Campus Pay sign Up</Typography>
        {Message && (
          <>
            <Alert severity="error">
              <AlertTitle>Error</AlertTitle>
              <Typography variant="h5">{Message}</Typography>
            </Alert>
          </>
        )}

        <TextField
          label="first Name"
          type="text"
          name="firstName"
          value={user.firstName}
          onChange={handleChange}
          required
        />
        <TextField
          label="Last Name"
          name="lastName"
          type="text"
          value={user.lastName}
          onChange={handleChange}
          required
        />

        <TextField
          label="Emial Address"
          name="email"
          type="text"
          value={user.email}
          onChange={handleChange}
          required
        />
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Campus</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={user.campus}
            label="Age"
            name="campus"
            onChange={handleChange}
          >
            {Schools.map((school) => (
              <MenuItem key={school} value={school}>
                {school}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          label="Course of Study"
          name="course"
          type="text"
          value={user.course}
          onChange={handleChange}
          required
        />
        <TextField
          label="Password"
          type="password"
          name="password"
          value={user.password}
          onChange={handleChange}
          required
        />
        <TextField
          label="Confirm Password"
          name="confirmPassword"
          type="password"
          value={user.confirmPassword}
          onChange={handleChange}
          required
        />
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
            loading={loading ? true : false}
            sx={{ "&:focus": { outline: "none" }, width: "30vw" }}
          >
            Register
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
      </Stack>
    </Box>
  );
}

export default SignUp;
