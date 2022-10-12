import React, { useState, useEffect } from "react";
import { Typography, CircularProgress, Avatar } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useSelector, useDispatch } from "react-redux";
import { Container } from "@mui/system";

import {
  updateUser,
  getUserDetails,
  clearErrors,
} from "../../redux/actions/userActions";

import { useParams } from "react-router-dom";
import Sidebar from "./Sidebar";
// const SnackbarAlert = forwardRef(function SnackbarAlert(props, ref) {
//   return <Alert severity="success" elevation={6} ref={ref} {...props} />;
// });
function UpdateUser() {
  const dispatch = useDispatch();

  const { id } = useParams();
  const { loading, user } = useSelector((state) => state.userDetails);

  // const [open, setOpen] = useState(false);
  // const [status, setStatus] = useState(user ? user.status : "");

  const [role, setRole] = useState("");
  console.log(role);
  const { updating, error, isUpdated } = useSelector(
    (state) => state.updateUser
  );

  useEffect(() => {
    dispatch(getUserDetails(id));

    if (error) {
      console.log(error);
      dispatch(clearErrors());
    }

    // if (isUpdated) {
    //   setOpen(true);
    // }
  }, [dispatch, id, error, isUpdated]);

  // const handleClose = (e, reason) => {
  //   if (reason === "clickaway") {
  //     return;
  //   }
  //   setOpen(false);
  // };

  const updateUserHandler = (id) => {
    const formData = new FormData();
    formData.set("role", role);

    dispatch(updateUser(id, formData));
  };

  return (
    <>
      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>
        <div className="col-12 col-md-10" style={{ marginTop: "15vh" }}>
          <>
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
              <div className="row wrapper">
                <div className="col-10 col-lg-5">
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
                    {user && user.requested ? "Update User" : "User Detail"}
                  </h2>

                  <Avatar
                    src={user && user?.avatar?.url}
                    alt={user && user.name}
                  />
                  <div className="form-group">
                    <Typography>
                      <b>Name</b>
                    </Typography>
                    <Typography>{user && user.name}</Typography>
                  </div>
                  <div className="form-group">
                    <Typography>
                      <b>Email</b>
                    </Typography>
                    <Typography>{user && user.email}</Typography>
                  </div>
                  <div className="form-group">
                    <Typography>
                      <b>Campus</b>
                    </Typography>
                    <Typography>{user && user.campus}</Typography>
                  </div>
                  <div className="form-group">
                    <Typography>
                      <b>Course Of Study</b>
                    </Typography>
                    <Typography>{user && user.courseOfStudy}</Typography>
                  </div>
                  <div className="form-group">
                    <Typography>
                      <b>Role</b>
                    </Typography>
                    <Typography>{user && user.role}</Typography>
                  </div>

                  {user && user?.requested && (
                    <form className="shadow-lg">
                      <div className="form-group">
                        <label htmlFor="role_field">Role</label>

                        <select
                          id="role_field"
                          className="form-control"
                          name="role"
                          value={role}
                          onChange={(e) => setRole(e.target.value)}
                        >
                          <option value="user">user</option>
                          <option value="seller">seller</option>
                        </select>
                      </div>
                      <LoadingButton
                        id="login_button"
                        type="submit"
                        color="primary"
                        variant="contained"
                        loading={updating ? true : false}
                        sx={{ "&:focus": { outline: "none" } }}
                        onClick={() => updateUserHandler(user._id)}
                      >
                        Update Status
                      </LoadingButton>
                    </form>
                  )}
                </div>
              </div>
            )}
          </>
        </div>
      </div>
    </>
  );
}

export default UpdateUser;
