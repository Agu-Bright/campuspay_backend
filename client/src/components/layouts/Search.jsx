import React, { useState } from "react";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import { Box, Button, FormControl, IconButton } from "@mui/material";
// import SearchIcon from '@mui/icons-material/Search';
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  paddingLeft: "5px",
  "& .MuiInputBase-input": {
    // padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    // paddingLeft: { xs: "9px", md: `calc(1em + ${theme.spacing(4)})` },
    paddingLeft: "5px",

    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
    border: "1px solid #48e5c2",
    borderRadius: "5px",
  },
}));

function Searche() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (search) {
      const newSearch = search.trim();
      navigate(`/books?search=${newSearch}`);
      setSearch("");
    } else {
      navigate("/");
    }
  };

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.keyCode === "13") {
      //search post
      e.preventDefault();

      if (search) {
        const newSearch = search.trim();
        navigate(`/books?search=${newSearch}`);
        setSearch("");
      } else {
        navigate("/");
      }
    }
  };

  return (
    <Box sx={{ width: { xs: "15ch", md: "20ch" } }}>
      <Search>
        <FormControl
          onKeyPress={handleKeyPress}
          onSubmit={handleSearchSubmit}
          sx={{ display: "flex", flexDirection: "row", width: "135%" }}
        >
          {/* <SearchIconWrapper >
            <SearchIcon />
          </SearchIconWrapper> */}
          <StyledInputBase
            type="text"
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                //search post
                e.preventDefault();

                if (search) {
                  const newSearch = search.trim();
                  navigate(`/books?search=${newSearch}`);
                  setSearch("");
                } else {
                  navigate("/");
                }
              }
            }}
            name="search"
            value={search}
            onChange={handleChange}
            placeholder="Search Books.."
            inputProps={{
              "aria-label": "search",
              onkeypress: `${handleKeyPress}`,
            }}
          />
          <IconButton
            onClick={handleSearchSubmit}
            sx={{ "&:focus": { outline: "none" } }}
          >
            <SearchIcon />
          </IconButton>
        </FormControl>
      </Search>
    </Box>
  );
}

export default Searche;
