import { Box, Card, CardContent, CardMedia, Container, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";

const Publisher = () => {
  const axiosPublic = useAxiosPublic();
  const { isPending: allPublisherLoading, data: allPublisher } = useQuery({
    queryKey: ["allPublisher"],
    queryFn: async () => {
      const result = await axiosPublic.get("/publisher");
      return result.data
    },
  });
  console.log(allPublisher);
  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        py: 5,
        color: "white",
      }}
    >
      <Box>
        {" "}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              sm: "repeat(2, auto)",
              md: "repeat(3, auto)",
              lg: "repeat(4, auto)",
            },
            gap: 10,
          }}
        >
          {allPublisher?.map((publisher) => (
            <Card key={publisher?._id} sx={{ width: 225 }}>
              <CardMedia
                sx={{ height: 140 }}
                image={publisher?.publisherImage}
                title="green iguana"
              />
              <CardContent sx={{bgcolor:'secondary.main', color:'white'}}>
                <Typography sx={{fontWeight:700}} gutterBottom variant="h5" component="div">
                 {publisher?.publisherName}
                </Typography>
        
              </CardContent>
             
            </Card>
          ))}
        </Box>
      </Box>
    </Container>
  );
};

export default Publisher;
