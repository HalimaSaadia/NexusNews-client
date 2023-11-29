import { useQuery } from "@tanstack/react-query";
import AllArticleCard from "./AllArticleCard";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { Box, Container, Grid, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
import Loader from "../../shared/Loader/Loader";

const AllArticles = () => {
  const axiosPublic = useAxiosPublic();
  const [searchedValue, setSearchedValue] = useState("");
  const {
    isPending: allArticlesLoading,
    data: articles = [],
    refetch,
  } = useQuery({
    queryKey: ["articles"],
    queryFn: async () => {
      const result = await axiosPublic.post(`/approved-articles`, {
        searchedValue,
      });
      return result.data;
    },
  });

  const handleChange = (e) => {
    setSearchedValue(e.target.value);
    refetch();
  };
  if (allArticlesLoading) {
    return <Loader />;
  }

  return (
    <Container maxWidth="lg" sx={{ py: 5 }}>
      <Box sx={{ position: "relative", maxWidth: "sm", mx: "auto", mb: 10 }}>
        <SearchIcon sx={{ position: "absolute", top: 15, right: 0 }} />
        <TextField
          onChange={handleChange}
          placeholder="Search"
          fullWidth
          id="outlined-basic"
          variant="outlined"
        />
      </Box>

      <Grid container columnSpacing={2}>
        {articles.map((article) => (
          <AllArticleCard key={article._id} article={article} />
        ))}
      </Grid>
    </Container>
  );
};

export default AllArticles;
