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
import { Button } from "@mui/material";
import { Link } from "react-router-dom";


export default function AllArticleCard({ article }) {
  const { author, authorImage, description, image, publisher, title, _id } =
    article;

   

  return (
    <Card
      sx={{
        maxWidth: { sm: "auto" },
        display: "flex",
        flexDirection: "column",
        backgroundColor: article?.isPremium ? "#a9927d" : "",
      }}
    >
      <CardHeader
        sx={{ bgcolor: "#a9927d" }}
        avatar={
          <Avatar sx={{ bgcolor: "#a9927d" }} aria-label="recipe">
            <img src={authorImage} alt="Author" />
          </Avatar>
        }
        title={publisher}
        subheader={`Author: ${author}`}
      />
      <CardMedia
        component="img"
        height="194"
        image={image}
        sx={{ height: 194 }}
        alt="Paella dish"
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography sx={{ flexGrow: 1 }} variant="body2" color="text.secondary">
          {description?.slice(0, 200)}... ...
        </Typography>
      </CardContent>
      <Link to={`/details/${_id}`}>
        <CardActions disableSpacing>
          <Button fullWidth variant="contained" color="secondary">
            Details
          </Button>
        </CardActions>
      </Link>
    </Card>
  );
}
