import { Box, Button, Paper } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",

          "& > :not(style)": {
            m: 1,
            width: 400,
            height: 300,
          },
        }}
      >
        <Paper
          sx={{
            backgroundImage:
              "url('https://www.shutterstock.com/image-vector/404-error-page-explorer-man-260nw-2161180329.jpg')",
            backgroundRepeat: "no-repeat",
            display: "flex",
        justifyContent: "center",
        alignItems: "end",
        pb:1
          }}
          elevation={3}
        >
           <Link to="/"> <Button sx={{width:'115%'}} variant="contained" color="secondary">Go Back Home</Button></Link>
        </Paper>
      </Box>
    </Box>
  );
};

export default ErrorPage;
