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
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Button, Grid } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Loader from "../../shared/Loader/Loader";


export default function AllArticleCard({ article }) {
  const { author, authorImage, description, image, publisher, title, _id } =
    article;
    const {user,loading} = useContext(AuthContext)
    const axiosSecure = useAxiosSecure()
    const navigate = useNavigate()

    const {isPending:loggedInUserPending, data:loggedInUser} = useQuery({
      queryKey:["loggedInUser"],
      enabled:!loading,
      queryFn: async()=> {
        const result = await axiosSecure.get(`/user/${user?.email}`)
        return result.data
      }
    })
    


  return (
    <Card
    item
    
    md={4}
      sx={{
        maxWidth: { sm: "auto" },
        display: "flex",
        flexDirection: "column",
        my:1,
    
        boxSizing:"border-box",
       
       
      }}
    >
      <CardHeader
        sx={{ bgcolor: "#a9927d",py:1 }}
        avatar={
          <Avatar sx={{ bgcolor: "#a9927d" }} aria-label="recipe">
            <img src={authorImage} alt="Author" />
          </Avatar>
          
        }
        action={
          <IconButton aria-label="settings">
            <Typography sx={{bgcolor:"primary.main",px:1,color:'white',borderRadius:1}} >{article?.isPremium && "PREMIUM"}</Typography>
          </IconButton>
        }
        title={publisher}
        subheader={`Author: ${author}`}
      />
      <CardMedia
        component="img"
        height="180"
        image={image}
        sx={{ height: 164 }}
        alt="Paella dish"
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom sx={{wordBreak:"break-all"}} variant="h5" component="div">
          {title.slice(0,50)}...
        </Typography>
        <Typography sx={{ flexGrow: 1, textAlign:"justify" }} variant="body2" color="text.secondary">
          {description?.slice(0, 40)}... ...
        </Typography>
      </CardContent>
  
        <CardActions disableSpacing>
          <Button onClick={() => navigate(`/details/${_id}`)} disabled={!loggedInUser?.isPremiumTaken && article?.isPremium ? true: false} fullWidth variant="contained" color="secondary">
            Details
          </Button>
        </CardActions>

    </Card>
  );
}
