import { useQuery } from "@tanstack/react-query";
import AllArticleCard from "./AllArticleCard";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { Box, Container } from "@mui/material";


const AllArticles = () => {
    const axiosPublic = useAxiosPublic();
    const { isPending, data: articles = [] } = useQuery({
      queryKey: ["articles"],
      queryFn: async () => {
        const result = await axiosPublic.get("/approved-articles");
        return result.data;
      }
    });
    console.log(articles);
    return (
        <Container maxWidth='lg' sx={{display:'grid', gridTemplateColumns: {xs:'auto', sm:'auto auto', },gap:5}}>
            {articles.map(article => <AllArticleCard key={article._id} article={article} />)}
        </Container>
    );
};

export default AllArticles;