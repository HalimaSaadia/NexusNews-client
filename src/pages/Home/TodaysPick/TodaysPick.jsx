import { Box, CardContent, CardMedia, Typography } from "@mui/material";
import { useState } from "react";
import Calendar from "react-calendar";
import "./calendar.css";
import SectionHeading from "../../../shared/SectionHeading/SectionHeading";

const TodaysPick = () => {
  const [value, onChange] = useState(new Date());
  return (
    <Box>
        <SectionHeading title="Today's Pick" />
      <Box sx={{ display: { md: "flex" }, py: 5 }}>
        <Box sx={{ width: { md: "50%", position: "relative" } }}>
          <CardMedia
            component="img"
            image="https://media.istockphoto.com/id/831601850/photo/celebrity-talk-show.jpg?b=1&s=612x612&w=0&k=20&c=69hP07skFMMQkP7VOL_tO7Wbv_ECr6zM7I1i7jTfKic="
            sx={{height:"100%"}}
          />
          <Box sx={{ position: "absolute", bottom: 0, right: 0,display:{xs:"none", sm:"block"} }}>
            <Calendar onChange={onChange} value={value} />
          </Box>
        </Box>
        <Box sx={{ flexDirection: "column", width: { md: "50%" } }}>
          <CardContent sx={{ flex: "1 0 auto", ml: { md: 5 } }}>
            <Typography component="div" variant="h4">
              PrimeTime Choice
            </Typography>

            <Typography
              sx={{ textAlign: "justify", mt: 2 }}
              variant="subtitle1"
              color="text.secondary"
              component="div"
            >
              Immerse yourself in the ultimate television experience with
              'PrimeTime Choice,' our daily curated pick that promises
              entertainment at its finest. Handpicked for your viewing pleasure,
              each episode unfolds a captivating narrative, ensuring you stay
              hooked and entertained every day. Don't miss out on the excitement
              – tune in to 'Today's Pick' and elevate your viewing
              experience!Indulge in the perfect blend of drama, laughter, and
              suspense. 'PrimeTime Choice' brings you a daily escape into
              compelling storytelling, ensuring every moment is a thrill. Join
              us for an unforgettable journey into today's must-watch show,
              exclusively curated to captivate your senses
            </Typography>
          </CardContent>
        </Box>
      </Box>
    </Box>
  );
};

export default TodaysPick;
