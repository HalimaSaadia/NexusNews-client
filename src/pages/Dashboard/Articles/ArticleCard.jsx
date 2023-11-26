import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";

import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import {
  Avatar,
  Badge,
  Button,
  ButtonGroup,
  CardMedia,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
} from "@mui/material";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import DeclineModal from "./DeclineModal";

export default function ArticleCard({ article, refetch }) {
  const theme = useTheme();
  let subtitle;
  const axiosSecure = useAxiosSecure();

  const [modalIsOpen, setIsOpen] = React.useState(false);
  function openModal() {
    setIsOpen(true);
  }
  function afterOpenModal() {
    subtitle.style.color = "#f00";
  }

  function closeModal() {
    setIsOpen(false);
  }

  const handleApprove = () => {
    const toastId = toast.loading("wait...");
    axiosSecure
      .patch(`/approve-state/${article._id}`)
      .then((res) => {
        console.log(res.data);
        if (res.data.modifiedCount) {
          Swal.fire({
            icon: "success",
            title: "Article is approved",
            confirmButtonColor: "#5e503f",
          });
          refetch();
          toast.remove(toastId);
        } else {
          Swal.fire({
            icon: "info",
            title: "Article has been previously approved",
            confirmButtonColor: "#5e503f",
          });
          toast.remove(toastId);
        }
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: err.message,
          confirmButtonColor: "#5e503f",
        });
        toast.remove(toastId);
      });
  };
  const handleIsPremium = () => {
    const toastId = toast.loading("wait...");
    axiosSecure
      .patch(`/make-premium/${article._id}`)
      .then((res) => {
        console.log(res.data);
        if (res.data.modifiedCount) {
          Swal.fire({
            icon: "success",
            title: "Article is Premium Now",
            confirmButtonColor: "#5e503f",
          });
          refetch();
          toast.remove(toastId);
        } else {
          Swal.fire({
            icon: "info",
            title: "Article has been previously Premium",
            confirmButtonColor: "#5e503f",
          });
          toast.remove(toastId);
        }
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: err.message,
          confirmButtonColor: "#5e503f",
        });
        toast.remove(toastId);
      });
  };
  const handleDelete = () => {
    const toastId = toast.loading("wait...");
    axiosSecure
      .delete(`/delete-article/${article._id}`)
      .then((res) => {
        console.log(res.data);
        Swal.fire({
          icon: "success",
          title: "Article id Deleted",
          confirmButtonColor: "#5e503f",
        });
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: err.message,
          confirmButtonColor: "#5e503f",
        });
        toast.remove(toastId);
      });
  };

  const showDeclineMessage=()=>{
    Swal.fire({
      text: article?.declineMessage,
      confirmButtonColor: "#5e503f",
    })
  }
  return (
    <Paper
      elevation={3}
      sx={{ maxWidth: "900px", display: "flex", mt: 5, height: "300px" }}
    >
      <CardMedia
        component="img"
        sx={{ width: "50%" }}
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
                  <ListItemText>
                    {article?.state === "declined" ? (
                      <>
                       Declined
                        <Badge
                          color="secondary"
                          badgeContent="Reason"
                          onClick={showDeclineMessage}
                         sx={{ml:5}}
                        ></Badge>
                      </>
                    ) : (
                      article?.state
                    )}
                  </ListItemText>
                  <ButtonGroup
                    disableElevation
                    variant="contained"
                    aria-label="Disabled elevation buttons"
                  >
                    <Button onClick={handleApprove} color="secondary">
                      Approve
                    </Button>
                    <Button onClick={openModal}>Decline</Button>
                  </ButtonGroup>
                </Box>
                <Box sx={{ ml: 2 }}>
                  <ListItemText
                    primary={`isPremium: ${article?.isPremium ? "Yes" : "No"}`}
                  />
                  <ButtonGroup
                    disableElevation
                    variant="contained"
                    aria-label="Disabled elevation buttons"
                  >
                    <Button onClick={handleIsPremium} color="tertiary">
                      Premium
                    </Button>
                    <Button
                      onClick={handleDelete}
                      sx={{ backgroundColor: "#C80000" }}
                    >
                      Delete
                    </Button>
                  </ButtonGroup>
                </Box>
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Box>
      <DeclineModal
        refetch={refetch}
        id={article?._id}
        modalIsOpen={modalIsOpen}
        afterOpenModal={afterOpenModal}
        closeModal={closeModal}
      />
    </Paper>
  );
}
