import { Box } from "@mui/material";
import HomePageBanner from "../HomePageBanner/HomePageBanner";
import Plans from "../Plans/Plans";
import HomePageStatistic from "../HomePageStatistic/HomePageStatistic";
import Publisher from "../Publisher/Publisher";
import { useContext, useEffect, useState } from "react";
import SubscriptionModal from "../SubscriptionModal/SubscriptionModal";
import { AuthContext } from "../../../provider/AuthProvider";


const Home = () => {

 


  return (
    <Box>
      <HomePageBanner />
      <Plans />
      <HomePageStatistic />
      <Publisher />
      <SubscriptionModal />
    </Box>
  );
};

export default Home;
