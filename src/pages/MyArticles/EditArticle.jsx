import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import React, { useContext } from 'react';
import { Controller, useForm } from 'react-hook-form';
import Select from "react-select";
import Modal from 'react-modal';
import usePublisher from '../../Hooks/usePublisher';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';
import { AuthContext } from '../../provider/AuthProvider';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import CloseIcon from '@mui/icons-material/Close';

const modalStyle = {
  content: {
    top: '55%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width:'80%',
    marginTop:'10px'
  },
};

const selectStyle = {
    control: (base, state) => ({
      ...base,
      border: state.isFocused ? "none" : "none",
      outline: state.isFocused ? "none" : "none",
      "&:focus": {
        border: "none",
        outline: "none",
      },
      boxShadow:0
    }),
  };

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement(document.getElementById('root'));

function EditArticle(props) {
    const {openModal,modalIsOpen,afterOpenModal,closeModal,row,refetch} = props
    const axiosSecure = useAxiosSecure();
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
      console.log(data);
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
              title: data?.title,
              image: res?.data?.data?.display_url,
              publisher: data?.publisher.value,
              tag: data?.tags.value,
              description: data?.description,
            };
            console.log(article,res)
            axiosSecure
              .patch(`/edit-article/${row._id}`, article)
              .then((res) => {
                console.log(res.data);
                if (res.data.modifiedCount) {
                  Swal.fire({
                    icon: "success",
                    confirmButtonColor: "#5e503f",
                    title: "Updated successfully",
                  });
                  refetch()
                  closeModal()
                }else{
                    Swal.fire({
                        icon: "info",
                        confirmButtonColor: "#5e503f",
                        title: "Did not update Anything",
                        
                      })
                      closeModal()
                     
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
    <Box>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={modalStyle}
        contentLabel="Example Modal"
      >

        <button onClick={closeModal}><CloseIcon sx={{cursor:'pointer', fontSize:28,mb:5}} /></button>

        <form onSubmit={handleSubmit(onSubmit)}>
              <Grid container spacing={5}>
                <Grid item md={6} >
                  <TextField
                    {...register("title", { required: true })}
                    type="text"
                    label="title"
                    variant="standard"
                    fullWidth
                    defaultValue={row?.title}
                    
                  />
                  {errors.title?.type === "required" && (
                    <Typography color="red">Title is require</Typography>
                  )}
                </Grid>

                <Grid item md={6}>
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
                </Grid>

               <Grid item md={6}>
               <Controller
                  control={control}
                  name="tags"
                  rules={{ required: true }}
                  defaultValue={row?.tag}

                  render={({ field }) => (
                    <Select
                      {...field}
                      className="tags"
                      placeholder={row?.tag}
                      styles={selectStyle}
                      options={tagsOption}
                    />
                  )}
                />
               </Grid>
               <Grid item md={6}>
               <Controller
                  name="publisher"
                  control={control}
                  rules={{ required: true }}
                  defaultValue={row?.publisher}
                  render={({ field }) => (
                    <Select
                      {...field}
                      placeholder={row.publisher}
                      className="tags"
                      styles={selectStyle}
                      options={publisherOption}
                    />
                  )}
                />
               </Grid>

               

                <Grid  item md={12}>
                  <TextField
                    label="Description"
                    type="text"
                    {...register("description", { required: true })}
                    variant="standard"
                    multiline
                    fullWidth
                    rows={4}
                    defaultValue={row?.description}
                  />
                  {errors.tags?.type === "required" && (
                    <Typography color="red">Description is require</Typography>
                  )}
                </Grid>

               <Grid item xs={12}>
               <Button
                  fullWidth
                  color="secondary"
                  variant="contained"
                  type="submit"
                >
                  Update Article
                </Button>
               </Grid>
              </Grid>
            </form>
      </Modal>
    </Box>
  );
}

export default EditArticle