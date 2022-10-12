import React, { useEffect, useState } from "react";
import { CircularProgress, IconButton, Typography, Box } from "@mui/material";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { myOrders, clearErrors } from "../../redux/actions/orderAction";
import { Container } from "@mui/system";
import { MDBDataTable } from "mdbreact";
import AcUnitIcon from "@mui/icons-material/AcUnit";
function ListOrders() {
  const [open, setOpen] = useState(false);
  // const [errorMessage, setErrorMessage] = useState();
  const diapatch = useDispatch();
  const { loading, error, orders } = useSelector((state) => state.myOrders);

  useEffect(() => {
    diapatch(myOrders());
    if (error) {
      setOpen(true);
      diapatch(clearErrors());
    }
  }, [diapatch, error, open]);

  const setOrders = () => {
    const data = {
      columns: [
        {
          label: "Order ID",
          field: "id",
          sort: "asc",
        },
        {
          label: "Num Of Items",
          field: "numOfItems",
          sort: "asc",
        },
        {
          label: "Amount",
          field: "amount",
          sort: "asc",
        },
        {
          label: "Status",
          field: "status",
          sort: "asc",
        },
        {
          label: "Actions",
          field: "actions",
          sort: "asc",
        },
      ],
      rows: [],
    };

    orders.forEach((order) => {
      data.rows.push({
        id: order._id,
        numOfItems: order.orderItems.length,
        amount: (
          <span style={{ color: "green" }}>&#8358;{order.itemsPrice}</span>
        ),
        status:
          order.orderStatus &&
          String(order.orderStatus).includes("Delivered") ? (
            <p style={{ color: "green" }}>{order.orderStatus}</p>
          ) : (
            <p style={{ color: "red" }}>{order.orderStatus}</p>
          ),
        actions: (
          <Link to={`/order/${order._id}`}>
            <IconButton sx={{ "&:focus": { outline: "none" } }}>
              <AcUnitIcon color="primary" />
            </IconButton>
          </Link>
        ),
      });
    });
    return data;
  };
  return (
    <Box sx={{ marginTop: "12vh", marginButtom: "9vh" }}>
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
        My Orders
      </h2>

      {orders && orders.length < 1 && (
        <Typography sx={{ marginTop: "15vh", marginButtom: "15vh" }}>
          You have no orders yet
        </Typography>
      )}

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
          <CircularProgress />
          <Typography>ORDERS....</Typography>
        </Container>
      ) : (
        <Box
          sx={{
            width: "auto",
            overflowX: "scroll",
          }}
        >
          <MDBDataTable
            data={setOrders()}
            className="px-3"
            bordered
            striped
            hover
          />
        </Box>
      )}
    </Box>
  );
}

export default ListOrders;
