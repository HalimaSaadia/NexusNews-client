import { Box } from "@mui/material";
import HomePageBanner from "../HomePageBanner/HomePageBanner";
import Plans from "../Plans/Plans";
import HomePageStatistic from "../HomePageStatistic/HomePageStatistic";
import Publisher from "../Publisher/Publisher";

import SubscriptionModal from "../SubscriptionModal/SubscriptionModal";

import WeatherWidget from "../WeatherWidget/WeatherWidget";
import Media from "../MediaSection/Media";
import TodaysPick from "../TodaysPick/TodaysPick";


const Home = () => {

 


  return (
    <Box>
      <HomePageBanner />
      <Box maxWidth={1200} mx="auto">
      <Plans />
      <Media />
      <TodaysPick />
      <HomePageStatistic />
      <Publisher />
      <SubscriptionModal />
      {/* <WeatherWidget /> */}
      </Box>
    </Box>
  );
};

export default Home;
