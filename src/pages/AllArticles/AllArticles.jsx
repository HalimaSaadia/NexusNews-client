import { useQuery } from "@tanstack/react-query";
import AllArticleCard from "./AllArticleCard";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { Box, Button, Container, Grid, TextField } from "@mui/material";
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
    queryKey: ["articles",searchedValue],
    queryFn: async () => {
      const result = await axiosPublic.post(`/approved-articles`, {
        searchedValue,
      });
      return result.data;
    },
  });

  const handleSearch = (e) => {
    e.preventDefault()
    setSearchedValue(e.target.searchValue.value);
    refetch();
  };


  return (
    <Container maxWidth="lg" sx={{ py: 5 }}>
      <Box sx={{ maxWidth: "sm", mx: "auto", mb: 5 }}>
       <form onSubmit={handleSearch}>
       <Box sx={{ display: "flex", alignItems: "center" }}>
          {" "}
          <TextField
            name="searchValue"
            placeholder="Search"
            fullWidth
            id="outlined-basic"
            variant="outlined"
          />
          <Button type="submit" sx={{ml:1, px:5,py:"15px"}} variant="contained" color="secondary">
            search
          </Button>
        </Box>
       </form>
      </Box>

      <Grid container columnSpacing={2}>
        { !allArticlesLoading ? articles.map((article) => (
          <AllArticleCard key={article._id} article={article} />
        )): <Loader />}
      </Grid>
    </Container>
  );
};

export default AllArticles;
