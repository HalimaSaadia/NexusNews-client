import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import {
  Avatar,
  Button,
  ButtonGroup,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
} from "@mui/material";

export default function ArticleCard({ article }) {
  const theme = useTheme();

  return (
    <Paper elevation={3} sx={{ width: "100%", display: "flex", mt: 5, height: "300px" }}>
      <CardMedia
        component="img"
        sx={{ width: "50%", objectFit: "fill" }}
        image={article?.image}
        alt="Live from space album cover"
      />
      <Box sx={{ display: "flex", flexDirection: "column", width: "50%" }}>
        <Box>
          <List sx={{ p: 0 }}>
            <ListItem sx={{ backgroundColor: "tertiary.main" }} disablePadding>
              <ListItemButton>
                <ListItemIcon></ListItemIcon>
                <Box>
                  <ListItemText primary={article?.title} />
                </Box>
              </ListItemButton>
            </ListItem>
            <Divider />

            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <Avatar alt="Remy Sharp" src={article?.authorImage} />
                </ListItemIcon>
                <Box>
                  <ListItemText primary={article?.author} />
                  <ListItemText secondary={article?.authorEmail} />
                </Box>
              </ListItemButton>
            </ListItem>
            <Divider />

            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <AutoStoriesIcon />
                </ListItemIcon>

                <Box>
                  <ListItemText primary={article?.publisher} />
                  <ListItemText secondary={article?.postedDate} />
                </Box>
              </ListItemButton>
            </ListItem>
            <Divider />

            <ListItem disablePadding>
              <ListItemButton>
               
                <Box>
                <ListItemText primary={`Status: ${article?.state}`} />
                  <ButtonGroup
                    disableElevation
                    variant="contained"
                    aria-label="Disabled elevation buttons"
                  >
                    <Button color="secondary">Approve</Button>
                    <Button>Decline</Button>
                  </ButtonGroup>
                </Box>
                <Box sx={{ ml:2 }}>
                <ListItemText primary={`isPremium: ${article?.isPremium ? "Yes":"No"}`} />
                  <ButtonGroup
                    disableElevation
                    variant="contained"
                    aria-label="Disabled elevation buttons"
                  >
                    <Button color="tertiary">Premium</Button>
                    <Button sx={{backgroundColor: "#C80000"}}>Delete</Button>
                  </ButtonGroup>
                </Box>
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Box>
    </Paper>
  );
}
