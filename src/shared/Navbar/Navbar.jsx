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
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { Avatar } from "@mui/material";
import Loader from "../Loader/Loader";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";

const drawerWidth = 240;
const navItems = ["home", "about", "contact"];

export default function Navbar() {
  const { isAdmin, adminLoading, isPremiumTaken } = useUserState();
  const { user, loading } = React.useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const {
    isPending: userPending,
    data: userFromDb,
    refetch,
  } = useQuery({
    queryKey: ["userFromDb"],
    enabled: !loading,
    queryFn: async () => {
      const result = await axiosSecure.get(`/user/${user?.email}`);
      return result.data;
    },
  });
  if (userPending && loading) {
    return <Loader />;
  }
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
          <NavLink to="/aboutUs">
            <ListItemText primary="About Us" />
          </NavLink>
        </ListItemButton>
      </ListItem>
      {user && (
        <ListItem disablePadding>
          <ListItemButton sx={{ textAlign: "center" }}>
            <NavLink to="/addArticle">
              <ListItemText primary="Add Article" />
            </NavLink>
          </ListItemButton>
        </ListItem>
      )}
      <ListItem disablePadding>
        <ListItemButton sx={{ textAlign: "center" }}>
          <NavLink to="/articles">
            <ListItemText primary="All Articles" />
          </NavLink>
        </ListItemButton>
      </ListItem>
      {user && (
        <ListItem disablePadding>
          <ListItemButton sx={{ textAlign: "center" }}>
            <NavLink to="/subscription">
              <ListItemText primary="Subscription" />
            </NavLink>
          </ListItemButton>
        </ListItem>
      )}
      {isAdmin === "admin" && user && (
        <ListItem disablePadding>
          <ListItemButton sx={{ textAlign: "center" }}>
            <NavLink to="/dashboard">
              <ListItemText primary="Dashboard" />
            </NavLink>
          </ListItemButton>
        </ListItem>
      )}
      {isPremiumTaken && user && (
        <ListItem disablePadding>
          <ListItemButton sx={{ textAlign: "center" }}>
            <NavLink to="/premiumArticles">
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
              <ListItemText primary="Login" />
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
      <NavLink to="/aboutUs">
        <Button sx={{ color: "white" }}>About Us</Button>
      </NavLink>

      {user && (
        <NavLink to="/addArticle">
          <Button sx={{ color: "white" }}>Add Article</Button>
        </NavLink>
      )}

      <NavLink to="/articles">
        <Button sx={{ color: "white" }}>All Articles</Button>
      </NavLink>

      {user && (
        <NavLink to="/subscription">
          <Button sx={{ color: "white" }}>Subscription</Button>
        </NavLink>
      )}

      {isAdmin === "admin" && user && (
        <NavLink to="/dashboard">
          <Button sx={{ color: "white" }}>Dashboard</Button>
        </NavLink>
      )}
      {isPremiumTaken && user && (
        <NavLink to="/premiumArticles">
          <Button sx={{ color: "white" }}>Premium Article</Button>
        </NavLink>
      )}

      {user && (
        <NavLink to="/myArticles">
          <Button sx={{ color: "white" }}>My Articles</Button>
        </NavLink>
      )}

      {user ? (
        <NavLink to="/myProfile">
          <Button sx={{ color: "white" }}>
            <Avatar
              alt="Remy Sharp"
              src={userFromDb?.userImage}
              sx={{ width: 36, height: 36 }}
            />
          </Button>
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
      <Typography
        color="primary"
        variant="h6"
        sx={{ my: 2, display: "flex", alignItems: "center" }}
      >
        <AutoStoriesIcon
          sx={{
            fontSize: "40px",
            color: "black",
            transform: "rotate(-15deg)",
            marginRight: "20px",
            ml: 2,
          }}
        />
        Nexus News
      </Typography>
      <Divider />
      <List>{DrawerNavList}</List>
    </Box>
  );

  return (
    <Box sx={{ display: "flex", position: "sticky", top: 0, zIndex: 50, }}>
      <CssBaseline />
      <AppBar
        color="primary"
        sx={{ position: "sticky", top: 0,py:1 }}
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
            sx={{ flexGrow: 1, display: { xs: "none", lg: "flex",alignItems:"center" } }}
          >
            <AutoStoriesIcon
              sx={{
                fontSize: "40px",
                color: "white",
                transform: "rotate(-15deg)",
                marginRight: "20px",
                ml: 2,
              }}
            />
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
