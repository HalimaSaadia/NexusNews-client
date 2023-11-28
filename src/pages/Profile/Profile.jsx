import { Avatar, Box, Button, TextField, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import { useContext, useState } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Modal from "react-modal";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import Loader from "../../shared/Loader/Loader";


const modalStyle = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "50%",
  },
};

const Profile = () => {
  const { user, loading } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic()
  const navigate = useNavigate()
 
  let subtitle;
  const [modalIsOpen, setIsOpen] = useState(false);
  const {logout} = useContext(AuthContext)

  const {
    isPending: profileLoading,
    data: userInfo,
    refetch,
  } = useQuery({
    queryKey: ["profileInfo"],
    enabled: !loading,
    queryFn: async () => {
      const result = await axiosSecure.get(`/user/${user?.email}`);
      return result.data;
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm();

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    subtitle.style.color = "#f00";
  }

  function closeModal() {
    setIsOpen(false);
  }

  const onSubmit = (data) => {
    const toastId = toast.loading("Creating...");
   
        const formData = new FormData();
        formData.append("image", data.image[0]);
        axiosPublic
          .post(
            `https://api.imgbb.com/1/upload?key=${
              import.meta.env.VITE_image_api_key
            }`,
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          ).then(res => {
            const updatedImage = res?.data?.data?.display_url
            const updatedName = data?.name
            axiosSecure.patch(`/update-user/${user?.email}`, {updatedImage,updatedName})
            .then(res => {
              Swal.fire({
                icon: "success",
                confirmButtonColor: "#5e503f",
                title: "Successfully Updated",
                
              })
              toast.remove(toastId)
              refetch()
              closeModal()
            }).catch(error=> {
              Swal.fire({
                icon: "error",
                confirmButtonColor: "#5e503f",
                title: error.message,
              })
              toast.remove(toastId)
            })
          }).catch(error => {
            Swal.fire({
              icon: "error",
              confirmButtonColor: "#5e503f",
              title: error.message,
            })
            toast.remove(toastId)
          })
  };

  const handleLogout =()=> {
    const toastId = toast.loading("loading...")
    logout()
    .then(res => {
      Swal.fire({
        icon:"success",
        title:"Successfully logout",
        confirmButtonColor:"#5e503f",
      })
      toast.remove(toastId)
      navigate("/login")
    }).catch(error=> {
      Swal.fire({
        icon:"error",
        title:error.message,
        confirmButtonColor:"#5e503f",
      })
      toast.remove(toastId)
      
    })
  }
  if(profileLoading){
    return <Loader />
  }

  return (
    <Box
      sx={{
        minHeight: "90vh",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        variant="elevation"
        sx={{
          display: "flex",
          flexWrap: "wrap",
          "& > :not(style)": {
            m: 1,
            px: 5,
            py: 2,
          },
         
        }}
      >
        <Paper elevation={3} sx={{ width:500}}>
          <Box>
            <Avatar
              alt="Remy Sharp"
              src={userInfo?.userImage}
              sx={{
                width: 126,
                height: 126,
                mx: "auto",
                background: "#c6ac8f",
              }}
              variant="elevation"
            />
          </Box>
          <Typography align="center" sx={{ mx: "auto", my: 2 }} variant="h4">
            {userInfo?.userName}
          </Typography>
          <Typography align="center" sx={{ mx: "auto" }} variant="h5">
            {userInfo?.userEmail}
          </Typography>
          <Box align="center" sx={{ py: 2 }}>
            <Button onClick={openModal} variant="contained" color="secondary">
              Edit Information
            </Button>
            <br />
            <Button onClick={handleLogout} sx={{mt:3,fontWeight:600}} variant="contained" color="tertiary">
              Logout
            </Button>
            <Box>
              <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={modalStyle}
                contentLabel="Example Modal"
              >
                <button onClick={closeModal}>x</button>

                <form onSubmit={handleSubmit(onSubmit)}>
                  <Box>
                    <Box>
                      <TextField
                        {...register("name", { required: true })}
                        type="text"
                        label="name"
                        variant="standard"
                        fullWidth
                        defaultValue={userInfo?.userName}
                      />
                      {errors.title?.type === "required" && (
                        <Typography color="red">Name is require</Typography>
                      )}
                    </Box>

                    <Box>
                      <TextField
                        label="Article Image"
                        type="file"
                        variant="standard"
                        fullWidth
                        sx={{my:2}}
                        {...register("image", { required: true })}
                      />
                      {errors.image?.type === "required" && (
                        <Typography color="red">Image is require</Typography>
                      )}
                    </Box>
                    <Button
                      fullWidth
                      color="secondary"
                      variant="contained"
                      type="submit"
                      sx={{mt:2}}
                    >
                      Update
                    </Button>
                  </Box>
                </form>
              </Modal>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export default Profile;
