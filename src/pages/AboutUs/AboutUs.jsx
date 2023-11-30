import {
  Avatar,
  Box,
  Divider,
  Grid,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet";
import YouTubeIcon from "@mui/icons-material/YouTube";
import FacebookTwoToneIcon from "@mui/icons-material/FacebookTwoTone";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import EmailIcon from "@mui/icons-material/Email";
import InstagramIcon from "@mui/icons-material/Instagram";

const AboutUs = () => {
  const position = [51.505, -0.09];
  return (
    <Grid container>
      <Grid item md={3} sx={{ height: "90vh", bgcolor: "secondary.main", }}>
        <Box
          sx={{
            height: "100%",
            display: "flex",
            overflow:scroll,
            flexDirection: "column",
          }}
        >
          <Box sx={{ flexGrow: 1 }}>
            <ListItemButton component="ul" href="#simple-list">
              <Box>
                <Typography variant="h6" sx={{ color: "white" }}>
                  Office Hours
                </Typography>
                <Typography sx={{ color: "tertiary.main" }}>
                  Monday-Friday
                  <br />
                  9:00AM to 5:00PM
                  <br />
                  Lunch Break 12:00AM - 1:00 PM
                  <br />
                  Closed on weekends and public holidays
                </Typography>
              </Box>
            </ListItemButton>
            <Divider sx={{ borderColor: "tertiary.main" }} />
            <ListItemButton component="ul" href="#simple-list">
              <Box>
                <Typography variant="h6" sx={{ color: "white" }}>
                  Address
                </Typography>
                <Typography sx={{ color: "tertiary.main" }}>
                  123 Main Street
                  <br />
                  Cityville state
                  <br />
                  Zip Code:64458
                  <br />
                  Bangladesh
                </Typography>
              </Box>
            </ListItemButton>
            <Divider sx={{ borderColor: "tertiary.main" }} />
            <ListItemButton component="ul" href="#simple-list">
              <Box>
                <Typography variant="h6" sx={{ color: "white" }}>
                  Key Personnel
                </Typography>

                <Box sx={{display:"flex",alignItems:"center",gap:2,mt:1}}>
                  <Avatar alt="Remy Sharp" src="https://images.pexels.com/photos/9835442/pexels-photo-9835442.jpeg?auto=compress&cs=tinysrgb&w=600" />

                  <Typography sx={{ color: "tertiary.main" }}>
                  <span style={{color:"#eae0d5",fontWeight:500,fontSize:"20px"}}> Sarah L.</span>
                    <br />
                   Chief Reporter
                  </Typography>
                </Box>
                <Box sx={{display:"flex",alignItems:"center",gap:2,mt:1}}>
                  <Avatar alt="Remy Sharp" src="https://images.pexels.com/photos/7103081/pexels-photo-7103081.jpeg?auto=compress&cs=tinysrgb&w=600" />

                  <Typography sx={{ color: "tertiary.main" }}>
                  <span style={{color:"#eae0d5",fontWeight:500,fontSize:"20px"}}> Tailor B.</span>
                    <br />
                   Chief Editor
                  </Typography>
                </Box>
              </Box>
            </ListItemButton>
           
          </Box>
          <Box>
            <Divider sx={{ borderColor: "tertiary.main" }} />
            <Box p={2}>
              <Typography
                sx={{
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                }}
                color="tertiary.main"
              >
                <YouTubeIcon color="white" fontSize="large" />{" "}
                <FacebookTwoToneIcon fontSize="large" />{" "}
                <LinkedInIcon fontSize="large" />
                <EmailIcon fontSize="large" />
                <InstagramIcon fontSize="large" />
              </Typography>
            </Box>
          </Box>
        </Box>
      </Grid>
      <Grid item md={9}>
        <MapContainer
          style={{ height: "90vh", zIndex: -50 }}
          center={position}
          zoom={13}
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <Marker position={position}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        </MapContainer>
      </Grid>
    </Grid>
  );
};

export default AboutUs;
