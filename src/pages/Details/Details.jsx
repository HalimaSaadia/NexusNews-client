import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useParams } from "react-router-dom";
import { Collections } from "@mui/icons-material";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function Details() {
  const [expanded, setExpanded] = useState(false);
  const axiosPublic = useAxiosPublic();
  const { id } = useParams();

  const {
    isPending,
    data: article = {},
    refetch,
  } = useQuery({
    queryKey: ["articleDetails"],
    queryFn: async () => {
      const result = await axiosPublic.get(`/details/${id}`);
      return result.data;
    },
  });


  useEffect(()=>{
    console.log("component mounted");
    if(!isPending){
      axiosPublic.patch(`/details/${id}`)
    .then(res => {
      console.log("viewCount",res.data);
    
    })
    }
   
  },[isPending])

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Box sx={{ maxWidth: "md", mx: "auto",mt:10 }}>
      <Card>
        <CardHeader
          avatar={
            <Avatar  sx={{ bgcolor: '#c6ac8f' }} aria-label="recipe">
              <img  src={article?.authorImage} alt="" />
            </Avatar>
          }
          
          title={article?.publisher}
          subheader={article?.author}
        />
        <CardMedia
          component="img"
          height="194"
          sx={{ maxHeight: 394,objectFit:"fill", }}
          image={article?.image}
          alt="Paella dish"
          
        />
        <CardContent>
          <Typography fontWeight={600} variant="h5">{article?.title}</Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites">
            <RemoveRedEyeIcon color="secondary" />
          </IconButton>
          <Typography>
           {article?.viewCount} views
          </Typography>
      
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
            
          >
          
            <ExpandMoreIcon />
          </ExpandMore>

        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography color="text.secondary" paragraph>{article?.description}</Typography>
          </CardContent>
        </Collapse>
      </Card>
    </Box>
  );
}
