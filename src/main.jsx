import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import AuthProvider from "./provider/AuthProvider.jsx";
import { RouterProvider } from "react-router-dom";
import router from "./Routes/Routes.jsx";
import { Toaster } from "react-hot-toast";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { lime, purple } from "@mui/material/colors";



const theme = createTheme({
  palette: {
    primary: {
      main:"#0a0908"
    },
    secondary: {
      main: "#5e503f",
      light: "#a9927d"
    },
    tertiary: {
      main: "#a9927d"
    }
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </ThemeProvider>

    <Toaster />
  </React.StrictMode>
);
