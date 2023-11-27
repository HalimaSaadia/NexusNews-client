import { Box } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { Chart } from "react-google-charts";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useState } from "react";
import Loader from "../../../shared/Loader/Loader";



export const options = {
  title: "Publisher States",
};

const DashboardHomePage = () => {
    const axiosSecure = useAxiosSecure()
    const [option,setOption] = useState([ ["Task", "Hours per Day"]])
    const {isPending:publisherStatesPending, data:publisherStates} = useQuery({
        queryKey:["publisherStates"],
        queryFn: async()=> {
            const result = await axiosSecure.get("/publisher-states")
           const publishersStates = result.data
            const newOptions = publishersStates?.map(publisher => [publisher._id,publisher?.quantity])
            setOption([...option,...newOptions])
            return result.data
        }
    })
    
    if(publisherStatesPending){
        return <Loader />
    }
    
  return (
    <Box>
      <Chart
        chartType="PieChart"
        data={option}
        options={options}
        width={"100%"}
        height={"400px"}
      />
    </Box>
  );
};

export default DashboardHomePage;
