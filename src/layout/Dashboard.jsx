import { Box, Grid } from "@mui/material";
import { Outlet } from "react-router-dom";
import DashboardNavbar from "../pages/Dashboard/DashboardNavbar/DashboardNavbar";

const Dashboard = () => {
  return (
    <Grid container>
      <Grid 
      item 
      md={3}
        sx={{
          minHeight: "100vh",
          backgroundColor: "secondary.main",
        }}
      >
        <DashboardNavbar />
      </Grid>
      <Grid item md={9}>
        <Outlet />
      </Grid>
    </Grid>
  )
};

export default Dashboard;
