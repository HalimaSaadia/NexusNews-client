import { Box, Container, Divider, Grid, Typography } from "@mui/material";
import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import "./calendar.css"

const WeatherWidget = () => {
  const [value, onChange] = useState(new Date());
  return (
    <Container
      sx={{
        background:
          "linear-gradient(rgba(0,0,0,0.2), rgba(0, 0, 0, 0.2)), url('https://images.pexels.com/photos/259620/pexels-photo-259620.jpeg?auto=compress&cs=tinysrgb&w=600') center/cover no-repeat",py:5,my:5,
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Box
            sx={{
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            
            }}
          >
            <Box>
              <Typography align="center" variant="h1" color="white">
                32&deg;
              </Typography>

              <Typography align="center" variant="h3" color="white">
                <WbSunnyIcon fontSize="22" />
                Sunny
              </Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Calendar  onChange={onChange} value={value} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default WeatherWidget;
