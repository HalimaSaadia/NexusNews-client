import React from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Chart } from "react-google-charts";
import { Container } from "@mui/material";
import Loader from "../../../shared/Loader/Loader";

const ArticlesChart = () => {
  const axiosSecure = useAxiosSecure();
  const { isPending: articlesStatesLoading, data: articlesStates } = useQuery({
    queryKey: ["articlesState"],
    queryFn: async () => {
      const result = await axiosSecure.get("/articlesCount");
      return result.data;
    },
  });
  console.log(articlesStates);
  if(articlesStatesLoading){
    return <Loader />
  }
const data = [
    [
      {
        v: "Mikes",
        f: 'Mikes<div style="color:red; font-style:italic">President</div>',
      },
      "",
      "The President",
    ],
    [
      {
        v: "Jim",
        f: `${articlesStates?.approvedArticles}<div style="color:black; padding:5px">Approved Articles</div>`,
      },
      "Articles Status",
      "VP",
    ],
    [`${articlesStates?.allArticles} <div>All Articles</div>`, "Articles Status", ""],
    [`${articlesStates?.pendingArticles}<div>Pending Articles</div>`, "Jim", "Bob Sponge"],
    [`${articlesStates?.declinedArticles}<p>Declined Articles</p>`, `${articlesStates?.pendingArticles}<div>Pending Articles</div>`, ""],
  ];
  
const options = {
    allowHtml: true,
  };
  return (
    <Container>
      <Chart
        chartType="OrgChart"
        data={data}
        options={options}
        width="100%"
        height="400px"
      />
    </Container>
  );
};

export default ArticlesChart;
