
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useContext } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { FcGoogle } from "react-icons/fc";
import { Button, Card, TextField, Typography } from "@mui/material";

function Login() {
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
    <Card color="transparent" shadow={false} className="max-w-sm">
      <Typography variant="h4" color="blue-gray">
        Sign Up
      </Typography>
      <Typography color="gray" className="mt-1 font-normal">
        Nice to meet you! Enter your details to register.
      </Typography>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
      >
        <div className="mb-1 flex flex-col gap-6">
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Your Email
          </Typography>
          <TextField
            size="lg"
            placeholder="name@mail.com"
            {...register("email", { required: true })}
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          />
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Password
          </Typography>
          <TextField
            type="password"
            size="lg"
            {...register("password", { required: true })}
            placeholder="********"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          />
        </div>

        <Button type="submit" className="mt-6" fullWidth>
          sign up
        </Button>
        <Typography color="gray" className="mt-4 text-center font-normal">
          Don't have account?{" "}
          <Link to="/register" className="font-medium text-gray-900">
            Sign up
          </Link>
        </Typography>
      </form>
      <div className="flex items-center space-x-2  justify-center">
        <p>continue With </p>
        <button onClick={handleGoogleLogin}>
          <FcGoogle className="text-3xl" />
        </button>
      </div>
    </Card>
  );
}

export default Login;
