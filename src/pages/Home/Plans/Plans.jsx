import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import InboxIcon from "@mui/icons-material/Inbox";
import CircleIcon from "@mui/icons-material/Circle";
import {
  Container,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import SectionHeading from "../../../shared/SectionHeading/SectionHeading";

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

export default function Plans() {
  return (
    <Container>
      <SectionHeading title="OUR PLANS" />
      <Box sx={{ display: "flex", justifyContent: "center", py: 5 }}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              sm: "repeat(2, auto)",
              md: "repeat(3, auto)",
            },
            gap: 5,
          }}
        >
          <Card
            variant="outlined"
            sx={{ border: "2px solid #c6ac8f", maxWidth: 300 }}
          >
            <CardContent>
              <Button color="tertiary" variant="contained">
                Free For 1 month
              </Button>
              <Divider sx={{ py: 1 }} />
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Box>
                  {" "}
                  <Typography sx={{ fontWeight: 700 }} variant="h6">
                    Premium
                  </Typography>
                  <Typography sx={{ fontWeight: 700 }} variant="h6">
                    Individual
                  </Typography>
                </Box>
                <Box>
                  <Typography sx={{ fontWeight: 700 }} variant="h6">
                    Free
                  </Typography>
                  <Typography sx={{ fontWeight: 500 }}>For 1 month</Typography>
                </Box>
              </Box>

              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                <List>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <CircleIcon sx={{ fontSize: "small", mr: 1 }} />
                    <ListItemText secondary="One Premium account" />
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <CircleIcon sx={{ fontSize: "small", mr: 1 }} />
                    <ListItemText secondary="Cancel Anytime" />
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <CircleIcon sx={{ fontSize: "small", mr: 1 }} />
                    <ListItemText secondary="15 hours/month of listening time from our audio books" />
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <ListItemText secondary="&nbsp;" />
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <ListItemText secondary="&nbsp;" />
                  </Box>
                </List>
              </Typography>
              <Button
                variant="contained"
                sx={{ borderRadius: 10 }}
                color="tertiary"
                fullWidth
                size="small"
              >
                Try Free For 1 Month
              </Button>
            </CardContent>
            <Divider sx={{ pt: 1 }} />
            <CardActions>
              <Typography variant="body2">
                Free for 1 Month.Then $10.99/month. Offer only Available If have
                not tried premium before
                <br />
              </Typography>
            </CardActions>
          </Card>
          <Card
            variant="outlined"
            sx={{ border: "2px solid #8a7d6d", maxWidth: 300 }}
          >
            <CardContent>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Box>
                  {" "}
                  <Typography sx={{ fontWeight: 700 }} variant="h6">
                    Premium Duo
                  </Typography>
                </Box>
                <Box>
                  <Typography sx={{ fontWeight: 700 }} variant="h6">
                    $14.99
                  </Typography>
                  <Typography sx={{ fontWeight: 500 }}>per month</Typography>
                </Box>
              </Box>
              <Divider />
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Box>
                  {" "}
                  <Typography sx={{ fontWeight: 700 }} variant="h6">
                    {"\u00A0"}
                  </Typography>
                  <Typography sx={{ fontWeight: 700 }} variant="h6">
                    {"\u00A0"}
                  </Typography>
                </Box>
                <Box>
                  <Typography sx={{ fontWeight: 700 }} variant="h6">
                    {"\u00A0"}
                  </Typography>
                  <Typography sx={{ fontWeight: 500 }}>{"\u00A0"}</Typography>
                </Box>
              </Box>

              <Typography
                sx={{ mb: 1.5, display: "flex", flexDirection: "column" }}
                color="text.secondary"
              >
                <List sx={{ flexGrow: "1" }}>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <CircleIcon sx={{ fontSize: "small", mr: 1 }} />
                    <ListItemText secondary="Two Premium account" />
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <CircleIcon sx={{ fontSize: "small", mr: 1 }} />
                    <ListItemText secondary="Cancel Anytime" />
                  </Box>
                  <Box
                    sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}
                  >
                    <CircleIcon sx={{ fontSize: "small", mr: 1 }} />
                    <ListItemText secondary="15 hours/month of listening time from our audio books(plan manager only)" />
                  </Box>
                  <Box
                    sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}
                  >
                   
                    <ListItemText secondary="&nbsp;" />
                  </Box>
                  <Box
                    sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}
                  >
                   
                    <ListItemText secondary="&nbsp;" />
                  </Box>
                </List>
              </Typography>
              <Button
                variant="contained"
                sx={{ borderRadius: 10 }}
                color="secondary"
                fullWidth
                size="small"
              >
                Get Premium Duo
              </Button>
            </CardContent>
            <Divider sx={{ pt: 1 }} />
            <CardActions>
              <Typography variant="body2">
                For couples who resides at the same address. Terms apply.
              </Typography>
            </CardActions>
          </Card>
          <Card
            variant="outlined"
            sx={{ border: "2px solid #0a0908", maxWidth: 300 }}
          >
            <CardContent>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Box>
                  {" "}
                  <Typography sx={{ fontWeight: 700 }} variant="h6">
                    Premium Family
                  </Typography>
                </Box>
                <Box>
                  <Typography sx={{ fontWeight: 700 }} variant="h6">
                    $16.99
                  </Typography>
                  <Typography sx={{ fontWeight: 500 }}>per month</Typography>
                </Box>
              </Box>
              <Divider />
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Box>
                  {" "}
                  <Typography sx={{ fontWeight: 700 }} variant="h6">
                    {"\u00A0"}
                  </Typography>
                  <Typography sx={{ fontWeight: 700 }} variant="h6">
                    {"\u00A0"}
                  </Typography>
                </Box>
                <Box>
                  <Typography sx={{ fontWeight: 700 }} variant="h6">
                    {"\u00A0"}
                  </Typography>
                  <Typography sx={{ fontWeight: 500 }}>{"\u00A0"}</Typography>
                </Box>
              </Box>

              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                <List>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <CircleIcon sx={{ fontSize: "small", mr: 1 }} />
                    <ListItemText secondary="Upto 6 Premium account" />
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <CircleIcon sx={{ fontSize: "small", mr: 1 }} />
                    <ListItemText secondary="Block Explicit music" />
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <CircleIcon sx={{ fontSize: "small", mr: 1 }} />
                    <ListItemText secondary="Access to spotify kids" />
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <CircleIcon sx={{ fontSize: "small", mr: 1 }} />
                    <ListItemText secondary="Cancel Anytime" />
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <CircleIcon sx={{ fontSize: "small", mr: 1 }} />
                    <ListItemText secondary="15 hours/month of listening time from our audio books(plan manager only)" />
                  </Box>
                </List>
              </Typography>
              <Button
                variant="contained"
                sx={{ borderRadius: 10 }}
                color="primary"
                fullWidth
                size="small"
              >
                Get Premium Duo
              </Button>
            </CardContent>
            <Divider sx={{ pt: 1 }} />
            <CardActions>
              <Typography variant="body2">
                For 6 Family member who resides at the same address
                <br />
              </Typography>
            </CardActions>
          </Card>
        </Box>
      </Box>
    </Container>
  );
}
