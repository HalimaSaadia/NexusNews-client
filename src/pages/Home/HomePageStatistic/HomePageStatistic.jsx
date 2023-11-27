import { Box, Container, Typography } from "@mui/material";
import CountUp from "react-countup";
import useUsersCount from "../../../Hooks/useUsersCount";
import Loader from "../../../shared/Loader/Loader";

const HomePageStatistic = () => {

  const {usersCountLoading,usersCount} = useUsersCount()
  if(usersCountLoading){
    return <Loader />
  }
  return (
    <Container sx={{ display: "flex", justifyContent:"center",  background: "linear-gradient(rgba(0,0,0,0.7), rgba(0, 0, 0, 0.7)), url('https://media.istockphoto.com/id/1428321006/photo/glass-globe-on-newspapers.webp?b=1&s=170667a&w=0&k=20&c=JdSxI50uNGqcxj5wAoi-rlxe_P89CHFXi8fGPJMTXj4=') center/cover no-repeat", py:5,color:'white'}}>
    <Box>  <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { sm: "repeat(2, auto)", md: "repeat(3, auto)" },
          gap: 10,
        }}
      >
        <Box sx={{maxWidth:300}}>
          {" "}
          <Typography align="center" variant="h1">
            <CountUp duration={5} end={usersCount?.allUsers} />
          </Typography>
          <Typography variant="h5" align="center">
            ALL USERS
          </Typography>
        </Box>
        <Box sx={{maxWidth:300}}>
          {" "}
          <Typography align="center" variant="h1">
            <CountUp duration={5} end={usersCount?.normalUsers} />
          </Typography>
          <Typography variant="h5" align="center">
            NORMAL USERS
          </Typography>
        </Box>
        <Box sx={{maxWidth:300}}>
          {" "}
          <Typography align="center" variant="h1">
            <CountUp duration={5} end={usersCount?.premiumUsers} />
          </Typography>
          <Typography variant="h5" align="center">
            PREMIUM USERS
          </Typography>
        </Box>
      </Box></Box>

    </Container>
  );
};

export default HomePageStatistic;
