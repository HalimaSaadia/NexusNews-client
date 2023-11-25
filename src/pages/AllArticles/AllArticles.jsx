import { useQuery } from "@tanstack/react-query";
import AllArticleCard from "./AllArticleCard";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { Box, Container, TextField } from "@mui/material";
import { Search } from "@mui/icons-material";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";

const AllArticles = () => {
  const axiosPublic = useAxiosPublic();
  const [searchedValue,setSearchedValue] = useState("")
  const { isPending, data: articles = [],refetch } = useQuery({
    queryKey: ["articles"],
    queryFn: async () => {
      const result = await axiosPublic.post(`/approved-articles`,{searchedValue});
      return result.data;
    },
  });
  
  const handleChange = e => {
    setSearchedValue(e.target.value)
    refetch()
  }

  return (
    <Container maxWidth="lg" sx={{ py: 5 }}>
      <Box  sx={{position:"relative",maxWidth:'sm',mx:'auto',mb:10}}>
        <SearchIcon sx={{position:"absolute",top: 15,right:0}} />
        <TextField onChange={handleChange} placeholder="Search" fullWidth id="outlined-basic"  variant="outlined" />
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "auto", sm: "auto auto" },
          gap: 5,
        }}
      >
        {articles.map((article) => (
          <AllArticleCard key={article._id} article={article} />
        ))}
      </Box>
    </Container>
  );
};

export default AllArticles;
