import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useContext } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { FcGoogle } from "react-icons/fc";
import {
  Box,
  Button,
  Card,
  CardMedia,
  ListItem,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

function Login() {
  const axiosPublic = useAxiosPublic();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const { loginWithEmailAndPassword, loginWithGoogle } =
    useContext(AuthContext);
    const location = useLocation()
    const navigate = useNavigate()

  const onSubmit = (data) => {
    const toastId = toast.loading("wait...");
    console.log("submitted");
    loginWithEmailAndPassword(data.email, data.password)
      .then((res) => {
        Swal.fire({
          icon: "success",
          confirmButtonColor: "#5e503f",
          title: "successfully Logged In",
        });
        toast.remove(toastId);
        navigate(location?.state ? location.state : "/")
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          confirmButtonColor: "#5e503f",
          title: error.message,
        });
        toast.remove(toastId);
      });
  };

  const handleGoogleLogin = () => {
    const toastId = toast.loading("wait...");
    loginWithGoogle()
      .then((res) => {
        const user = {
          userName: res?.user?.displayName,
          userEmail: res?.user?.email,
          userImage: res?.user?.photoURL,
          role: "user",
          isPremiumTaken: false,
        };
        axiosPublic
          .post("/create-user", user)
          .then((res) => console.log(res.data));
        Swal.fire({
          icon: "success",
          confirmButtonColor: "#5e503f",
          title: "successfully Logged In",
        });
        toast.remove(toastId);
        navigate(location?.state ? location.state : "/")
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          confirmButtonColor: "#5e503f",
          title: error.message,
        });
        toast.remove(toastId);
      });
  };
  return (
    <Box
      sx={{
        minHeight: "90vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
     <Paper elevation={3} sx={{p:5}}>
     <Box sx={{width:450}}>
        <Typography fontWeight={700} variant="h4" textAlign="center">
          Sign In
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <TextField
              {...register("email", { required: true })}
              label="Enter Email"
              type="email"
              sx={{ m: 1}}
              variant="standard"
            />
            <TextField
              {...register("password", { required: true })}
              type="password"
              label="Create Password"
              sx={{ m: 1 }}
              variant="standard"
            />

            <Button sx={{mt:2}} variant="contained" color="secondary" type="submit">
              Sign In
            </Button>
          </Box>
        </form>
        <Box sx={{mt:2}}>
          <Typography align="center">
            Don't have Account? 
            <Link style={{ color: "blue",marginLeft:"5px" }} to="/register">
              Sign Up
            </Link>
          </Typography>
          <Typography align="center">
            Continue With
            <Button onClick={handleGoogleLogin}>
              <FcGoogle style={{ fontSize: "30px" }}></FcGoogle>
            </Button>
          </Typography>
        </Box>
      </Box>
     </Paper>
    </Box>
  );
}

export default Login;
