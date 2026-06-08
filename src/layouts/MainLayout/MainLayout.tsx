import React, { useContext } from "react";

import MenuIcon from "@mui/icons-material/Menu";
import { Link, useLocation, useNavigate } from "react-router-dom";
import routeMenus, { navMap, type RouteMenu } from "../../routes/routeMenus";
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


const drawerWidth = 240;

interface MainLayoutProps {
  children: React.ReactNode;
  title?: string;
  role?: "ADMIN" | "faculty" | "STUDENT";
}

const MainLayout: React.FC<MainLayoutProps> = ({
  children,
  title = "Dashboard",
  role,
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
  const menusForRole = role ? navMap[role] : [];

  return (
    <Box>
      <AppBar
        position="fixed"
        sx={{ zIndex: 1201, backgroundColor: "#0f6817" }}
      >
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

      >
        <Toolbar />
        <aside style={styles.sidebar}>
          <div style={styles.logo}>
            <div style={styles.logoTitle}>EMS Portal</div>
            <div style={styles.logoSub}>Event Management</div>
          </div>

          <nav style={styles.nav}>
            {menusForRole.map((item, i) => {
              if ("section" in item) {
                return (
                  <div key={i} style={styles.navSection}>
                    {item.section}
                  </div>
                );
              }
              return (
                <div key={i} style={{ ...styles.navItem, ...(item.active ? styles.navItemActive : {}) }}>
                  <i className={`ti ti-${item.icon}`} style={styles.navIcon} aria-hidden="true" />
                  <span style={styles.navLabel}>{item.label}</span>
                  {item.badge && (
                    <span style={styles.navBadge}>{item.badge}</span>
                  )}
                </div>
              );
            })}
          </nav>
        </aside>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 1.8, mt: 8 }}>
        {children}
      </Box>
    </Box>
  );
};

export default MainLayout;

const styles: Record<string, React.CSSProperties> = {
  sidebar: {
    width: 200,
    flexShrink: 0,
    background: "#fff",
    borderRight: "0.5px solid #e8e6df",
    display: "flex",
    flexDirection: "column",
    padding: "16px 0",
    minHeight: "100vh",
  },
  logo: { padding: "0 16px 16px", borderBottom: "0.5px solid #e8e6df", marginBottom: 8 },
  logoTitle: { fontSize: 14, fontWeight: 500, color: "#1a1a1a" },
  logoSub: { fontSize: 11, color: "#aaa", marginTop: 2 },
  nav: { flex: 1 },
  navSection: {
    fontSize: 10,
    fontWeight: 500,
    letterSpacing: "0.06em",
    textTransform: "uppercase",
    color: "#aaa",
    padding: "12px 16px 4px",
  },
  navItem: {
    display: "flex",
    alignItems: "center",
    gap: 9,
    padding: "8px 16px",
    fontSize: 13,
    color: "#666",
    cursor: "pointer",
  },
  navItemActive: {
    color: "#1a1a1a",
    background: "#f5f4f0",
    fontWeight: 500,
  },
  navIcon: { fontSize: 16 },
  navLabel: { flex: 1 },
  navBadge: {
    background: "#FAEEDA",
    color: "#633806",
    fontSize: 10,
    padding: "1px 6px",
    borderRadius: 99,
  },
  roleSwitcher: {
    marginTop: "auto",
    padding: 12,
    borderTop: "0.5px solid #e8e6df",
  },
  roleLabel: {
    fontSize: 10,
    fontWeight: 500,
    letterSpacing: "0.06em",
    textTransform: "uppercase",
    color: "#aaa",
    marginBottom: 8,
  },
  roleBtn: {
    display: "block",
    width: "100%",
    padding: "6px 10px",
    fontSize: 12,
    border: "0.5px solid #e8e6df",
    borderRadius: 8,
    background: "#fff",
    color: "#666",
    cursor: "pointer",
    textAlign: "left",
    marginBottom: 4,
    fontFamily: "inherit",
  },
  roleBtnActive: {
    background: "#f5f4f0",
    color: "#1a1a1a",
    fontWeight: 500,
    borderColor: "#ccc",
  },
};