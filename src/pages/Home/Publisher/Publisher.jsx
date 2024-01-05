import { Box, Card, CardContent, CardMedia, Container, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import SectionHeading from "../../../shared/SectionHeading/SectionHeading";

const Publisher = () => {
  const axiosPublic = useAxiosPublic();
  const { isPending: allPublisherLoading, data: allPublisher } = useQuery({
    queryKey: ["allPublisher"],
    queryFn: async () => {
      const result = await axiosPublic.get("/publisher");
      return result.data
    },
  });
  return (
   <Box sx={{my:10}}>
    <SectionHeading title="OUR PUBLISHERS" />
     <Box
      sx={{
        py: 5,
        color: "white",
        my:3
      }}
    >
      <Box>
        {" "}
        <Box
          sx={{
            display: "flex",
            flexWrap:"wrap",
            justifyContent:"space-around"
  
          }}
        >
          {allPublisher?.map((publisher) => (
            <Card key={publisher?._id} sx={{ width: 225,boxShadow:0 }}>
              <CardMedia
                sx={{ height: 140,width:140,borderRadius:"50%",border:"10px solid #5E503F",margin:"auto" }}
                image={publisher?.publisherImage}
                title="green iguana"
              />
              <CardContent sx={{bgcolor:'', color:'black'}}>
                <Typography sx={{fontWeight:700,textAlign:"center"}} gutterBottom variant="h5" component="div">
                 {publisher?.publisherName}
                </Typography>
        
              </CardContent>
             
            </Card>
          ))}
        </Box>
      </Box>
    </Box>
   </Box>
  );
};

export default Publisher;
