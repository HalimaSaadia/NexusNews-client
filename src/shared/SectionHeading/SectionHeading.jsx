import { Box, Paper, Typography } from "@mui/material";
import { Typewriter } from "react-simple-typewriter";


const SectionHeading = ({title}) => {
    return (
        <Box sx={{display:'flex',justifyContent:'center',pt:10}}>
            <Paper sx={{display:'inline-block',py:1,px:5,borderRadius:10}}elevation={3}>
              
            <Typography variant="h4"  fontWeight={700}>  <Typewriter words={[title]} loop={false} typeSpeed={200} />&nbsp;</Typography>
        </Paper>
        </Box>
    );
};

export default SectionHeading;