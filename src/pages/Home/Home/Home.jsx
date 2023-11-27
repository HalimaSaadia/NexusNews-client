import { Box } from "@mui/material";
import HomePageBanner from "../HomePageBanner/HomePageBanner";
import Plans from "../Plans/Plans";
import HomePageStatistic from "../HomePageStatistic/HomePageStatistic";
import Publisher from "../Publisher/Publisher";


const Home = () => {
  return (
    <Box>
      <HomePageBanner />
      <Plans />
      <HomePageStatistic />
      <Publisher />
    </Box>
  );
};

export default Home;
