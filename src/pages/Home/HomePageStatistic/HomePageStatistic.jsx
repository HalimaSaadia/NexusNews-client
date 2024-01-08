import { Box, Container, Typography } from "@mui/material";
import CountUp from "react-countup";
import useUsersCount from "../../../Hooks/useUsersCount";
import Loader from "../../../shared/Loader/Loader";
import SectionHeading from "../../../shared/SectionHeading/SectionHeading";
import { FaUsers } from "react-icons/fa6";
import { HiMiniUsers } from "react-icons/hi2";
import { RiUserStarFill } from "react-icons/ri";

const HomePageStatistic = () => {
  const { usersCountLoading, usersCount } = useUsersCount();
  if (usersCountLoading) {
    return <Loader />;
  }
  return (
    <Box>
      <SectionHeading title="OUR USERS" />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          background:
            "linear-gradient(rgba(0,0,0,0.3), rgba(0, 0, 0, 0.3)), url('https://images.pexels.com/photos/7611189/pexels-photo-7611189.jpeg?auto=compress&cs=tinysrgb&w=1400') center/cover no-repeat",

          mt: 5,
          color: "white",
          minHeight: 300,
          py: {
            xs: 5,
            md:0
          },
        }}
      >
        <Box sx={{ display: "flex", alignItems: "end" }}>
          {" "}
          <Box
            sx={{
              display: "flex",
              // gridTemplateColumns: {
              //   sm: "repeat(2, auto)",
              //   md: "repeat(3, auto)",
              // },
              gap: 10,
              alignItems: "center",
              justifyContent: "center",
              flexWrap: "wrap",
              
            }}
          >
            <Box
              sx={{ maxWidth: 300, bgcolor: "#5E503F80", p: 2, minWidth: 250 }}
            >
              {" "}
              <Typography align="center" variant="h3">
                {/* <CountUp duration={5} end={usersCount?.allUsers} /> */}
                <FaUsers />
                <br />
                <CountUp duration={10} end={5572} />
              </Typography>
              <Typography variant="h5" align="center" mt={2}>
                Website Members
              </Typography>
            </Box>
            <Box
              sx={{ maxWidth: 300, bgcolor: "#5E503F80", p: 2, minWidth: 250 }}
            >
              {" "}
              <Typography align="center" variant="h3">
                {/* <CountUp duration={5} end={usersCount?.normalUsers} /> */}
                <HiMiniUsers />
                <br />
                <CountUp duration={10} end={5000} />
              </Typography>
              <Typography variant="h5" align="center" mt={2}>
                Regular Members
              </Typography>
            </Box>
            <Box
              sx={{ maxWidth: 300, bgcolor: "#5E503F80", p: 2, minWidth: 250 }}
            >
              {" "}
              <Typography align="center" variant="h3">
                {/* <CountUp duration={5} end={usersCount?.premiumUsers} /> */}
                <RiUserStarFill />
                <br />
                <CountUp duration={10} end={572} />
              </Typography>
              <Typography variant="h5" align="center" mt={2}>
                Elite Members
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default HomePageStatistic;
