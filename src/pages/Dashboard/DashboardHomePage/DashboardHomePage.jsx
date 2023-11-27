import {Container, Grid } from "@mui/material";
import PublisherChart from "./PublisherChart";
import UsersChart from "./UsersChart";
import ArticlesChart from "./ArticlesChart";





const DashboardHomePage = () => {

    
  return (
   <Container>
    <PublisherChart />
    <Grid container>
        <Grid item xs={6}>
        <UsersChart />
        </Grid>
        <Grid item xs={6}>
        <ArticlesChart />
        </Grid>
    </Grid>
   
   </Container>
  );
};

export default DashboardHomePage;
