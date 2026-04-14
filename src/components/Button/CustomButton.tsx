import React from "react";
import { Button } from "@mui/material";
import { motion } from "motion/react";
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
    <motion.button
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.9, y: 1 }}
      color={color}
      type={type}
      onClick={onClick}
      style={{
        borderRadius: "8px",
        textTransform: "none",
        fontWeight: 600,
        padding: 5,
        height:"35px"
      }}
    >
      {text}
    </motion.button>
  );
};

export default CustomButton;
