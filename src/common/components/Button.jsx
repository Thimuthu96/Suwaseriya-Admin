import React from "react";
import { Button as MaterialButton } from "@mui/material";

const Button = ({
  label,
  type = "button",
  fullWidth = false,
  onClick,
  ...props
}) => {
  return (
    <MaterialButton
      type={type}
      fullWidth={fullWidth}
      variant="contained"
      onClick={onClick}
      sx={{ textTransform: "none" }}
      {...props}
    >
      {label}
    </MaterialButton>
  );
};

export default Button;
