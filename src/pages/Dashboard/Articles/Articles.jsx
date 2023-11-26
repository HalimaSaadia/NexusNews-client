import React from 'react';
import ArticleCard from './ArticleCard';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { Box, Container } from '@mui/material';

const Articles = () => {
    const axiosSecure = useAxiosSecure()
    const {isPending:articlesLoading, data:articles, refetch} = useQuery({
        queryKey: ['dashboardArticles'],
        queryFn: async () => {
            const result = await axiosSecure.get("/all-articles")
            return result.data
        }

    })
    console.log(articles);
    return (
        <Box sx={{display:'flex',justifyContent:'center'}}>
            <Box>{articles?.map(article =>  <ArticleCard refetch={refetch} key={article._id} article={article} />)}</Box>
           
        </Box>
    );
};

export default Articles;