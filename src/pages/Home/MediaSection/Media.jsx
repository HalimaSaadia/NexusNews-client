import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import video from "../../../assets/media.mp4"
import SectionHeading from "../../../shared/SectionHeading/SectionHeading";

export default function MediaControlCard() {
  const theme = useTheme();

  return (
    <Box sx={{px:2}}>
      <SectionHeading title="Media Insights" />
      <Box sx={{ display:{lg:"flex"}, mt:5}}>
      <Box sx={{ flexDirection: "column", width:{lg: "60%"} }}>
        <CardContent sx={{ flex: "1 0 auto" , px:0}}>
          <Typography component="div" variant="h5" letterSpacing={1} fontWeight={400} >
            Unveiling Stories Through Media
          </Typography>
         
          <Typography
            sx={{ mr: {md:5}, textAlign: "justify",mt:2 }}
            variant="subtitle1"
            color="text.secondary"
            component="div"
            fontWeight={200}
          >
            Dive into the vibrant world of multimedia storytelling with our
            'Visual Chronicles' section. Immerse yourself in a captivating blend
            of images, videos, and interactive content that brings news and
            narratives to life. From compelling photo essays capturing the
            essence of current events to thought-provoking videos that explore
            the untold stories behind the headlines, our media section aims to
            enrich your reading experience.
          </Typography>
        </CardContent>
      </Box>
      <CardMedia
        component="video"
        sx={{ width:{lg:"40%" }}}
        src={video}
        title="Live from space album cover"
        controls
        allow="autoPlay"
      />
    </Box>
    </Box>
  );
}
