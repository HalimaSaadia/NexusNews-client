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
  const publishers = usePublisher()

  const {user} = useContext(AuthContext)
  const tagsOption = [
    { value: "politics", label: "Politics" },
    { value: "business", label: "business" },
    { value: "entertainment", label: "Entertainment" },
    { value: "sports", label: "Sports" },
  ];
  const publisherOption = publishers?.map(publisher => {
    const option = {value:publisher?.publisherName,label:publisher?.publisherName}
    return option
})
console.log(publisherOption);
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    axiosPublic
      .post(
        `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_image_api_key
        }`,
        { image: data.image[0] },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((res) => {
        console.log(res.data.data.display_url);
        const article = {
            user:user?.displayName,
            userImage:user?.photoURL,
            title:data.title,
            image:res?.data?.data?.display_url,
            publisher:data?.publisher.value,
            tag:data?.tags.value,
            description:data?.description,
            isPremium: false,
            state:'pending',
        }
        console.log(article);
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
                <TextField
                  {...register("title", { required: true })}
                  type="text"
                  label="title"
                  variant="standard"
                  sx={{ width: "48%" }}
                />
                {errors.title?.type === "required" && (
                  <Typography color="red">Title is require</Typography>
                )}
                <TextField
                  label="Article Image"
                  type="file"
                  variant="standard"
                  sx={{ width: "40%" }}
                  {...register("image", { required: true })}
                />
                {errors.image?.type === "required" && (
                  <Typography color="red">Image is require</Typography>
                )}
               
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

                <TextField
                  label="Description"
                  type="text"
                  {...register("description", { required: true })}
                  variant="standard"
                  fullWidth
                  multiline
                  rows={4}
                />
                {errors.tags?.type === "required" && (
                  <Typography color="red">Title is require</Typography>
                )}

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
