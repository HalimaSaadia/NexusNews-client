import { Box, Paper, Typography } from "@mui/material";
import { Typewriter } from "react-simple-typewriter";

const SectionHeading = ({ title }) => {
  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        alignItems: "center",
        gap:2,
      
      }}
    >
     
      <Typography fontWeight={700} sx={{fontSize: "24px", textAlign:"left" }}>
        {title}
      </Typography>
      <Box sx={{display:{xs:"none", sm:"flex"}}} style={{  flex: "1 1 0%" }} >
      <hr style={{  flex: "1 1 0%" }}  />
      </Box>
      
    </Box>
  );
};

export default SectionHeading;
