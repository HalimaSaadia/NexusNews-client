import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import DashboardNavbar from "../pages/Dashboard/DashboardNavbar/DashboardNavbar";

const Dashboard = () => {
    return (
        <Box sx={{display:'grid',gridTemplateColumns:'repeat(12, auto)'}}>
            <Box sx={{gridColumn: 'span 2', minHeight:'100vh', backgroundColor:'secondary.main'}}>
                <DashboardNavbar />
            </Box>
            <Outlet />
        </Box>
    );
};

export default Dashboard;