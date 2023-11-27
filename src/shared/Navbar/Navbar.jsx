import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { NavLink } from "react-router-dom";
import useUserState from "../../Hooks/useIsAdmin";
import "./navbar.css";
import { AuthContext } from "../../provider/AuthProvider";

const drawerWidth = 240;
const navItems = ["home", "about", "contact"];

export default function Navbar() {
  const { isAdmin, adminLoading, isPremiumTaken } = useUserState();
  const { user } = React.useContext(AuthContext);
  console.log(isAdmin, adminLoading);
  const [mobileOpen, setMobileOpen] = React.useState(false);



  const DrawerNavList = (
    <>
      <ListItem disablePadding>
        <ListItemButton sx={{ textAlign: "center" }}>
          <NavLink to="/">
            <ListItemText primary="Home" />
          </NavLink>
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding>
        <ListItemButton sx={{ textAlign: "center" }}>
          <NavLink to="/addArticle">
            <ListItemText primary="Add Article" />
          </NavLink>
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding>
        <ListItemButton sx={{ textAlign: "center" }}>
          <NavLink to="/articles">
            <ListItemText primary="All Articles" />
          </NavLink>
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding>
        <ListItemButton sx={{ textAlign: "center" }}>
          <NavLink to="/subscription">
            <ListItemText primary="Subscription" />
          </NavLink>
        </ListItemButton>
      </ListItem>
      {isAdmin === "admin" && (
        <ListItem disablePadding>
          <ListItemButton sx={{ textAlign: "center" }}>
            <NavLink to="/dashboard">
              <ListItemText primary="Dashboard" />
            </NavLink>
          </ListItemButton>
        </ListItem>
      )}
      {isPremiumTaken && (
        <ListItem disablePadding>
          <ListItemButton sx={{ textAlign: "center" }}>
            <NavLink to="/premium-articles">
              <ListItemText primary="Premium Articles" />
            </NavLink>
          </ListItemButton>
        </ListItem>
      )}
      <ListItem disablePadding>
        <ListItemButton sx={{ textAlign: "center" }}>
          <NavLink to="/myArticles">
            <ListItemText primary="My Articles" />
          </NavLink>
        </ListItemButton>
      </ListItem>
      {user ? (
        <ListItem disablePadding>
          <ListItemButton sx={{ textAlign: "center" }}>
            <NavLink to="/myProfile">
              <ListItemText primary="Profile" />
            </NavLink>
          </ListItemButton>
        </ListItem>
      ) : (
        <ListItem disablePadding>
          <ListItemButton sx={{ textAlign: "center" }}>
            <NavLink to="/login">
              <ListItemText primary="Profile" />
            </NavLink>
          </ListItemButton>
        </ListItem>
      )}
    </>
  );

  const NavList = (
    <>
      <NavLink to="/">
        <Button sx={{ color: "white" }}>Home</Button>
      </NavLink>

      <NavLink to="/addArticle">
        <Button sx={{ color: "white" }}>Add Article</Button>
      </NavLink>

      <NavLink to="/articles">
        <Button sx={{ color: "white" }}>All Articles</Button>
      </NavLink>

      <NavLink to="/subscription">
        <Button sx={{ color: "white" }}>Subscription</Button>
      </NavLink>

      {isAdmin === "admin" && (
        <NavLink to="/dashboard">
          <Button sx={{ color: "white" }}>Dashboard</Button>
        </NavLink>
      )}
      {isPremiumTaken && (
        <NavLink to="/premium-articles">
          <Button sx={{ color: "white" }}>Premium Article</Button>
        </NavLink>
      )}

      <NavLink to="/myArticles">
        <Button sx={{ color: "white" }}>My Articles</Button>
      </NavLink>

      {user ? (
        <NavLink to="/myProfile">
          <Button sx={{ color: "white" }}>My Profile</Button>
        </NavLink>
      ) : (
        <NavLink to="/login">
          {" "}
          <Button sx={{ color: "white" }}>Login</Button>
        </NavLink>
      )}
    </>
  );

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography color="primary" variant="h6" sx={{ my: 2 }}>
        Nexus News
      </Typography>
      <Divider />
      <List>{DrawerNavList}</List>
    </Box>
  );

  //   const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex", position: "sticky", top: 0, zIndex: 50 }}>
      <CssBaseline />
      <AppBar
        color="primary"
        sx={{ position: "sticky", top: 0 }}
        component="nav"
      >
        <Toolbar>
          <IconButton
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, color: "#0a0908", display: { lg: "none" } }}
          >
            <MenuIcon sx={{ color: "white" }} />
          </IconButton>
          <Typography
            variant="h6"
            color="white"
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", lg: "block" } }}
          >
            Nexus News
          </Typography>
          <Box sx={{ display: { xs: "none", lg: "block" } }}>{NavList}</Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          //   container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { sm: "block", lg: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </Box>
  );
}
