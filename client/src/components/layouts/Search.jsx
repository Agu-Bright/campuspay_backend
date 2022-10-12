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
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
    border: "1px solid #48e5c2",
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
    if (e.keyCode === 13) {
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
    <Box sx={{ display: { xs: "none", md: "block" } }}>
      <Search>
        <FormControl onSubmit={handleSearchSubmit}>
          <SearchIconWrapper on={handleSearchSubmit}>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            type="text"
            name="search"
            value={search}
            onChange={handleChange}
            placeholder="Search Books.."
            inputProps={{ "aria-label": "search" }}
          />
        </FormControl>
        <IconButton onClick={() => handleSearchSubmit()}>
          <SearchIcon />
        </IconButton>
      </Search>
    </Box>
  );
}

export default Searche;
