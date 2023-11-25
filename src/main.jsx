import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import AuthProvider from "./provider/AuthProvider.jsx";
import { RouterProvider } from "react-router-dom";
import router from "./Routes/Routes.jsx";
import { Toaster } from "react-hot-toast";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { lime, purple } from "@mui/material/colors";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";

const queryClient = new QueryClient();

const theme = createTheme({
  palette: {
    primary: {
      main: "#0a0908",
    },
    secondary: {
      main: "#5e503f",
      light: "#a9927d",
    },
    tertiary: {
      main: "#c6ac8f",
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </AuthProvider>
    </ThemeProvider>

    <Toaster />
  </React.StrictMode>
);
