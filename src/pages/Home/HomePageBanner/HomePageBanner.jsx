import React, { Component } from "react";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Box, Button, Typography } from "@mui/material";
import "./swiper.css";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
export default function HomePageBanner() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
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

  const axiosPublic = useAxiosPublic();
  const { isPending: trendLoading, data: articles } = useQuery({
    queryKey: ["trendingArticle"],
    queryFn: async () => {
      const result = await axiosPublic.get("/trendingArticle");
      return result.data;
    },
  });
  console.log(articles);
  return (
    <Box sx={{width:'100%',overflowX:'clip',pb:5,minHeight:  {md:"450px"},}}>
      <Slider {...settings}>
        {articles?.map((article) => (
          <Box
            key={article?._id}
            className="slider"
            sx={{
              minHeight: "450px",
              position: "relative",
              background: `linear-gradient(rgba(0,0,0,0.7), rgba(0, 0, 0, 0.7)), url(${article?.image}) center/cover no-repeat`,
            }}
          >
            <Box sx={{width:{xs:'100%',sm:'80%',md:`70%`}, paddingX:{xs:2,md:5,lg:10}, paddingY:5,display:'flex',flexDirection:'column'}}>
             <Box>
             <Typography fontSize={{xs:'30px',sm:'38px',md:'40px',lg:'48px'}} color="white">
                {article?.title}
              </Typography>
              <Typography  sx={{flexGrow:1,mb:5,fontSize:{sm:'22px',md:'28px'}}} color="#c6ac8f" >
                {article?.description.slice(0,100)}...
              </Typography>
             </Box>
             <Link to={`/details/${article?._id}`} > <Button color="secondary"  variant="contained">View Details</Button></Link>
            </Box>
          </Box>
        ))}
      </Slider>
    </Box>
  );
}
