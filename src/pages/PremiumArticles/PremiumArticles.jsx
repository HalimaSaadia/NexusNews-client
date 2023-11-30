import { Box, Container, Grid, Paper, Typography } from "@mui/material";
import React from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../shared/Loader/Loader";
import AllArticleCard from "../AllArticles/AllArticleCard";
import SectionHeading from "../../shared/SectionHeading/SectionHeading";

const PremiumArticles = () => {
  const axiosSecure = useAxiosSecure();
  const { isPending: premiumArticlesPending, data: premiumArticles } = useQuery(
    {
      queryKey: ["premiumArticles"],
      queryFn: async () => {
        const result = await axiosSecure.get("/premiumArticles");
        return result.data;
      },
    }
  );
  if (premiumArticlesPending) {
    return <Loader />;
  }
  console.log(premiumArticles);
  return (
    <Container>
      <Box sx={{ display: "flex", justifyContent: "center", pt: 5 }}>
        <Paper
          sx={{ display: "inline-block", py: 1, px: 5, borderRadius: 10 }}
          elevation={3}
        >
          <Typography variant="h4" fontWeight={700}>
            OUR PREMIUM ARTICLES
          </Typography>
        </Paper>
      </Box>
      <Grid container my={5}>
        {premiumArticles?.map((article) => (
          <AllArticleCard key={article._id} article={article} />
        ))}
      </Grid>
    </Container>
  );
};

export default PremiumArticles;
