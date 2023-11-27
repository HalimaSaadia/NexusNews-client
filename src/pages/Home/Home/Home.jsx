import { Box } from "@mui/material";
import HomePageBanner from "../HomePageBanner/HomePageBanner";
import Plans from "../Plans/Plans";
import HomePageStatistic from "../HomePageStatistic/HomePageStatistic";

const Home = () => {
  return (
    <Box>
      <HomePageBanner />
      <Plans />
      <HomePageStatistic />
    </Box>
  );
};

export default Home;
