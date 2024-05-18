import React, { FC } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { AutocompleteRenderInputParams, InputBase } from "@mui/material";
import { alpha, styled } from "@mui/material/styles";


const SearchBar = styled("form")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: 5,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
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
      [theme.breakpoints.up("sm")]: {
        width: "20ch",
      },
      overflow: "hidden",
      textOverflow: "ellipsis",
    },
  }));
  

export const RenderInput: FC<AutocompleteRenderInputParams> = (params) => {
    const { InputLabelProps: _inputLabelProps, InputProps: _inputProps, inputProps, ...rest } = params;
    const inputPropsFormatted = {
      ...inputProps,
      className: "",
    };

    return (
      <SearchBar>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          {...params.InputProps}
          {...rest}
          placeholder="Search…"
          inputProps={{
            "aria-label": "search",
            ...inputPropsFormatted,
          }}
        />
      </SearchBar>
    );
};
