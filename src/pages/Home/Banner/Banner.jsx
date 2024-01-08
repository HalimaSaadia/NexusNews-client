import Box from "@mui/material/Box";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

const Banner = () => {
  return (
    <Box>
      <Box sx={{ display: { md: "flex", },flexDirection:{md:"row-reverse"}, mt:10, mx: "auto", px:2 }}>
     
        <CardMedia
          component="img"
          sx={{ width: { md: "60%", height: 300 } }}
          image="https://media.istockphoto.com/id/1394183500/photo/anchorman-reporting-live-news-in-a-city-at-night-news-coverage-by-professional-handsome.jpg?s=1024x1024&w=is&k=20&c=4d4RfglAvME-qTvB3oZGhM1GjJ2KKjHE2UbvvAYpeec="
          title="Live from space album cover"
        />
           <Box sx={{ display:"grid", px:2, alignItems:"center",height:{sm:300}, width: { md: "40%",},  bgcolor: "#1F1D1F",  }}>
          <CardContent sx={{ flex: "1 0 auto" }}>
            <Typography component="div" variant="h5" color="#F1ECE4" letterSpacing={1}>
              Authentic Insights, 100% of Our Dedication Spent Bringing You
              In-Depth Stories from Indoors.
            </Typography>

            <Typography
              sx={{ mr: { md: 5 }, textAlign: "justify", mt: 2,   }}
              variant="subtitle1"
              color="#F1ECE4"
              fontWeight={200}
              
            >
              Delivering News That Matters, Wherever You Are. enrich your
              reading experience.
            </Typography>
          </CardContent>
        </Box>
      </Box>
    </Box>
  );
};

export default Banner;
