import React, { useContext } from "react";

import MenuIcon from "@mui/icons-material/Menu";
import { Link, useLocation, useNavigate } from "react-router-dom";
import routeMenus, { type RouteMenu } from "../../routes/routeMenus";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "../../store/store";
import { clearError } from "../../slices/auth/authSlice";
import { ThemeContext } from "../../context/theme";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Switch from "@mui/material/Switch";
import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";

const drawerWidth = 240;

interface MainLayoutProps {
  children: React.ReactNode;
  title?: string;
  role?: "admin" | "faculty" | "student";
}

const MainLayout: React.FC<MainLayoutProps> = ({
  children,
  title = "Dashboard",
  role = "student",
}) => {
  const location = useLocation();
  const navigate = useNavigate();

  const [open, setOpen] = React.useState(false);
  const pathnames = location.pathname.split("/").filter(Boolean);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const dispatch = useDispatch<AppDispatch>();
  const toggleDrawer = () => {
    setOpen(!open);
  };
  const Logout = () => {
    sessionStorage.removeItem("token");
    dispatch(clearError());
    navigate("/");
  };
  const menusForRole: RouteMenu[] = routeMenus["admin"] || [];

  return (
    <Box>
      <AppBar position="fixed" sx={{ zIndex: 1201 }}>
        <Toolbar>
          <IconButton color="inherit" edge="start" onClick={toggleDrawer}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            {pathnames}
          </Typography>
          <Switch checked={theme} onChange={toggleTheme} color="warning" />
          <Button color="inherit" onClick={Logout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="temporary"
        open={open}
        onClose={toggleDrawer}
        sx={{
          "& .MuiDrawer-paper": { width: drawerWidth, boxSizing: "border-box" },
        }}
      >
        <Toolbar />
        <List>
          {menusForRole.map((menu) => (
            <ListItem key={menu.path} disablePadding>
              <ListItemButton
                component={Link}
                to={menu.path}
                onClick={toggleDrawer}
              >
                <ListItemText primary={menu.label} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 1.8, mt: 8 }}>
        {children}
      </Box>
    </Box>
  );
};

export default MainLayout;
