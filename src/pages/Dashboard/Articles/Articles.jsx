import React, { useState } from "react";
import ArticleCard from "./ArticleCard";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { Box, Container } from "@mui/material";
import Loader from "../../../shared/Loader/Loader";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

const Articles = () => {
  const axiosSecure = useAxiosSecure();
  const [page, setPage] = useState(1);

  const {isPending:articlesCountPending, data:articlesCount} = useQuery({
    queryKey:["articlesCount"],
    queryFn: async()=> {
      const result = await axiosSecure.get("/allArticlesCount")
      return result.data
    }
  })
  const {
    isPending: articlesLoading,
    data: articles,
    refetch,
  } = useQuery({
    queryKey: ["dashboardArticles",page],
    queryFn: async () => {
      const result = await axiosSecure.get(`/all-articles?page=${page}`);
      return result.data;
    },
  });

  if(articlesCountPending){
    return
  }
  
  const totalTabs = [...Array(Math.ceil(articlesCount?.articlesCount / 5)).keys()];
  console.log(totalTabs);

  return (
    <Container sx={{ }}>
      <Box>
       { !articlesLoading ?<Box>
          {articles?.map((article) => (
            <ArticleCard
              refetch={refetch}
              key={article._id}
              article={article}
            />
          ))}
        </Box>: <Loader />}
        <Box my={2}>
         { articlesCountPending || <Tabs>
            <TabList>
              {totalTabs.map((tabIdx) => (
                <Tab
                  onClick={() => {
                    setPage(tabIdx + 1);
                  }}
                  key={tabIdx}
                >
                  {tabIdx + 1}
                </Tab>
              ))}
            </TabList>
           
          </Tabs>}
        </Box>
      </Box>
    </Container>
  );
};

export default Articles;
