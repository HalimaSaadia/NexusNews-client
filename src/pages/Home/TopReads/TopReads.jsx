import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./topreads.css"
import { Box, CardMedia, Typography } from "@mui/material";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import SectionHeading from "../../../shared/SectionHeading/SectionHeading";
import { GrNext, GrPrevious } from "react-icons/gr";

const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 3,
  initialSlide: 0,
  prevArrow: (
    <GrPrevious   
    />
  ),
  nextArrow: <GrNext />,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
        dots: false,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

export default function TopReads() {
  const axiosPublic = useAxiosPublic();
  const { isPending: trendLoading, data: articles } = useQuery({
    queryKey: ["trendingArticle"],
    queryFn: async () => {
      const result = await axiosPublic.get("/trendingArticle");
      return result.data;
    },
  });

  return (
    <Box sx={{ width: "100%", overflowX: "clip", my:15, px:2, }}>
      <Box>
      <SectionHeading title="Top Reads" />
      </Box>
      <Slider {...settings}>
        {articles?.map((article) => (
          <Box key={article?._id} sx={{ mt: 3 }}>
            <Box sx={{mr:1.5, mt:2}}>
              <CardMedia
                component="img"
                height={200}
                src={article?.image}
                title="Live from space album cover"
              />
             <Link to={`/details/${article?._id}`}>
             <Typography  variant="subtitle1" sx={{mt:2,fontWeight:"semibold", color:"primary.main", "&:hover":{textDecoration:"underline", cursor:"pointer", color:"black"}}}>
                {article?.title}
              </Typography></Link>
            </Box>
          </Box>
        ))}
      </Slider>
    </Box>
  );
}
