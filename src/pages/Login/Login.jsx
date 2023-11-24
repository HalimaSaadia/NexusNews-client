
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useContext } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { FcGoogle } from "react-icons/fc";
import { Box, Button, Card, CardMedia, ListItem, TextField, Typography } from "@mui/material";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

function Login() {
  const axiosPublic = useAxiosPublic()
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const { loginWithEmailAndPassword, loginWithGoogle } =
    useContext(AuthContext);

  const onSubmit = (data) => {
    const toastId = toast.loading("wait...");
    console.log("submitted");
    loginWithEmailAndPassword(data.email, data.password)
      .then((res) => {
        Swal.fire({
          icon: "success",
          title: "successfully Logged In",
        });
        toast.remove(toastId);
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: error.message,
        });
        toast.remove(toastId);
      });
  };

  const handleGoogleLogin = () => {
    const toastId = toast.loading("wait...");
    loginWithGoogle()
      .then((res) => {
        const user = {userName:res?.user?.displayName,
          userEmail:res?.user?.email,
          userImage:res?.user?.photoURL,
          role:"user",
          isPremiumTaken: false
        }
        axiosPublic.post("/create-user" ,user)
        .then(res=> console.log(res.data))
        Swal.fire({
          icon: "success",
          title: "successfully Logged In",
        });
        toast.remove(toastId);
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: error.message,
        });
        toast.remove(toastId);
      });
  };
  return (
    <Box sx={{minHeight: '100vh', display:'flex',alignItems:'center', justifyContent:'center'}}>
    <Card  sx={{ maxWidth: "900px",display: {xs:'block', md:'flex'} }}>
     <Box sx={{ display: "flex", flexDirection: "column" }}>
    
     <CardMedia
       component="img"
       sx={{height:"100%"}}
       image="https://media.istockphoto.com/id/1428321006/photo/glass-globe-on-newspapers.webp?b=1&s=170667a&w=0&k=20&c=JdSxI50uNGqcxj5wAoi-rlxe_P89CHFXi8fGPJMTXj4="
       alt="Live from space album cover"
     />
     </Box>
     <Box>
       <Typography variant="h4" textAlign="center">Sign In</Typography>
       <form onSubmit={handleSubmit(onSubmit)}>
         <Box sx={{ display: "flex", flexDirection: "column"}}>
          
           <TextField
             {...register("email", { required: true })}
             label="Enter Email"
             type="email"
             sx={{ m: 1, width: "300px" }}
             variant="standard"
           />
           <TextField
             {...register("password", { required: true })}
             type="password"
             label="Create Password"
             sx={{ m: 1, width: "300px" }}
             variant="standard"
           />
      
           <Button variant="contained" color="secondary" type="submit">Sign In</Button>
         </Box>
       </form>
       <Box>
        <Typography>Don't have Account<Link style={{color:'blue'}} to="/register">Sign Up</Link></Typography>
        <Typography>Continue With<Button onClick={handleGoogleLogin}><FcGoogle style={{fontSize:"30px"}}></FcGoogle></Button></Typography>
        
       </Box>
     </Box>
   </Card>
  </Box>
  );
}

export default Login;
