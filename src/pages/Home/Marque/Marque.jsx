import { Box, Typography } from "@mui/material";
import Marquee from "react-fast-marquee";

const Marque = () => {
  return (
    <Box
      sx={{
        bgcolor: "secondary.main",
        color: "white",
        py: 1,
        fontSize: "22px",
      }}
    >
      <Marquee>
        🎇LIMITED TIME OFFER INSIDE: SAVE UPTO 40% DISCOUNT ON YOUR NEST
        SUBSCRIPTION🎇 <Typography color="secondary">whitespace</Typography>
        🎉ENJOY 50% DISCOUNT ON YOUR FIRST SUBSCRIPTION🎉{" "}
        <Typography color="secondary">whitespace</Typography>
      </Marquee>
    </Box>
  );
};

export default Marque;
