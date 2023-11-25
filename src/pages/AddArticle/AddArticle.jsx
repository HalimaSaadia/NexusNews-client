import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Box, Button, TextField } from "@mui/material";

import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import "./addArcticle.css";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useContext } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import usePublisher from "../../Hooks/usePublisher";
import Swal from "sweetalert2";
import toast from "react-hot-toast";

const selectStyle = {
  control: (base, state) => ({
    ...base,
    border: state.isFocused ? "none" : "none",
    outline: state.isFocused ? "none" : "none",
    "&:focus": {
      border: "none",
      outline: "none",
    },
  }),
};

export default function AddArticle() {
  const axiosPublic = useAxiosPublic();
  const publishers = usePublisher();

  const { user } = useContext(AuthContext);
  const tagsOption = [
    { value: "politics", label: "Politics" },
    { value: "business", label: "business" },
    { value: "entertainment", label: "Entertainment" },
    { value: "sports", label: "Sports" },
  ];
  const publisherOption = publishers?.map((publisher) => {
    const option = {
      value: publisher?.publisherName,
      label: publisher?.publisherName,
    };
    return option;
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm();

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
      )
      .then((res) => {
        const article = {
          author: user?.displayName,
          authorImage: user?.photoURL,
          title: data.title,
          image: res?.data?.data?.display_url,
          publisher: data?.publisher.value,
          tag: data?.tags.value,
          description: data?.description,
          isPremium: false,
          state: "approved",
          viewCount: 0,
        };
        axiosPublic
          .post("articles", article)
          .then((res) => {
            if (res.data.insertedId) {
              Swal.fire({
                icon: "success",
                confirmButtonColor: "#5e503f",
                title: "Article Submitted successfully",
                text: "Have patience until approved",
              });
            }
            toast.remove(toastId);
          })
          .catch((error) => {
            Swal.fire({
              icon: "error",
              confirmButtonColor: "#5e503f",
              title: error.message,
              text: error.message,
            });
            toast.remove(toastId);
          });
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
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card sx={{ maxWidth: 700 }}>
        <CardContent>
          <CardMedia
            component="img"
            image="https://media.istockphoto.com/id/1428321006/photo/glass-globe-on-newspapers.webp?b=1&s=170667a&w=0&k=20&c=JdSxI50uNGqcxj5wAoi-rlxe_P89CHFXi8fGPJMTXj4="
            alt="green iguana"
          />
          <CardContent>
            <Typography
              gutterBottom
              textAlign="center"
              variant="h5"
              component="div"
            >
              Add Article
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
                <Box sx={{ width: "48%" }}>
                  <TextField
                    {...register("title", { required: true })}
                    type="text"
                    label="title"
                    variant="standard"
                    fullWidth
                    // sx={{ width: "48%" }}
                  />
                  {errors.title?.type === "required" && (
                    <Typography color="red">Title is require</Typography>
                  )}
                </Box>

                <Box sx={{ width: "40%" }}>
                  <TextField
                    label="Article Image"
                    type="file"
                    variant="standard"
                    fullWidth
                    {...register("image", { required: true })}
                  />
                  {errors.image?.type === "required" && (
                    <Typography color="red">Image is require</Typography>
                  )}
                </Box>

                <Controller
                  control={control}
                  name="tags"
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      className="tags"
                      placeholder="select tag"
                      styles={selectStyle}
                      options={tagsOption}
                    />
                  )}
                />

                <Controller
                  name="publisher"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      placeholder="select publisher"
                      className="tags"
                      styles={selectStyle}
                      options={publisherOption}
                    />
                  )}
                />

                <Box  sx={{width: '100%'}}>
                  <TextField
                    label="Description"
                    type="text"
                    {...register("description", { required: true })}
                    variant="standard"
                    sx={{width: '100%'}}
                    multiline
                    rows={4}
                  />
                  {errors.tags?.type === "required" && (
                    <Typography color="red">Description is require</Typography>
                  )}
                </Box>

                <Button
                  fullWidth
                  color="secondary"
                  variant="contained"
                  type="submit"
                >
                  Add Article
                </Button>
              </Box>
            </form>
          </CardContent>
        </CardContent>
      </Card>
    </Box>
  );
}
