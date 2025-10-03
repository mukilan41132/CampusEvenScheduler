import React from "react";
import { TextField } from "@mui/material";

interface CustomTextFieldProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  id?: string;
  variant?: "outlined" | "filled" | "standard";
  size?: "small" | "medium";
  type?: string;
  placeholder?: string;
}

const CustomTextField: React.FC<CustomTextFieldProps> = ({
  label,
  value,
  onChange,
  id = "custom-textfield",
  variant = "outlined",
  size = "small",
  type = "text",
  placeholder = "",
}) => {
  return (
    <TextField
      id={id}
      label={label}
      value={value}
      onChange={onChange}
      variant={variant}
      size={size}
      type={type}
      placeholder={placeholder}
      fullWidth
    />
  );
};

export default CustomTextField;
