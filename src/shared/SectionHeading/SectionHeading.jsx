import { Box, Paper, Typography } from "@mui/material";
import { Typewriter } from "react-simple-typewriter";

const SectionHeading = ({ title }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        width: "100%",
        alignItems: "center",
        gap:2
      }}
    >
      <hr style={{ border: "1px solid black", flex: "1 1 0%" }} />
      <Typography variant="h4" fontWeight={700}>
        {title}
      </Typography>
      <hr style={{ border: "1px solid black", flex: "1 1 0%" }} />
    </Box>
  );
};

export default SectionHeading;
