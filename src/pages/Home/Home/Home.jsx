import { Box } from "@mui/material";
import HomePageBanner from "../HomePageBanner/HomePageBanner";
import Plans from "../Plans/Plans";
import HomePageStatistic from "../HomePageStatistic/HomePageStatistic";
import Publisher from "../Publisher/Publisher";

import SubscriptionModal from "../SubscriptionModal/SubscriptionModal";

import WeatherWidget from "../WeatherWidget/WeatherWidget";


const Home = () => {

 


  return (
    <Box>
      <HomePageBanner />
      <Plans />
      <HomePageStatistic />
      <Publisher />
      <SubscriptionModal />
      <WeatherWidget />
    </Box>
  );
};

export default Home;
