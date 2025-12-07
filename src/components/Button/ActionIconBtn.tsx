import React from "react";
import { IconButton, Tooltip } from "@mui/material";

interface ActionIconProps {
  title: string;
  icon: React.ReactNode;
  onClick?: () => void;
  size?: "small" | "medium" | "large";
  color?: "inherit" | "primary" | "secondary" | "default" | "error" | "warning" | "info" | "success";
  sx?: object;
  disabled?: boolean;
}

const ActionIcon: React.FC<ActionIconProps> = ({
  title,
  icon,
  onClick,
  size = "small",
  color = "primary",
  sx = {},
  disabled = false,
}) => {
  return (
    <Tooltip title={title}>
      <IconButton
        size={size}
        color={color}
        onClick={onClick}
        disabled={disabled}
        sx={sx}
      >
        {icon}
      </IconButton>
    </Tooltip>
  );
};

export default ActionIcon;
