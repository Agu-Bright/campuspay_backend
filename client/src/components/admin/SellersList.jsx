import React, { useEffect, useState } from "react";
import {
  CircularProgress,
  IconButton,
  Typography,
  Box,
  Modal,
  Stack,
  Button,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  allSellers,
  clearErrors,
  deleteUser,
} from "../../redux/actions/userActions";
import { Container } from "@mui/system";
import { MDBDataTable } from "mdbreact";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import DeleteIcon from "@mui/icons-material/Delete";
import Sidebar from "./Sidebar";

function SellersList() {
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
  const [userId, setUserId] = useState();
  const dispatch = useDispatch();
  const { loading, error, sellers } = useSelector((state) => state.allSellers);
  const { reset } = useSelector((state) => state.DeleteUser);

  useEffect(() => {
    dispatch(allSellers());

    if (error) {
      console.log(error);
      dispatch(clearErrors());
    }
  }, [dispatch, error, reset]);

  const handleDelete = (id) => {
    dispatch(deleteUser(id));
  };

  //   const handleClose = (e, reason) => {
  //     if (reason === "clickaway") {
  //       return;
  //     }
  //     setOpen(false);
  //   };
  const setSellers = () => {
    const data = {
      columns: [
        {
          label: "User ID",
          field: "id",
          sort: "asc",
        },
        {
          label: "Name",
          field: "name",
          sort: "asc",
        },
        {
          label: "Email",
          field: "email",
          sort: "asc",
        },
        {
          label: "Role",
          field: "role",
          sort: "asc",
        },
        {
          label: "Actions",
          field: "actions",
        },
      ],
      rows: [],
    };

    sellers &&
      sellers.forEach((seller) => {
        data.rows.push({
          id: seller._id,
          name: seller.name,
          email: seller.email,
          role: seller.role,
          actions: (
            <>
              <Link to={`/admin/user/${seller._id}`}>
                <IconButton sx={{ "&:focus": { outline: "none" } }}>
                  <AcUnitIcon color="primary" />
                </IconButton>
              </Link>
              <IconButton
                color="error"
                sx={{ "&:focus": { outline: "none" } }}
                onClick={() => {
                  setUserId(seller._id);
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
                  All Sellers
                </h2>
                <Box
                  sx={{
                    width: "auto",
                    overflowX: "scroll",
                  }}
                >
                  <MDBDataTable
                    data={setSellers()}
                    className="px-3"
                    bordered
                    striped
                    hover
                  />
                </Box>
                {/* 
                <Snackbar
                  open={isDeleted}
                  autoHideDuration={4000}
                  onClose={handleClose}
                >
                  <SnackbarAlert>
                    <Typography>Deleted</Typography>
                  </SnackbarAlert>
                </Snackbar> */}
                <Modal
                  open={openM}
                  onClose={handleCloseM}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box sx={style}>
                    <Typography
                      id="modal-modal-title"
                      variant="h6"
                      component="h2"
                    >
                      Delete User
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                      Are you sure you wan't to delete this user?
                    </Typography>
                    <Stack
                      padding={2}
                      spacing={2}
                      direction="row"
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-around",
                      }}
                    >
                      <Button
                        sx={{ "&:focus": { outline: "none" } }}
                        onClick={() => setOpenM(false)}
                        variant="outlined"
                      >
                        cancel
                      </Button>
                      <Button
                        sx={{ "&:focus": { outline: "none" } }}
                        onClick={() => {
                          handleDelete(userId);
                          setOpenM(false);
                        }}
                        variant="contained"
                      >
                        Yes
                      </Button>
                    </Stack>
                  </Box>
                </Modal>
              </>
            )}
          </>
        </div>
      </div>
    </>
  );
}

export default SellersList;
