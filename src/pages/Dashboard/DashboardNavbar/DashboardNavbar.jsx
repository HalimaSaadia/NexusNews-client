import * as React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import GroupIcon from "@mui/icons-material/Group";
import DescriptionIcon from "@mui/icons-material/Description";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import HomeIcon from "@mui/icons-material/Home";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { Link } from "react-router-dom";
import "./dashboardNavbar.css";

export default function DashboardNavbar() {
  const [selectedIndex, setSelectedIndex] = React.useState(null);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  return (
    <Box
      sx={{ width: "100%", bgcolor: "transparent", position: "sticky", top: 0 }}
    >
      <List component="nav" aria-label="main mailbox folders">
        <Link to="/">
          {" "}
          <ListItemButton>
            <ListItemIcon>
              <HomeIcon color="secondary" />
            </ListItemIcon>
          </ListItemButton>
        </Link>

        <Divider />
        <Link to="/">
          <ListItemButton
            selected={selectedIndex === -1}
            onClick={(event) => handleListItemClick(event, -1)}
            style={{
              backgroundColor: selectedIndex === -1 ? "#c6ac8f" : "transparent",
              color: selectedIndex !== -1 ? "#c6ac8f" : "black",
            }}
          >
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>{" "}
            <ListItemText primary="Home" />
          </ListItemButton>
        </Link>
        <Link to="/dashboard">
          <ListItemButton
            selected={selectedIndex === -2}
            onClick={(event) => handleListItemClick(event, -2)}
            style={{
              backgroundColor: selectedIndex === -2 ? "#c6ac8f" : "transparent",
              color: selectedIndex !== -2 ? "#c6ac8f" : "black",
            }}
          >
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>{" "}
            <ListItemText primary="Dashboard" />
          </ListItemButton>
        </Link>

        <Link to="/dashboard/allUsers">
          <ListItemButton
            selected={selectedIndex === 0}
            onClick={(event) => handleListItemClick(event, 0)}
            style={{
              backgroundColor: selectedIndex === 0 ? "#c6ac8f" : "transparent",
              color: selectedIndex !== 0 ? "#c6ac8f" : "black",
            }}
          >
            <ListItemIcon>
              <GroupIcon />
            </ListItemIcon>{" "}
            <ListItemText primary="All Users" />
          </ListItemButton>
        </Link>

        <Link to="/dashboard/articles">
          <ListItemButton
            selected={selectedIndex === 1}
            onClick={(event) => handleListItemClick(event, 1)}
            style={{
              backgroundColor: selectedIndex === 1 ? "#c6ac8f" : "transparent",
              color: selectedIndex !== 1 ? "#c6ac8f" : "black",
            }}
          >
            <ListItemIcon>
              <DescriptionIcon />
            </ListItemIcon>

            <ListItemText primary="All Articles" />
          </ListItemButton>
        </Link>

        <Link to="/dashboard/add-publisher">
          <ListItemButton
            selected={selectedIndex === 2}
            onClick={(event) => handleListItemClick(event, 2)}
            style={{
              backgroundColor: selectedIndex === 2 ? "#c6ac8f" : "transparent",
              color: selectedIndex !== 2 ? "#c6ac8f" : "black",
            }}
          >
            <ListItemIcon>
              <AutoStoriesIcon />
            </ListItemIcon>
            <ListItemText primary="Add publisher" />
          </ListItemButton>
        </Link>
      </List>
    </Box>
  );
}
