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
    <Box>
      <SectionHeading title="Media Insights" />
      <Card sx={{ display:{md:"flex"},my:10 }}>
      <Box sx={{ flexDirection: "column", width:{md: "60%"} }}>
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Typography component="div" variant="h4" >
            Unveiling Stories Through Media
          </Typography>
         
          <Typography
            sx={{ mr: {md:5}, textAlign: "justify",mt:2 }}
            variant="subtitle1"
            color="text.secondary"
            component="div"
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
        sx={{ width:{md:"40%" }}}
        src={video}
        title="Live from space album cover"
        controls
        allow="autoPlay"
      />
    </Card>
    </Box>
  );
}
