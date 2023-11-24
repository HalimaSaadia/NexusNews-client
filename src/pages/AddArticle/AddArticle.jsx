import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Box, Button, TextField } from "@mui/material";

import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import "./addArcticle.css";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

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
  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];


  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    axiosPublic.post()
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
            image="/static/images/cards/contemplative-reptile.jpg"
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
                <TextField
                  label="Standard"
                  variant="standard"
                  sx={{ width: "48%" }}
                />
                <Controller
                  control={control}
                  name="tags"
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      className="tags"
                      styles={selectStyle}
                      options={options}
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
                      className="tags"
                      styles={selectStyle}
                      options={options}
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
