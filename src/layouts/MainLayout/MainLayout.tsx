import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Box,
  CssBaseline,
  Button,
  ListItemButton,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, useLocation, useNavigate } from "react-router-dom";
import routeMenus, { type RouteMenu } from "../../routes/routeMenus";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "../../store/store";
import { clearError } from "../../slices/auth/authSlice";

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
  const Authdata = useSelector((state: any) => state?.authlogin);
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
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      <AppBar position="fixed" sx={{ zIndex: 1201 }}>
        <Toolbar>
          <IconButton color="inherit" edge="start" onClick={toggleDrawer}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            {pathnames}
          </Typography>
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
      <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 8 }}>
        {children}
      </Box>
    </Box>
  );
};

export default MainLayout;
