import { Container } from "@mui/system";
import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Stack,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import React from "react";
import { useSelector } from "react-redux";
function Profile() {
  const { user, loading } = useSelector((state) => state.auth);
  return (
    <Container
      fluid
      sx={{
        height: "90vh",
        marginTop: { xs: "9vh", md: "11vh" },
        display: "flex",
        flexDirection: "column",
        justifyContent: "start",
      }}
    >
      {loading ? (
        <Container fixed>
          <CircularProgress />
        </Container>
      ) : (
        <>
          <h3
            style={{
              width: "auto",
              paddingLeft: "6px",

              borderLeft: "10px solid #48e5c2",
              borderBottom: "0.1px solid #48e5c2",
              borderRadius: "10px",
              borderBottomRightRadius: "0px",
            }}
          >
            My profile
          </h3>
          <Box
            sx={{
              padding: "20px",
              width: "100%",
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Stack spacing={3} sx={{ width: "100%", margin: "20px" }}>
              <Avatar
                sx={{ width: 150, height: 150 }}
                alt={user?.name}
                src={user?.avatar?.url}
              />
              <Link to="/update-profile">
                <Button variant="contained">Edit Profile</Button>
              </Link>
            </Stack>

            <Stack spacing={2} sx={{ width: "100%", padding: "2px" }}>
              <h4 style={{ fontWeight: "200" }}>
                Full Name: <span>{user?.name}</span>
              </h4>

              <h4>
                Email Address: <span>{user?.email}</span>
              </h4>

              {user.role !== "admin" && (
                <Link to="/orders/me">
                  <Button variant="contained">My Orders</Button>
                </Link>
              )}
              <Typography>
                {" "}
                Joined On:{String(user.createdAt).substring(0, 10)}
              </Typography>

              <Link to="/update-password">
                <Button variant="contained">Change Password</Button>
              </Link>
            </Stack>
          </Box>
        </>
      )}
    </Container>
  );
}

export default Profile;
