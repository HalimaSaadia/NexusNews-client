import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useContext } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import axios from "axios";
import { Box, Button, Card, ListItem, TextField, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
// import { AccountCircle } from "@mui/icons-material";

function Register() {
  const { createUser, updateUserProfile } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic()
  const theme = useTheme();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const toastId = toast.loading("creating....");

    // const image =
    try {
      const result = await axios.post(
        `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_image_api_key
        }`,
        { image: data.image[0] },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const profileImage = result?.data?.data?.display_url
      const user = {userName:data?.name,
        userEmail:data?.email,
        userImage:profileImage}

      createUser(data.email, data.password)
        .then((res) => {
          axiosPublic.post("/create-user" ,user)
          .then(res=> console.log(res.data))
          updateUserProfile(data.name, profileImage).then(
            () => {}
          );
          Swal.fire({
            icon: "success",
            title: "User Created",
          });
       
          toast.remove(toastId);
        })
        .catch((err) => {
          Swal.fire({
            icon: "error",
            title: err.message,
          });
          toast.remove(toastId);
        });
      toast.remove(toastId);
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: error.response.data.error.message,
      });
      toast.remove(toastId);
    }
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
        <Typography variant="h4" textAlign="center">Sign Up</Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box sx={{ display: "flex", flexDirection: "column"}}>
            <TextField
              {...register("name", { required: true })}
              label="Your Name"
              sx={{ m: 1, width: "300px" }}
              variant="standard"
            />
            <TextField
              {...register("email", { required: true })}
              label="Enter Email"
              type="email"
              sx={{ m: 1, width: "300px" }}
              variant="standard"
            />
            <TextField
              {...register("password", { required: true, pattern:/^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9]).{6,}$/i })}
              type="password"
              label="Create Password"
              sx={{ m: 1, width: "300px" }}
              variant="standard"
            />
            {errors.password?.type === 'pattern' && <Typography color="red">
            <ListItem>password must have at least 6 character</ListItem>
              <ListItem>password must have one uppercase</ListItem>
              <ListItem>password must have one numeric character</ListItem>
              <ListItem>password must have one special character</ListItem>
              </Typography>}
            <TextField
              {...register("image", { required: true })}
              type="file"
              sx={{ m: 1, width: "300px"}}
              
              variant="standard"
            />
            <Button variant="contained" color="secondary" type="submit">Sign Up</Button>
          </Box>
        </form>
      </Box>
    </Card>
   </Box>

    // <Card color="transparent" shadow={false}>
    //   <Typography variant="h4" color="blue-gray">
    //     Sign Up
    //   </Typography>
    //   <Typography color="gray" className="mt-1 font-normal">
    //     Nice to meet you! Enter your details to register.
    //   </Typography>
    //   <form
    //     onSubmit={handleSubmit(onSubmit)}
    //     className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
    //   >
    //     <Box className="mb-1 flex flex-col gap-6">
    //       <Typography variant="h6" color="blue-gray" className="-mb-3">
    //         Your Name
    //       </Typography>
    //       <TextField
    //         size="lg"
    //         placeholder="name@mail.com"
    //         {...register("name", { required: true })}
    //         className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
    //         labelProps={{
    //           className: "before:content-none after:content-none",
    //         }}
    //       />
    //       <Typography variant="h6" color="blue-gray" className="-mb-3">
    //         Your Email
    //       </Typography>
    //       <TextField
    //         size="lg"
    //         placeholder="name@mail.com"
    //         {...register("email", { required: true })}
    //         className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
    //         labelProps={{
    //           className: "before:content-none after:content-none",
    //         }}
    //       />
    //       <Typography variant="h6" color="blue-gray" className="-mb-3">
    //         Password
    //       </Typography>
    //       <TextField
    //         type="password"
    //         size="lg"
    //         {...register("password", { required: true })}
    //         placeholder="********"
    //         className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
    //         labelProps={{
    //           className: "before:content-none after:content-none",
    //         }}
    //       />
    //       <Typography variant="h6" color="blue-gray" className="-mb-3">
    //         Profile Image
    //       </Typography>
    //       <TextField
    //         type="file"
    //         size="lg"
    //         accept="image/*"
    //         {...register("image", { required: true })}
    //         placeholder="********"
    //         className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
    //         labelProps={{
    //           className: "before:content-none after:content-none",
    //         }}
    //       />
    //     </Box>

    //     <Typography type="submit" className="mt-6" fullWidth>
    //       sign up
    //     </Typography>
    //     <Typography color="gray" className="mt-4 text-center font-normal">
    //       Already have an account?{" "}
    //       <Link to="/login" className="font-medium text-gray-900">
    //         Sign In
    //       </Link>
    //     </Typography>
    //   </form>
    // </Card>
  );
}

export default Register;
