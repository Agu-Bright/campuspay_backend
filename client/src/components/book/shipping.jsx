import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveShippingInfo } from "../../redux/actions/cartAction";
import { useNavigate } from "react-router-dom";
import { countries } from "countries-list";
import { Box, Button, Stack } from "@mui/material";
import CheckOutSteps from "./checkOutSteps";

function Shipping() {
  const countriesList = Object.values(countries);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { shippingInfo } = useSelector((state) => state.cart);
  const [address, setAddress] = useState(shippingInfo?.address);
  const [city, setCity] = useState(shippingInfo?.city);
  const [postalCode, setPostalCode] = useState(shippingInfo?.postalCode);
  const [phoneNumber, setPoneNumber] = useState(shippingInfo?.phoneNumber);
  const [country, setCountry] = useState(shippingInfo?.country);
  const [campus, setCampus] = useState(shippingInfo?.campus);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      saveShippingInfo({
        address,
        city,
        postalCode,
        phoneNumber,
        country,
        campus,
      })
    );
    navigate("/confirm");
  };
  return (
    <>
      <div className="row wrapper">
        <div style={{ margin: "0", padding: "0" }}>
          <CheckOutSteps shipping />
          <div className="col-10 col-lg-5">
            <form className="shadow-lg" onSubmit={submitHandler}>
              <h1 className="mb-4">Shipping Info</h1>
              <div className="form-group">
                <label htmlFor="address_field">Address</label>
                <input
                  type="text"
                  id="address_field"
                  className="form-control"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="city_field">City</label>
                <input
                  type="text"
                  id="city_field"
                  className="form-control"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone_field">Phone No</label>
                <input
                  type="phone"
                  id="phone_field"
                  className="form-control"
                  value={phoneNumber}
                  onChange={(e) => setPoneNumber(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="postal_code_field">Postal Code</label>
                <input
                  type="number"
                  id="postal_code_field"
                  className="form-control"
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="postal_code_field">Campus</label>
                <input
                  type="text"
                  id="campus_field"
                  className="form-control"
                  value={campus}
                  onChange={(e) => setCampus(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="country_field">Country</label>
                <select
                  id="country_field"
                  className="form-control"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  required
                >
                  {countriesList.map((country) => (
                    <option key={country.name} value={country.name}>
                      {country.name}
                    </option>
                  ))}
                </select>
              </div>

              <Stack
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Button
                  color="primary"
                  type="submit"
                  variant="contained"
                  sx={{ "&:focus": { outline: "none" }, width: "30vw" }}
                >
                  CONTINUE
                </Button>
              </Stack>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Shipping;
