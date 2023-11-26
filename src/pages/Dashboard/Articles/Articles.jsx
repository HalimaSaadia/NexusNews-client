import React from 'react';
import ArticleCard from './ArticleCard';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { Box, Container } from '@mui/material';

const Articles = () => {
    const axiosSecure = useAxiosSecure()
    const {isPending:articlesLoading, data:articles} = useQuery({
        queryKey: ['dashboardArticles'],
        queryFn: async () => {
            const result = await axiosSecure.get("/all-articles")
            return result.data
        }

    })
    console.log(articles);
    return (
        <Box sx={{maxWidth:'90%'}}>
           {articles?.map(article =>  <ArticleCard key={article._id} article={article} />)}
        </Box>
    );
};

export default Articles;