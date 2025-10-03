import React from "react";
import { Button } from "@mui/material";

interface CustomButtonProps {
  text: string;
  onClick?: () => void;
  variant?: "text" | "outlined" | "contained";
  color?:
    | "inherit"
    | "primary"
    | "secondary"
    | "success"
    | "error"
    | "info"
    | "warning";
  size?: "small" | "medium" | "large";
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  fullWidth?: boolean;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}

const CustomButton: React.FC<CustomButtonProps> = ({
  text,
  onClick,
  variant = "contained",
  color = "primary",
  size = "medium",
  startIcon,
  endIcon,
  fullWidth = false,
  disabled = false,
  type = "button",
}) => {
  return (
    <Button
      variant={variant}
      color={color}
      size={size}
      startIcon={startIcon}
      endIcon={endIcon}
      fullWidth={fullWidth}
      disabled={disabled}
      type={type}
      onClick={onClick}
      sx={{
        borderRadius: "8px",
        textTransform: "none",
        fontWeight: 600,
        px: 3,
      }}
    >
      {text}
    </Button>
  );
};

export default CustomButton;
