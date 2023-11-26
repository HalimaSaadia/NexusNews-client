import { Box, Button, Paper, TextField } from "@mui/material";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import toast from "react-hot-toast";

const AddPublisher = () => {
    const axiosSecure = useAxiosSecure()
  const handleAddPublisher = (e) => {
    e.preventDefault();
    const toastId = toast.loading("Adding...")
    const form = e.target;
    const name = form.name.value;
    const image = form.image.value;
    console.log({ name, image });
    axiosSecure.post("/add-publisher" ,{name,image})
    .then(res=> {
        Swal.fire({
            icon:'success',
            title:"Successfully added Publisher",
            confirmButtonColor:"#5e503f"
        })
        toast.remove(toastId)
    }).catch(err=>{
        Swal.fire({
            icon:'error',
            title:err.message,
            confirmButtonColor:"#5e503f"
        })
        toast.remove(toastId)
    })
    form.reset()
  };
//   width:'100%', minHeight:'100vh', justifyContent:'center', alignItems:'center'
  return (
  <Box sx={{width:'100%', minHeight:'100vh',display:'flex', justifyContent:'center', alignItems:'center'}}>
      <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        "& > :not(style)": {
          m: 1,
          width: 500,
          p: 10,
        },
      }}
    >
      <Paper elevation={3}>
        <form onSubmit={handleAddPublisher}>
          <TextField
            variant="standard"
            label="Publisher name"
            type="text"
            name="name"
            required
            fullWidth
            sx={{
              mb: 5,
            }}
          />
          <TextField
            variant="standard"
            label="Publisher Image"
            name="image"
            type="url"
            fullWidth
            required
            sx={{
              mb: 5,
            }}
          />
          <Button type="submit" variant="contained" color="secondary">
            Add Publisher
          </Button>
        </form>
      </Paper>
    </Box>
  </Box>
  );
};

export default AddPublisher;
