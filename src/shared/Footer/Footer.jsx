import { Box, Container, Grid, Typography } from "@mui/material";
import AutoStoriesIcon from '@mui/icons-material/AutoStories';

const Footer = () => {
  return (
    <Box sx={{ backgroundColor: "primary.main",py:5}} >
      <Container>
        <Grid container>
          <Grid
         
            item
            xs={12}
            sm={6}
            md={3}

            
          >
           
            <AutoStoriesIcon sx={{fontSize:'80px', color:'white',pb:2,transform:'rotate(-15deg)',marginLeft:'20px'}} />
            <Typography variant="h5" color="white">NexusNews</Typography>
          </Grid>
          <Grid
            sx={{  }}
            item
            xs={12}
            sm={6}
            md={3}
            lg={3}
          >
            <ul style={{color:'#c6ac8f'}}>
                <li style={{color:'white',paddingBottom:'10px',cursor:'pointer',fontSize:'22px'}}>Services</li>
                <li style={{cursor:'pointer', marginBottom:'3px'}}>Branding</li>
                <li style={{cursor:'pointer', marginBottom:'3px'}}>Design</li>
                <li style={{cursor:'pointer', marginBottom:'3px'}}>Marketing</li>
                <li style={{cursor:'pointer', marginBottom:'3px'}}>Advertising</li>
            </ul>
          </Grid>
          <Grid
            sx={{marginTop:{sm:'20px',md:'auto'}}}
            item
            xs={12}
            sm={6}
            md={3}
  
          >
           <ul style={{color:'#c6ac8f'}}>
                <li style={{color:'white',paddingBottom:'10px',cursor:'pointer',fontSize:'22px'}}>Company</li>
                <li style={{cursor:'pointer', marginBottom:'3px'}}>About Us</li>
                <li style={{cursor:'pointer', marginBottom:'3px'}}>Contact</li>
                <li style={{cursor:'pointer', marginBottom:'3px'}}>Job</li>
                <li style={{cursor:'pointer', marginBottom:'3px'}}>Press kit</li>
            </ul>
          </Grid>
          <Grid
            sx={{marginTop:{sm:'20px',md:'auto'}}}
            item
            xs={12}
            sm={6}
            md={3}
            // lg={3}
          >
             <ul style={{color:'#c6ac8f'}}>
                <li style={{color:'white',paddingBottom:'10px',cursor:'pointer',fontSize:'22px'}}>Legal</li>
                <li style={{cursor:'pointer', marginBottom:'3px'}}>Terms of use</li>
                <li style={{cursor:'pointer', marginBottom:'3px'}}>Privacy policy</li>
                <li style={{cursor:'pointer', marginBottom:'3px'}}>Cookie policy</li>
            </ul>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;
