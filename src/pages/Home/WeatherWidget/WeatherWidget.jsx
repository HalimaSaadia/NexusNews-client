import {
  Box,
  Button,
  CardMedia,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import { useState } from "react";
import "react-calendar/dist/Calendar.css";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const WeatherWidget = () => {
  const [location, setLocation] = useState("Dhaka");

  const {
    data: weather,
    isPending: weatherPending,
    refetch: weatherRefetch,
  } = useQuery({
    queryKey: ["weather", location],
    queryFn: async () => {
      const result = await axios.get(
        `http://api.weatherapi.com/v1/current.json?key=1302dc18f048440ba74102227232712&q=${location}`
      );
      return result.data;
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const newLocation = e.target.location.value;
    setLocation(newLocation);
    weatherRefetch();
    e.target.location.value = "";
  };

  return (
    <Box
      sx={{
        py: 5,
        background:
          "linear-gradient(rgba(0,0,0,0.7), rgba(0, 0, 0, 0.7)), url('https://images.pexels.com/photos/1118873/pexels-photo-1118873.jpeg?auto=compress&cs=tinysrgb&w=1200') center/cover no-repeat",
        my: 5,
      }}
    >
      <Box   sx={{ alignItems: "center" }}>
        
        <Box>
          <Box
            sx={{
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box sx={{ display: "flex",flexDirection:"column", justifyContent: "center"}}>
            <CardMedia
            sx={{ width: 100, margin: "auto", height: 100 }}
            component="img"
            image={weather?.current?.condition?.icon}
          />
              <Typography align="center" variant="h2" color="white">
                {weather?.current?.temp_c}&deg;C
              </Typography>
              <form onSubmit={handleSubmit} style={{margin:"auto"}}>
                <Box sx={{ display: "flex", my: 2 }}>
                  <input
                    name="location"
                    id="outlined-basic"
                    style={{
                      background: "transparent",
                      border: "2px solid white",
                    }}
                  />
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{ ml: 2, height: 43, bgcolor: "secondary.main" }}
                  >
                    Search
                  </Button>
                </Box>
              </form>

              <Typography align="center" variant="h5" color="white">
                {weather?.current?.condition?.text}, {weather?.location?.name},{" "}
                {weather?.location?.country}
              </Typography>

              <Box sx={{ display: "flex", alignItems: "center" }}></Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default WeatherWidget;
